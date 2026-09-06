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

/* Deux layouts, choisis dans le Markdown par la premiere ligne du bloc :

   - `evolution:` (defaut) → `stack` : iPhone entre deux fleches, points de
     pagination, legende centree dessous a la largeur du bloc fleches + iPhone.
     C'est le layout retenu pour You Alive, etape 3 (decision de Jonathan le
     2026-09-06).
   - `evolution: side` → `side` : iPhone a gauche, les etapes a droite en
     colonne, toutes lisibles, l'active en text-primary, les autres en
     text-secondary, fleches au-dessus de trois cards a stroke qui partagent
     la hauteur de l'iPhone ; cliquer une etape change l'ecran. Sur mobile
     `side` s'empile. Construit et verifie en dev (commits `84f5a5d`,
     `11d7ffe`), puis mis de cote : garde ici pour une autre case study, il
     suffit d'ecrire `evolution: side` au-dessus des etats.

   Les deux partagent les frames, l'avance auto et le passage en manuel. */
export type EvolutionLayout = "stack" | "side";

/* Le meme ecran a chaque commit, dans un seul iPhone. Avance seul toutes les
   3 s tant que le bloc est visible et que personne n'a touche aux fleches ;
   un clic passe en manuel pour de bon. Pas de lecture auto si le visiteur
   prefere moins de mouvement. */
export function CaseStudyEvolution({
  frames,
  layout = "stack",
}: {
  frames: EvolutionFrame[];
  layout?: EvolutionLayout;
}) {
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

  const phone = (
    <div className="w-64 shrink-0 max-md:w-52">
      {/* Toutes les images sont montees, seule l'active est visible :
          pas de rechargement, la transition reste nette. */}
      <IPhoneFrame homeBar>
        <div className="relative aspect-[390/693]">
          {frames.map((f, i) => (
            <Image
              key={i}
              src={f.src}
              alt={`${f.label}: ${f.points.join(", ")}`}
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
  );

  const arrows = (
    <div className="flex gap-xs">
      <Button
        variant="outline"
        onClick={() => go(active - 1)}
        disabled={active === 0}
        aria-label="Previous commit"
        className="rounded-full px-xs py-xs shrink-0"
      >
        <ChevronLeftIcon className="size-5" />
      </Button>
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
  );

  if (layout === "side") {
    /* iPhone a gauche ; a droite les fleches puis trois cards a stroke, sans
       fond, qui se partagent la hauteur de l'iPhone. L'active porte un stroke
       text-primary, les autres border ; cliquer une card change l'ecran. */
    return (
      <div ref={root} className="flex items-stretch gap-lg max-md:flex-col max-md:items-stretch max-md:gap-md">
        <div className="max-md:self-center">{phone}</div>
        <div className="flex min-w-0 flex-1 flex-col gap-sm">
          {arrows}
          <ol className="flex flex-1 flex-col gap-xs" aria-live="polite">
            {frames.map((f, i) => {
              const on = i === active;
              return (
                <li key={i} className="flex flex-1">
                  <button
                    type="button"
                    onClick={() => go(i)}
                    aria-current={on ? "step" : undefined}
                    className={cn(
                      "flex w-full flex-col justify-center rounded-md border px-md py-xs text-left transition-colors duration-[var(--dur-base)]",
                      on
                        ? "border-text-primary text-text-primary"
                        : "border-border text-text-secondary hover-supported:border-border-strong hover-supported:text-text-primary"
                    )}
                  >
                    <span className="font-display text-h4 font-bold">{f.label}</span>
                    <ul className="mt-2xs space-y-2xs">
                      {f.points.map((pt, j) => (
                        <li
                          key={j}
                          className="font-body text-body-sm leading-body pl-md relative before:absolute before:left-0 before:top-[0.65em] before:size-1 before:rounded-full before:bg-current"
                        >
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    );
  }

  return (
    <div ref={root} className="mx-auto w-fit">
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
        {phone}
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
