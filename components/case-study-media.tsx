import Image from "next/image";
import { ArrowDownIcon } from "@heroicons/react/16/solid";
import { IPhoneFrame } from "./iphone-frame";
import { BrowserFrame } from "./browser-frame";
import { CaseStudyImageGrid } from "./case-study-image-grid";
import { PhoneScroll } from "./phone-scroll";
import { AutoScrollViewport } from "./auto-scroll-viewport";

interface ImageItem {
  alt: string;
  src: string;
}

/* Conventions Markdown, lues sur le alt des images d'une etape :
   - `phone: <legende>`            → rangee d'iPhones (jusqu'a 3), legende dessous
   - `scroll: <url> | <legende>`   → navigateur dont la page scrolle toute seule
     (AutoScrollViewport, l'utilisateur reprend la main), legende dessous
   - `phone-scroll: <label> | <legende> | <url>` → jusqu'a 3 iPhones dont
     l'ecran scrolle tout seul, l'utilisateur reprend la main ; un seul sur
     mobile, avec un segmented control qui porte les labels ; l'url est
     optionnelle et fait de la legende un lien
   - `row: <legende>`              → image pleine largeur, empilee, legende dessous
   Les autres images passent par la grille habituelle. Une fleche vers le bas
   s'insere entre les iPhones et le navigateur quand l'etape a les deux. */

const CAPTION_CLASS =
  "mt-xs font-body text-caption italic font-normal text-text-tertiary";

export function CaseStudyMedia({ images }: { images: ImageItem[] }) {
  if (images.length === 0) return null;

  const phoneScrolls = images
    .filter((i) => i.alt.startsWith("phone-scroll:"))
    .map((i) => {
      const [label, caption = "", href = ""] = i.alt.replace(/^phone-scroll:\s*/, "").split("|");
      return { src: i.src, label: label.trim(), caption: caption.trim(), href: href.trim() || undefined };
    });
  const phones = images.filter((i) => i.alt.startsWith("phone:"));
  const scroll = images.find((i) => i.alt.startsWith("scroll:"));
  const rows = images.filter((i) => i.alt.startsWith("row:"));
  const rest = images.filter(
    (i) =>
      !i.alt.startsWith("phone:") &&
      !i.alt.startsWith("phone-scroll:") &&
      !i.alt.startsWith("scroll:") &&
      !i.alt.startsWith("row:")
  );

  let scrollUrl = "";
  let scrollCaption = "";
  if (scroll) {
    const [url, caption = ""] = scroll.alt.replace(/^scroll:\s*/, "").split("|");
    scrollUrl = url.trim();
    scrollCaption = caption.trim();
  }

  return (
    <>
      {phoneScrolls.length > 0 && <PhoneScroll items={phoneScrolls} />}

      {phones.length > 0 && (
        <div className="mt-lg grid grid-cols-3 gap-md max-md:gap-sm">
          {phones.map((img, i) => {
            const caption = img.alt.replace(/^phone:\s*/, "");
            return (
              <figure key={i}>
                <IPhoneFrame homeBar>
                  <Image
                    src={img.src}
                    alt={caption}
                    width={390}
                    height={693}
                    className="w-full h-auto block"
                  />
                </IPhoneFrame>
                {caption && <figcaption className={CAPTION_CLASS}>{caption}</figcaption>}
              </figure>
            );
          })}
        </div>
      )}

      {phones.length > 0 && scroll && (
        <div className="mt-md flex justify-center text-text-tertiary" aria-hidden="true">
          <ArrowDownIcon className="size-4" />
        </div>
      )}

      {scroll && (
        <figure className={phones.length > 0 ? "mt-md" : "mt-lg"}>
          <BrowserFrame url={scrollUrl}>
            <AutoScrollViewport className="h-120" label={`${scrollCaption}, scrollable`}>
              <Image
                src={scroll.src}
                alt={scrollCaption}
                width={640}
                height={2175}
                className="w-full h-auto block"
              />
            </AutoScrollViewport>
          </BrowserFrame>
          {scrollCaption && <figcaption className={CAPTION_CLASS}>{scrollCaption}</figcaption>}
        </figure>
      )}

      {rows.map((img, i) => {
        const caption = img.alt.replace(/^row:\s*/, "");
        return (
          <figure key={i} className="mt-lg">
            <div className="max-md:-mr-md max-md:overflow-x-auto">
              <Image
                src={img.src}
                alt={caption}
                width={1180}
                height={220}
                className="w-full h-auto block max-md:w-160 max-md:max-w-160"
              />
            </div>
            {caption && <figcaption className={CAPTION_CLASS}>{caption}</figcaption>}
          </figure>
        );
      })}

      <CaseStudyImageGrid images={rest} />
    </>
  );
}
