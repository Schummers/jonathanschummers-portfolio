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

/* Deux iPhones cote a cote, une fleche entre les deux : un avant et un
   apres, ou deux ecrans d'un meme geste. Titre au-dessus, legende dessous.
   Pas de barre d'accueil iOS : les captures d'app sont plein ecran et la
   barre les couperait. Sur mobile les deux s'empilent, la fleche tourne. */
export function PhonePair({ items }: { items: PhonePairItem[] }) {
  return (
    <div className="flex justify-center gap-lg max-md:flex-col max-md:items-center max-md:gap-md">
      {items.map((it, i) => (
        <figure key={it.src} className="relative flex w-72 flex-col gap-xs max-md:w-64">
          <p className="text-center font-body text-body-sm font-medium text-text-primary">{it.title}</p>
          <IPhoneFrame>
            {it.scroll ? (
              <AutoScrollViewport className="case-phone-viewport" label={`${it.caption}, scrollable`}>
                <Image src={it.src} alt={it.caption} width={390} height={1800} className="w-full h-auto block" />
              </AutoScrollViewport>
            ) : (
              <Image src={it.src} alt={it.caption} width={390} height={844} className="w-full h-auto block" />
            )}
          </IPhoneFrame>
          <CaseStudyCaption className="text-center">{it.caption}</CaseStudyCaption>
          {i < items.length - 1 && (
            <span
              aria-hidden="true"
              className="absolute left-full top-1/2 -translate-x-1/2 -translate-y-1/2 text-text-tertiary max-md:left-1/2 max-md:top-full max-md:rotate-90"
            >
              <ArrowRightIcon className="size-4" />
            </span>
          )}
        </figure>
      ))}
    </div>
  );
}
