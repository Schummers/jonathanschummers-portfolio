import type { CaseStudyImage } from "@/lib/case-studies";
import { CaseStudyMedia } from "../case-study-media";
import type { BlockDef } from "./types";

const IMAGE_LINE = /^!\[([^\]]*)\]\(([^)]+)\)$/;

/* Un bloc fait uniquement de lignes `![alt](src)` : un groupe de medias,
   reparti par `CaseStudyMedia` selon la directive du alt. */
export const imagesBlock: BlockDef = {
  match: (lines) => lines.every((l) => IMAGE_LINE.test(l)),
  parse(lines) {
    const images: CaseStudyImage[] = lines.map((l) => {
      const m = l.match(IMAGE_LINE)!;
      return { alt: m[1], src: decodeURIComponent(m[2]) };
    });
    return {
      render: (key, gap) => (
        <div key={key} className={gap}>
          <CaseStudyMedia images={images} />
        </div>
      ),
    };
  },
};
