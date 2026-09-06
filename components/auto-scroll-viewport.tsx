"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/* Vitesse de descente et de retour en haut, en px/s, pause en haut et en bas,
   et delai avant que l'auto-scroll reprenne apres un geste de l'utilisateur.
   La descente est la partie a regarder, le retour n'est qu'un rembobinage :
   avant le 2026-09-07 c'etait l'inverse (24 px/s en descente, 110 en montee)
   et l'oeil ne voyait que la montee, les ecrans semblaient defiler a l'envers. */
const DOWN_SPEED = 48;
const UP_SPEED = 900;
const HOLD_MS = 1400;
const IDLE_MS = 5000;

interface AutoScrollViewportProps {
  children: React.ReactNode;
  className?: string;
  label?: string;
}

/* Fenetre dont le contenu scrolle tout seul, comme un utilisateur qui lit :
   du haut vers le bas, pause, retour rapide en haut. L'animation ne demarre
   que quand la fenetre entre dans l'ecran, toujours depuis le haut, et
   s'arrete quand elle en sort : un ecran atteint apres deux minutes de
   lecture repart de zero au lieu d'etre surpris a mi-cycle. Molette, doigt
   ou clavier reprennent la main ; l'auto reprend apres 5 s sans interaction,
   depuis la position laissee. Rien ne bouge en prefers-reduced-motion, le
   scroll manuel reste. */
export function AutoScrollViewport({ children, className, label }: AutoScrollViewportProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const s = { dir: 1, pos: 0, holdUntil: 0, pausedUntil: 0 };

    const pause = () => {
      s.pausedUntil = performance.now() + IDLE_MS;
    };
    const events = ["wheel", "touchstart", "pointerdown", "keydown"] as const;
    events.forEach((ev) => el.addEventListener(ev, pause, { passive: true }));

    let raf = 0;
    let last = 0;
    const tick = (now: number) => {
      const dt = Math.min(now - last, 100) / 1000;
      last = now;
      if (now < s.pausedUntil) {
        s.pos = el.scrollTop;
      } else if (now >= s.holdUntil) {
        const max = el.scrollHeight - el.clientHeight;
        if (max > 0) {
          s.pos += s.dir * (s.dir > 0 ? DOWN_SPEED : UP_SPEED) * dt;
          if (s.pos >= max) {
            s.pos = max;
            s.dir = -1;
            s.holdUntil = now + HOLD_MS;
          } else if (s.pos <= 0) {
            s.pos = 0;
            s.dir = 1;
            s.holdUntil = now + HOLD_MS;
          }
          el.scrollTop = s.pos;
        }
      }
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (raf) return;
      el.scrollTop = 0;
      Object.assign(s, { dir: 1, pos: 0, holdUntil: performance.now() + HOLD_MS });
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0.35 }
    );
    io.observe(el);

    return () => {
      stop();
      io.disconnect();
      events.forEach((ev) => el.removeEventListener(ev, pause));
    };
  }, []);

  return (
    <div
      ref={ref}
      tabIndex={0}
      aria-label={label}
      className={cn("auto-scroll-viewport overflow-y-auto", className)}
    >
      {children}
    </div>
  );
}
