"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

/**
 * Emet un seul `case_study_read` par lecture de case study, a la sortie.
 *
 * Pourquoi ne pas se contenter du natif : posthog pose deja
 * `$prev_pageview_max_scroll_percentage`, mais il ne le remet pas a zero aux
 * changements de route cote client, et le portfolio en a un a chaque
 * `/work/<slug>`. Les valeurs se reportent d'une page a l'autre. Constate le
 * 2026-09-02 sur les visites reunionnaises : `smartintegrity` remontait 99,99%
 * de scroll max alors que le visiteur en est sorti a 0%.
 *
 * Deuxieme raison : `$prev_pageview_duration` compte le temps d'onglet, pas le
 * temps de lecture. Le meme jour, un onglet laisse ouvert sur la home a produit
 * 2444s de "duree". `active_seconds` s'arrete quand l'onglet passe en arriere
 * plan et apres IDLE_MS sans interaction.
 *
 * `src` n'est pas pose ici : le `before_send` de instrumentation-client.ts le
 * pose deja sur tous les events, celui-ci compris.
 */

const IDLE_MS = 30_000;
const READ_DEPTH = 0.75;
const READ_SECONDS = 30;

export function CaseStudyReadTracker({
  slug,
  targetId = "case-study-body",
}: {
  slug: string;
  targetId?: string;
}) {
  useEffect(() => {
    let maxDepth = 0;
    let activeSeconds = 0;
    let lastActivity = Date.now();
    let sent = false;
    let ticking = false;

    // Profondeur mesuree sur l'article seul, pas sur le document : la nav et le
    // footer ne doivent pas compter comme du contenu lu.
    const measure = () => {
      const el = document.getElementById(targetId);
      if (!el) return;
      const height = el.offsetHeight;
      if (height <= 0) return;
      const top = el.getBoundingClientRect().top + window.scrollY;
      const seen = window.scrollY + window.innerHeight - top;
      const depth = Math.min(1, Math.max(0, seen / height));
      if (depth > maxDepth) maxDepth = depth;
    };

    const onScroll = () => {
      lastActivity = Date.now();
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        measure();
        ticking = false;
      });
    };

    const onActivity = () => {
      lastActivity = Date.now();
    };

    const timer = window.setInterval(() => {
      if (document.visibilityState !== "visible") return;
      if (Date.now() - lastActivity > IDLE_MS) return;
      activeSeconds += 1;
    }, 1000);

    // Envoye une seule fois. `pagehide` couvre la fermeture et le bfcache,
    // `visibilitychange` couvre iOS ou `pagehide` n'est pas garanti, et le
    // cleanup couvre la navigation client vers une autre route, ou aucun des
    // deux ne se declenche.
    const send = () => {
      if (sent) return;
      sent = true;
      measure();
      const depth = Math.round(maxDepth * 100) / 100;
      posthog.capture("case_study_read", {
        slug,
        max_depth: depth,
        active_seconds: activeSeconds,
        reached_end: depth >= 0.98,
        read: depth >= READ_DEPTH && activeSeconds >= READ_SECONDS,
      });
    };

    const onVisibility = () => {
      if (document.visibilityState === "hidden") send();
    };

    // Premiere mesure : une case study plus courte que la fenetre est deja lue
    // en entier avant le moindre scroll.
    measure();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    window.addEventListener("pointermove", onActivity, { passive: true });
    window.addEventListener("keydown", onActivity);
    window.addEventListener("pagehide", send);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.clearInterval(timer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pointermove", onActivity);
      window.removeEventListener("keydown", onActivity);
      window.removeEventListener("pagehide", send);
      document.removeEventListener("visibilitychange", onVisibility);
      send();
    };
  }, [slug, targetId]);

  return null;
}
