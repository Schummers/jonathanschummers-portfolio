import posthog from "posthog-js";

const params = new URLSearchParams(window.location.search);

// Mes propres visites ne comptent pas. Une fois posé, le flag colle au navigateur.
if (params.get("internal") === "1") {
  localStorage.setItem("ph_internal", "1");
}
const isInternal = localStorage.getItem("ph_internal") === "1";

// `?src=nom-de-la-cible` : le lien que je mets dans une candidature ou un DM.
// C'est le SEUL pont entre une session anonyme et une cible du pipeline.
// PostHog ne sait pas qui visite, il ne voit qu'un cookie.
const src = params.get("src");
if (src) {
  localStorage.setItem("ph_src", src);
}

const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;

if (token) {
  posthog.init(token, {
    api_host: "/ingest",
    ui_host: "https://eu.posthog.com",
    defaults: "2026-01-30",
    // "history_change" plutot que `true` : c'est la valeur que `defaults`
    // choisirait de toute facon, et elle ajoute les pageviews de changement de
    // route cote client, que le portfolio a (/work/<slug>).
    //
    // A savoir en debug : posthog differe le pageview d'atterrissage tant que
    // `document.visibilityState` n'est pas "visible". Un onglet d'automatisation
    // ou un prerender n'en produit donc aucun, alors que les $pageleave
    // arrivent normalement. Vu le 2026-09-02, pris pour une panne pendant
    // vingt minutes : ce n'en etait pas une.
    capture_pageview: "history_change",
    capture_pageleave: true,
    capture_exceptions: true,
    opt_out_capturing_by_default: isInternal,
    persistence: "localStorage+cookie",
    debug: process.env.NODE_ENV === "development",
    // `src` est posé ici et pas via register(), parce que le premier $pageview
    // part depuis init() : un register() apres coup arriverait trop tard et le
    // pageview d'atterrissage, le seul qui compte, serait justement le seul
    // sans la cible. before_send passe sur tous les events, celui-la compris.
    before_send: (event) => {
      if (!event) return event;
      const stored = localStorage.getItem("ph_src");
      if (stored) {
        event.properties = { ...event.properties, src: stored };
      }
      return event;
    },
  });
}
