"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { cn } from "@/lib/cn";
import { IPhoneFrame } from "./iphone-frame";
import { Button } from "./button";

export interface EvolutionFrame {
  src: string;
  /* Court : le commit ou l'etat (« AI generated », « Commit 2, hierarchy »). */
  label: string;
  /* Ce que j'ai change a cette etape, une puce par point. */
  points: string[];
}

const AUTO_MS = 3000;

/* Le meme ecran a chaque commit, dans un seul iPhone entre deux fleches,
   points de pagination et legende centree dessous. Les captures font un
   ecran d'iPhone entier (390 x 844), meme viewport que les iPhones a scroll.
   Avance seul toutes les 3 s tant que le bloc est visible et que personne
   n'a touche aux fleches ; un clic passe en manuel pour de bon. Pas de
   lecture auto si le visiteur prefere moins de mouvement.

   Un layout `side` (iPhone a gauche, etapes cliquables a droite) a existe,
   commits `84f5a5d` et `11d7ffe`, retire le 2026-09-06 : git le garde. */
export function CaseStudyEvolution({ frames }: { frames: EvolutionFrame[] }) {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const n = frames.length;

  useEffect(() => {
    if (!auto) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = root.current;
    if (!el) return;
    let timer: ReturnType<typeof setInterval> | null = null;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !timer) {
          timer = setInterval(() => setActive((a) => (a + 1) % n), AUTO_MS);
        } else if (!entry.isIntersecting && timer) {
          clearInterval(timer);
          timer = null;
        }
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (timer) clearInterval(timer);
    };
  }, [auto, n]);

  const go = (i: number) => {
    setAuto(false);
    setActive(Math.min(n - 1, Math.max(0, i)));
  };

  const frame = frames[active];

  const arrow = (dir: -1 | 1) => (
    <Button
      variant="outline"
      size="icon"
      onClick={() => go(active + dir)}
      disabled={dir < 0 ? active === 0 : active === n - 1}
      aria-label={dir < 0 ? "Previous commit" : "Next commit"}
      className="shrink-0"
    >
      {dir < 0 ? <ChevronLeftIcon className="size-5" /> : <ChevronRightIcon className="size-5" />}
    </Button>
  );

  return (
    <div ref={root} className="mx-auto w-fit">
      <div className="flex items-center justify-center gap-md max-md:gap-sm">
        {arrow(-1)}
        <div className="w-64 shrink-0 max-md:w-52">
          {/* Toutes les images sont montees, seule l'active est visible :
              pas de rechargement, la transition reste nette. */}
          <IPhoneFrame homeBar>
            <div className="case-phone-viewport relative">
              {frames.map((f, i) => (
                <Image
                  key={i}
                  src={f.src}
                  alt={`${f.label}: ${f.points.join(", ")}`}
                  width={390}
                  height={844}
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
        {arrow(1)}
      </div>

      {/* Legende sous l'ecran : titre puis trois lignes courtes, centrees,
          a la largeur du bloc fleches + iPhone. */}
      <div className="mt-sm" aria-live="polite">
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
        <p className="mt-md text-center font-display text-h4 font-bold text-text-primary">
          {frame.label}
        </p>
        <div className="mt-xs space-y-2xs">
          {frame.points.map((pt, i) => (
            <p
              key={i}
              className="text-center font-body text-body-sm leading-body text-text-secondary"
            >
              {pt}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
