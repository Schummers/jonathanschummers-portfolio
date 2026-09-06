import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { CaseStudyCaption } from "../case-study-caption";
import type { BlockDef } from "./types";

interface Pick {
  text: string;
  chosen: boolean;
}

/* `picks: <legende>` suivi de bullets `- [ ] rejetee` / `- [x] retenue` :
   une liste d'options barrees, une seule cochee, sur fond surface. Les
   icones portent les tokens d'etat `success` / `error`. */
export const picksBlock: BlockDef = {
  match: (lines) => lines[0].startsWith("picks:"),
  parse(lines) {
    const [head, ...rest] = lines;
    const caption = head.replace(/^picks:\s*/, "").trim();
    const items: Pick[] = [];
    for (const line of rest) {
      const m = line.match(/^- \[( |x)\]\s*(.*)$/);
      if (m) items.push({ chosen: m[1] === "x", text: m[2] });
    }
    if (!items.length) return null;
    return {
      render: (key, gap) => (
        <figure key={key} className={gap}>
          <ul className="bg-surface px-md py-md flex flex-col gap-sm">
            {items.map((p, j) => (
              <li
                key={j}
                className="flex items-start gap-sm font-display text-h3 font-bold leading-h3 tracking-h3"
              >
                {/* h-lh = une ligne de texte, le cercle se centre sur la premiere ligne */}
                <span className="flex h-lh shrink-0 items-center">
                  <span className="flex size-7 items-center justify-center rounded-full bg-bg">
                    {p.chosen ? (
                      <CheckIcon className="size-4 text-success" aria-label="Chosen" />
                    ) : (
                      <XMarkIcon className="size-4 text-error" aria-label="Rejected" />
                    )}
                  </span>
                </span>
                <span
                  className={
                    p.chosen ? "text-text-primary" : "text-text-secondary line-through decoration-1"
                  }
                >
                  {p.text}
                </span>
              </li>
            ))}
          </ul>
          <CaseStudyCaption>{caption}</CaseStudyCaption>
        </figure>
      ),
    };
  },
};
