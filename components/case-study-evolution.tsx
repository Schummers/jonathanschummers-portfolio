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
  /* Ce que j'ai change a cette etape, une phrase. */
  caption: string;
}

const AUTO_MS = 3000;

/* Le meme ecran a chaque commit, dans un seul iPhone. Avance seul toutes les
   3 s tant que le bloc est visible et que personne n'a touche aux fleches ;
   un clic passe en manuel pour de bon. Pas de lecture auto si le visiteur
   prefere moins de mouvement. */
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

  return (
    <div ref={root} className="mt-lg">
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
  );
}
