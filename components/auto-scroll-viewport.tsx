"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/* Vitesse de descente et de remontee, en px/s, pause en haut et en bas, et
   delai avant que l'auto-scroll reprenne apres un geste de l'utilisateur. */
const DOWN_SPEED = 24;
const UP_SPEED = 110;
const HOLD_MS = 1400;
const IDLE_MS = 5000;

interface AutoScrollViewportProps {
  children: React.ReactNode;
  className?: string;
  label?: string;
}

/* Fenetre dont le contenu scrolle tout seul, descente lente, remontee plus
   rapide. Molette, doigt ou clavier reprennent la main ; l'auto reprend
   apres 5 s sans interaction, depuis la position laissee. Rien ne bouge en
   prefers-reduced-motion, le scroll manuel reste. */
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
    let last = performance.now();
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
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
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
