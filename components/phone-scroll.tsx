"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { IPhoneFrame } from "./iphone-frame";
import { SegmentedControl } from "./segmented-control";
import { AutoScrollViewport } from "./auto-scroll-viewport";
import { CaseStudyCaption } from "./case-study-caption";
import { InlineLink } from "./inline-link";

export interface PhoneScrollItem {
  src: string;
  /* Texte court du segmented control sur mobile (« A », « B », « C »). */
  label: string;
  caption: string;
  /* Lien optionnel : la legende devient un lien vers la page live. */
  href?: string;
}

/* Jusqu'a trois iPhones dont l'ecran scrolle tout seul (AutoScrollViewport :
   l'utilisateur reprend la main, reprise apres 5 s). Sous md, un seul iPhone
   et un segmented control. */
export function PhoneScroll({ items }: { items: PhoneScrollItem[] }) {
  const [active, setActive] = useState(0);

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
              <AutoScrollViewport className="case-phone-viewport" label={`${it.caption}, scrollable`}>
                <Image
                  src={it.src}
                  alt={it.caption}
                  width={390}
                  height={6000}
                  className="w-full h-auto block"
                />
              </AutoScrollViewport>
            </IPhoneFrame>
            <CaseStudyCaption>
              {it.href ? (
                <InlineLink href={it.href} icon>
                  {it.caption}
                </InlineLink>
              ) : (
                it.caption
              )}
            </CaseStudyCaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
