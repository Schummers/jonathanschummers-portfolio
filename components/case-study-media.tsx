import Image from "next/image";
import { ArrowDownIcon } from "@heroicons/react/16/solid";
import { parseMediaDirective, type CaseStudyImage } from "@/lib/case-studies";
import { cn } from "@/lib/cn";
import { IPhoneFrame } from "./iphone-frame";
import { BrowserFrame } from "./browser-frame";
import { CaseStudyImageGrid } from "./case-study-image-grid";
import { CaseStudyCaption } from "./case-study-caption";
import { PhoneScroll, type PhoneScrollItem } from "./phone-scroll";
import { AutoScrollViewport } from "./auto-scroll-viewport";

type MediaFigure = { src: string; caption: string };

/* Repartit les images d'une etape selon la directive de leur alt (lue par
   `parseMediaDirective`, `lib/case-studies.ts`) :
   - `phone-scroll` → jusqu'a 3 iPhones dont l'ecran scrolle tout seul
   - `phone`        → rangee d'iPhones, legende dessous
   - `scroll`       → navigateur dont la page scrolle toute seule
   - `row`          → image pleine largeur, empilee
   - `grid`         → la grille habituelle
   Les variantes `phone-pair` et `phone-scroll-pair` rangent les iPhones par
   deux (dark a gauche, light a droite) au lieu de trois.
   Le navigateur se place avant les iPhones quand il ouvre la liste d'images du
   markdown, apres eux sinon, avec une fleche vers le bas entre les deux. */
export function CaseStudyMedia({ images }: { images: CaseStudyImage[] }) {
  if (images.length === 0) return null;

  const items = images.map((img) => ({ src: img.src, alt: img.alt, d: parseMediaDirective(img.alt) }));
  const scrollFirst = items[0]?.d.kind === "scroll";
  const phoneItems = items.filter((it) => it.d.kind === "phone" || it.d.kind === "phone-scroll");
  const pairs = phoneItems.length > 0 && phoneItems.every((it) => "pair" in it.d && it.d.pair);

  const phoneScrolls: PhoneScrollItem[] = [];
  const phones: MediaFigure[] = [];
  const rows: MediaFigure[] = [];
  const grid: CaseStudyImage[] = [];
  let scroll: (MediaFigure & { url: string }) | undefined;

  for (const { src, alt, d } of items) {
    if (d.kind === "phone-scroll") phoneScrolls.push({ src, label: d.label, caption: d.caption, href: d.href });
    else if (d.kind === "phone") phones.push({ src, caption: d.caption });
    else if (d.kind === "scroll") scroll ??= { src, url: d.url, caption: d.caption };
    else if (d.kind === "row") rows.push({ src, caption: d.caption });
    else grid.push({ src, alt }); // la grille relit `plain:` elle-meme
  }

  const browserFigure = scroll && (
    <figure className={phones.length > 0 && !scrollFirst ? "mt-md" : "mt-lg"}>
      <BrowserFrame url={scroll.url}>
        <AutoScrollViewport className="h-120" label={`${scroll.caption}, scrollable`}>
          <Image
            src={scroll.src}
            alt={scroll.caption}
            width={640}
            height={2175}
            className="w-full h-auto block"
          />
        </AutoScrollViewport>
      </BrowserFrame>
      <CaseStudyCaption>{scroll.caption}</CaseStudyCaption>
    </figure>
  );

  return (
    <>
      {scrollFirst && browserFigure}

      {phones.length > 0 && (
        <div className={cn("mt-lg grid gap-md max-md:gap-sm", pairs ? "grid-cols-2" : "grid-cols-3")}>
          {phones.map((img, i) => (
            <figure key={i}>
              <IPhoneFrame homeBar>
                <Image
                  src={img.src}
                  alt={img.caption}
                  width={390}
                  height={693}
                  className="w-full h-auto block"
                />
              </IPhoneFrame>
              <CaseStudyCaption>{img.caption}</CaseStudyCaption>
            </figure>
          ))}
        </div>
      )}

      {phoneScrolls.length > 0 && <PhoneScroll items={phoneScrolls} cols={pairs ? 2 : 3} />}

      {phones.length > 0 && scroll && !scrollFirst && (
        <div className="mt-md flex justify-center text-text-tertiary" aria-hidden="true">
          <ArrowDownIcon className="size-4" />
        </div>
      )}

      {!scrollFirst && browserFigure}

      {rows.map((img, i) => (
        <figure key={i} className="mt-lg">
          <div className="max-md:-mr-md max-md:overflow-x-auto">
            <Image
              src={img.src}
              alt={img.caption}
              width={1180}
              height={220}
              className="w-full h-auto block max-md:w-160 max-md:max-w-160"
            />
          </div>
          <CaseStudyCaption>{img.caption}</CaseStudyCaption>
        </figure>
      ))}

      <CaseStudyImageGrid images={grid} />
    </>
  );
}
