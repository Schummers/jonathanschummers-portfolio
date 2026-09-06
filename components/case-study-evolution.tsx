"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { cn } from "@/lib/cn";
import { IPhoneFrame } from "./iphone-frame";
import { Button } from "./button";

export interface EvolutionFrame {
  src: string;
  /* Court : le commit ou l'etat (« AI generated », « Commit 2, hierarchy »). */
  label: string;
  /* Ce que j'ai change a cette etape, une phrase. */
  caption: string;
}

/* Le meme ecran a chaque commit, dans un seul iPhone. L'etape active suit le
   scroll : le bloc est plus haut que la scene, la scene reste collee et
   l'ecran change a mesure qu'on descend. Les fleches font la meme chose en
   deplacant le scroll, pour que les deux commandes restent coherentes. */
export function CaseStudyEvolution({ frames }: { frames: EvolutionFrame[] }) {
  const container = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const n = frames.length;

  /* Course de scroll utile = hauteur du bloc moins la scene collee. */
  const track = useCallback(() => {
    const c = container.current;
    const s = stage.current;
    if (!c || !s) return null;
    const top = c.getBoundingClientRect().top + window.scrollY;
    const stick = parseFloat(getComputedStyle(s).top) || 0;
    const start = top - stick;
    const length = c.offsetHeight - s.offsetHeight;
    return { start, length };
  }, []);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const t = track();
      if (!t || t.length <= 0) return;
      const p = Math.min(1, Math.max(0, (window.scrollY - t.start) / t.length));
      setActive(Math.min(n - 1, Math.floor(p * n)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [n, track]);

  const go = (i: number) => {
    const t = track();
    const target = Math.min(n - 1, Math.max(0, i));
    if (!t) return setActive(target);
    /* Milieu de la tranche visee, pour que le scroll ne retombe pas sur
       une frontiere. */
    const y = t.start + ((target + 0.5) / n) * t.length;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const frame = frames[active];

  return (
    <div ref={container} className="relative mt-lg">
      <div ref={stage} className="sticky top-28 max-md:top-24">
        <div className="flex items-center justify-center gap-md max-md:gap-sm">
          <Button
            variant="outline"
            onClick={() => go(active - 1)}
            disabled={active === 0}
            aria-label="Previous commit"
            className="rounded-full px-xs py-xs shrink-0"
          >
            <ChevronLeftIcon className="size-5" />
          </Button>
          <div className="w-full max-w-64 max-md:max-w-52">
            {/* Toutes les images sont montees, seule l'active est visible :
                pas de rechargement, la transition reste nette. */}
            <IPhoneFrame homeBar>
              <div className="relative aspect-[390/693]">
                {frames.map((f, i) => (
                  <Image
                    key={i}
                    src={f.src}
                    alt={f.caption}
                    width={390}
                    height={693}
                    priority={i === 0}
                    className={cn(
                      "absolute inset-0 w-full h-auto block transition-opacity duration-[var(--dur-slow)] ease-out",
                      i === active ? "opacity-100" : "opacity-0"
                    )}
                  />
                ))}
              </div>
            </IPhoneFrame>
          </div>
          <Button
            variant="outline"
            onClick={() => go(active + 1)}
            disabled={active === n - 1}
            aria-label="Next commit"
            className="rounded-full px-xs py-xs shrink-0"
          >
            <ChevronRightIcon className="size-5" />
          </Button>
        </div>

        <div className="mx-auto mt-sm max-w-96 text-center" aria-live="polite">
          <ol className="flex justify-center gap-xs" aria-hidden="true">
            {frames.map((_, i) => (
              <li
                key={i}
                className={cn(
                  "size-2 rounded-full transition-colors duration-[var(--dur-base)]",
                  i === active ? "bg-text-primary" : "bg-border-strong"
                )}
              />
            ))}
          </ol>
          <p className="mt-xs font-body text-caption font-semibold text-text-primary">
            {frame.label}
          </p>
          <p className="mt-2xs font-body text-body-sm leading-body text-text-secondary">
            {frame.caption}
          </p>
        </div>
      </div>

      {/* Course de scroll : une tranche par etape, derriere la scene collee. */}
      <div aria-hidden="true">
        {frames.map((_, i) => (
          <div key={i} className="h-80" />
        ))}
      </div>
    </div>
  );
}
