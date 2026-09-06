import { Fragment } from "react";
import Image from "next/image";
import { ArrowRightIcon } from "@heroicons/react/16/solid";
import { IPhoneFrame } from "./iphone-frame";
import { AutoScrollViewport } from "./auto-scroll-viewport";
import { CaseStudyCaption } from "./case-study-caption";

export interface PhonePairItem {
  src: string;
  /* Titre court au-dessus de l'ecran : ce qu'on regarde, lu avant l'image. */
  title: string;
  caption: string;
  /* Capture plus haute qu'un ecran : l'iPhone scrolle tout seul. */
  scroll: boolean;
}

/* Deux iPhones cales sur les bords du texte, une fleche entre les deux : un
   avant et un apres, ou deux ecrans d'un meme geste. Titre au-dessus (meme
   style que le nom d'une phase), legende dessous, tous deux a gauche.
   Pas de barre d'accueil iOS : les captures d'app sont plein ecran et la
   barre les couperait. Sur mobile les deux s'empilent, la fleche tourne. */
export function PhonePair({ items }: { items: PhonePairItem[] }) {
  return (
    <div className="flex items-start justify-between gap-md max-md:flex-col max-md:items-center">
      {items.map((it, i) => (
        <Fragment key={it.src}>
          {i > 0 && (
            <span aria-hidden="true" className="self-center text-text-tertiary max-md:rotate-90">
              <ArrowRightIcon className="size-6" />
            </span>
          )}
          <figure className="flex w-72 flex-col gap-xs max-md:w-64">
            <p className="flex h-14 items-end font-display text-h4 font-bold leading-h4 tracking-h4 text-text-primary">{it.title}</p>
            <IPhoneFrame>
              {it.scroll ? (
                <AutoScrollViewport className="case-phone-viewport" label={`${it.caption}, scrollable`}>
                  <Image src={it.src} alt={it.caption} width={390} height={1800} className="w-full h-auto block" />
                </AutoScrollViewport>
              ) : (
                <Image src={it.src} alt={it.caption} width={390} height={844} className="w-full h-auto block" />
              )}
            </IPhoneFrame>
            <CaseStudyCaption>{it.caption}</CaseStudyCaption>
          </figure>
        </Fragment>
      ))}
    </div>
  );
}
