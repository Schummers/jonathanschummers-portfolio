import type { CaseStudyStep as StepData } from "@/lib/case-studies";
import { CaseStudyContent } from "./case-study-content";
import { CASE_STUDY_BLOCKS, type ParsedBlock } from "./case-study-blocks";

interface CaseStudyStepProps {
  step: StepData;
  stepIndex: number;
  groupId: string;
  isFirstWithContent: boolean;
}

type Segment = { kind: "text"; text: string } | { kind: "block"; block: ParsedBlock };

/* Le contenu d'une etape est lu bloc par bloc (blocs separes par une ligne
   vide) et rendu dans l'ordre du texte. Un bloc reconnu par une convention
   de `case-study-blocks/` (stats, picks, flow, table, evolution, images)
   devient son composant ; le reste est du texte, regroupe entre deux blocs. */
function parseSegments(content: string): Segment[] {
  const segments: Segment[] = [];
  let text: string[] = [];
  const flushText = () => {
    if (text.length) segments.push({ kind: "text", text: text.join("\n\n") });
    text = [];
  };

  for (const raw of content.split("\n\n")) {
    const trimmed = raw.trim();
    if (!trimmed) continue;
    const lines = trimmed.split("\n");

    const def = CASE_STUDY_BLOCKS.find((b) => b.match(lines));
    const block = def?.parse(lines) ?? null;
    if (block) {
      flushText();
      segments.push({ kind: "block", block });
    } else {
      text.push(trimmed);
    }
  }
  flushText();
  return segments;
}

export function CaseStudyStep({
  step,
  stepIndex,
  groupId,
  isFirstWithContent,
}: CaseStudyStepProps) {
  const marginClass =
    isFirstWithContent ? "mt-lg" : stepIndex === 0 ? "" : "mt-xl";

  const segments = parseSegments(step.content);

  return (
    <div className={marginClass}>
      {stepIndex > 0 && groupId === "how" && (
        <hr className="border-t border-border/50 mb-xl" />
      )}
      <h3 className="font-display text-h3 font-bold leading-h3 tracking-h3 text-text-primary">
        {step.heading}
      </h3>
      {segments.map((seg, i) => {
        const gap = i === 0 ? "mt-xs" : "mt-lg";
        if (seg.kind === "block") return seg.block.render(i, gap);
        return (
          <div key={i} className={gap}>
            <CaseStudyContent text={seg.text} />
          </div>
        );
      })}
    </div>
  );
}
