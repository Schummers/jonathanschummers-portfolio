"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { IPhoneFrame } from "./iphone-frame";
import { SegmentedControl } from "./segmented-control";

export interface PhoneScrollItem {
  src: string;
  /* Texte court du segmented control sur mobile (« A », « B », « C »). */
  label: string;
  caption: string;
  /* Lien optionnel : la legende devient un lien vers la page live. */
  href?: string;
}

const CAPTION_CLASS =
  "mt-xs font-body text-caption italic font-normal text-text-tertiary";

/* Vitesse de descente et de remontee, en px/s, pause en haut et en bas, et
   delai avant que l'auto-scroll reprenne apres un geste de l'utilisateur. */
const DOWN_SPEED = 55;
const UP_SPEED = 240;
const HOLD_MS = 1400;
const IDLE_MS = 5000;

/* Jusqu'a trois iPhones dont l'ecran scrolle tout seul. Molette, doigt ou
   clavier reprennent la main ; l'auto reprend apres 5 s sans interaction,
   depuis la position laissee. Rien ne bouge en prefers-reduced-motion, le
   scroll manuel reste. Sous md, un seul iPhone et un segmented control. */
export function PhoneScroll({ items }: { items: PhoneScrollItem[] }) {
  const [active, setActive] = useState(0);
  const viewports = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = viewports.current.filter((el): el is HTMLDivElement => el !== null);
    const state = els.map(() => ({ dir: 1, pos: 0, holdUntil: 0, pausedUntil: 0 }));

    const events = ["wheel", "touchstart", "pointerdown", "keydown"] as const;
    const cleanups = els.map((el, i) => {
      const pause = () => {
        state[i].pausedUntil = performance.now() + IDLE_MS;
      };
      events.forEach((ev) => el.addEventListener(ev, pause, { passive: true }));
      return () => events.forEach((ev) => el.removeEventListener(ev, pause));
    });

    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(now - last, 100) / 1000;
      last = now;
      els.forEach((el, i) => {
        const s = state[i];
        if (now < s.pausedUntil) {
          s.pos = el.scrollTop;
          return;
        }
        if (now < s.holdUntil) return;
        const max = el.scrollHeight - el.clientHeight;
        if (max <= 0) return;
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
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      cleanups.forEach((c) => c());
    };
  }, []);

  return (
    <div className="mt-lg">
      <div className="mb-md flex justify-center md:hidden">
        <SegmentedControl
          label="Design variant"
          options={items.map((it) => it.label)}
          value={active}
          onChange={setActive}
        />
      </div>
      <div className="grid grid-cols-3 gap-md max-md:grid-cols-1">
        {items.map((it, i) => (
          <figure
            key={it.src}
            className={cn("max-md:mx-auto max-md:w-64", i !== active && "max-md:hidden")}
          >
            <IPhoneFrame homeBar>
              <div
                ref={(el) => {
                  viewports.current[i] = el;
                }}
                className="case-phone-viewport"
                tabIndex={0}
                aria-label={`${it.caption}, scrollable`}
              >
                <Image
                  src={it.src}
                  alt={it.caption}
                  width={390}
                  height={6000}
                  className="w-full h-auto block"
                />
              </div>
            </IPhoneFrame>
            {it.caption && (
              <figcaption className={CAPTION_CLASS}>
                {it.href ? (
                  <a
                    href={it.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link hover-supported:text-text-primary transition-colors"
                  >
                    {it.caption}
                  </a>
                ) : (
                  it.caption
                )}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </div>
  );
}
