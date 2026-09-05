import Image from "next/image";
import { ArrowDownIcon } from "@heroicons/react/16/solid";
import { IPhoneFrame } from "./iphone-frame";
import { BrowserFrame } from "./browser-frame";
import { CaseStudyImageGrid } from "./case-study-image-grid";

interface ImageItem {
  alt: string;
  src: string;
}

/* Conventions Markdown, lues sur le alt des images d'une etape :
   - `phone: <legende>`            → rangee d'iPhones (jusqu'a 3), legende dessous
   - `scroll: <url> | <legende>`   → navigateur qui scrolle en boucle, legende dessous
   Les autres images passent par la grille habituelle. Une fleche vers le bas
   s'insere entre les iPhones et le navigateur quand l'etape a les deux. */

const CAPTION_CLASS =
  "mt-xs font-body text-caption italic font-normal text-text-tertiary";

export function CaseStudyMedia({ images }: { images: ImageItem[] }) {
  if (images.length === 0) return null;

  const phones = images.filter((i) => i.alt.startsWith("phone:"));
  const scroll = images.find((i) => i.alt.startsWith("scroll:"));
  const rest = images.filter(
    (i) => !i.alt.startsWith("phone:") && !i.alt.startsWith("scroll:")
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
      {phones.length > 0 && (
        <div className="mt-lg grid grid-cols-3 gap-md max-md:gap-sm">
          {phones.map((img, i) => {
            const caption = img.alt.replace(/^phone:\s*/, "");
            return (
              <figure key={i}>
                <IPhoneFrame>
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
            <div className="case-scroll-viewport h-120 overflow-hidden">
              <Image
                src={scroll.src}
                alt={scrollCaption}
                width={640}
                height={2175}
                className="case-scroll-img w-full h-auto block"
              />
            </div>
          </BrowserFrame>
          {scrollCaption && <figcaption className={CAPTION_CLASS}>{scrollCaption}</figcaption>}
        </figure>
      )}

      <CaseStudyImageGrid images={rest} />
    </>
  );
}
