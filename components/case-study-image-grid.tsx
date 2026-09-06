import Image from "next/image";
import { parseMediaDirective, type CaseStudyImage } from "@/lib/case-studies";
import { CaseStudyCaption } from "./case-study-caption";

interface GridImage {
  src: string;
  alt: string;
  caption: string;
}

interface Layout {
  wrapper: string;
  figure?: string;
  width: number;
  height: number;
  imgClass: string;
}

/* Une mise en page par nombre d'images : bande qui defile a partir de 5,
   sinon une grille de 4, 3, 2 ou 1 colonne. */
function layoutFor(count: number): Layout {
  if (count >= 5)
    return {
      wrapper: "flex gap-sm px-xl max-md:px-md pb-sm",
      figure: "shrink-0 w-44",
      width: 180,
      height: 320,
      imgClass: "w-full h-auto object-cover",
    };
  if (count === 4)
    return { wrapper: "grid grid-cols-4 gap-sm max-md:grid-cols-2", width: 200, height: 150, imgClass: "w-full object-cover" };
  if (count === 3)
    return { wrapper: "grid grid-cols-3 gap-sm items-start", width: 360, height: 640, imgClass: "w-full h-auto" };
  if (count === 2)
    return { wrapper: "grid grid-cols-2 gap-md items-start max-md:grid-cols-1", width: 420, height: 280, imgClass: "w-full h-auto" };
  return { wrapper: "", width: 640, height: 400, imgClass: "w-full h-auto" };
}

export function CaseStudyImageGrid({ images: raw }: { images: CaseStudyImage[] }) {
  /* `plain:` garde son alt pour les lecteurs d'ecran, sans legende affichee. */
  const images: GridImage[] = raw.map((i) => {
    const d = parseMediaDirective(i.alt);
    return d.kind === "grid"
      ? { src: i.src, alt: d.alt, caption: d.caption }
      : { src: i.src, alt: i.alt, caption: i.alt };
  });
  if (images.length === 0) return null;

  const strip = images.length >= 5;
  const l = layoutFor(images.length);

  const figures = images.map((img, i) => (
    <figure key={i} className={l.figure}>
      <Image src={img.src} alt={img.alt} width={l.width} height={l.height} className={l.imgClass} />
      <CaseStudyCaption>{img.caption}</CaseStudyCaption>
    </figure>
  ));

  if (strip) {
    return (
      <div className="mt-lg -mx-xl max-md:-mx-md overflow-x-auto">
        <div className={l.wrapper} style={{ width: "max-content" }}>
          {figures}
        </div>
      </div>
    );
  }

  return <div className={`mt-lg ${l.wrapper}`}>{figures}</div>;
}
