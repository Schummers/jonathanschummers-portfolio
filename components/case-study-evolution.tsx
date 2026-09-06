"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { IPhoneFrame } from "./iphone-frame";
import { Button } from "./button";

export interface EvolutionFrame {
  src: string;
  /* Court : le commit ou l'etat (« AI generated », « Commit 2 »). */
  label: string;
  /* Ce qui a change a cette etape. */
  caption: string;
}

type Mode = "strip" | "timeline" | "scrolly";

const LABEL_CLASS = "font-body text-caption font-semibold text-text-primary";
const CAPTION_CLASS = "font-body text-caption italic font-normal text-text-tertiary";

/* Le meme ecran a chaque commit, trois mises en scene :
   - strip    : les etats cote a cote, un iPhone par commit
   - timeline : un seul iPhone, une frise de commits, lecture auto puis manuelle
   - scrolly  : iPhone sticky, un paragraphe par commit, l'ecran change au scroll */
export function CaseStudyEvolution({
  frames,
  mode,
}: {
  frames: EvolutionFrame[];
  mode: Mode;
}) {
  if (mode === "strip") return <Strip frames={frames} />;
  if (mode === "timeline") return <Timeline frames={frames} />;
  return <Scrolly frames={frames} />;
}

function Phone({ frame, priority }: { frame: EvolutionFrame; priority?: boolean }) {
  return (
    <IPhoneFrame homeBar>
      <Image
        src={frame.src}
        alt={frame.caption}
        width={390}
        height={693}
        priority={priority}
        className="w-full h-auto block"
      />
    </IPhoneFrame>
  );
}

function Strip({ frames }: { frames: EvolutionFrame[] }) {
  return (
    <div className="mt-lg grid grid-cols-4 gap-sm max-md:grid-cols-2 max-md:gap-md">
      {frames.map((f, i) => (
        <figure key={i}>
          <Phone frame={f} />
          <figcaption className="mt-xs">
            <p className={LABEL_CLASS}>{f.label}</p>
            <p className={CAPTION_CLASS}>{f.caption}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

function Timeline({ frames }: { frames: EvolutionFrame[] }) {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  /* Lecture automatique tant que le visiteur n'a rien touche, et seulement
     quand le bloc est visible. */
  useEffect(() => {
    if (!auto) return;
    const el = ref.current;
    if (!el) return;
    let timer: ReturnType<typeof setInterval> | null = null;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !timer) {
        timer = setInterval(() => setActive((a) => (a + 1) % frames.length), 2600);
      } else if (!entry.isIntersecting && timer) {
        clearInterval(timer);
        timer = null;
      }
    }, { threshold: 0.5 });
    io.observe(el);
    return () => {
      io.disconnect();
      if (timer) clearInterval(timer);
    };
  }, [auto, frames.length]);

  const pick = (i: number) => {
    setAuto(false);
    setActive(i);
  };

  return (
    <div ref={ref} className="mt-lg grid grid-cols-2 gap-lg items-center max-md:grid-cols-1 max-md:gap-md">
      <div className="relative mx-auto w-full max-w-64">
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
      <ol className="flex flex-col gap-xs">
        {frames.map((f, i) => (
          <li key={i}>
            <Button
              variant="outline"
              onClick={() => pick(i)}
              aria-current={i === active ? "step" : undefined}
              className={cn(
                "w-full justify-start text-left flex-col items-start gap-2xs py-sm",
                i === active ? "bg-surface border-text-primary" : "border-transparent"
              )}
            >
              <span className={LABEL_CLASS}>{f.label}</span>
              <span className={cn(CAPTION_CLASS, "not-italic font-normal")}>{f.caption}</span>
            </Button>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Scrolly({ frames }: { frames: EvolutionFrame[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const i = refs.current.indexOf(e.target as HTMLLIElement);
            if (i >= 0) setActive(i);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="mt-lg grid grid-cols-2 gap-lg max-md:grid-cols-1 max-md:gap-md">
      <div className="sticky top-32 self-start mx-auto w-full max-w-64 max-md:top-20 max-md:max-w-40">
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
      <ol className="flex flex-col">
        {frames.map((f, i) => (
          <li
            key={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className={cn(
              "min-h-96 flex flex-col justify-center py-lg border-t border-border/50 transition-opacity duration-[var(--dur-base)]",
              i === active ? "opacity-100" : "opacity-40"
            )}
          >
            <p className={LABEL_CLASS}>{f.label}</p>
            <p className="mt-xs font-body text-body leading-body text-text-primary">{f.caption}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
