import type { CaseStudyStep as StepData } from "@/lib/case-studies";
import { CaseStudyContent } from "./case-study-content";
import { CaseStudyMedia } from "./case-study-media";

interface CaseStudyStepProps {
  step: StepData;
  stepIndex: number;
  groupId: string;
  isFirstWithContent: boolean;
}

interface Stat {
  value: string;
  label: string;
}

/* Convention Markdown : un bloc qui commence par la ligne `stats:` suivie de
   bullets `- **836** Visitors` devient une rangee de mini-cards, rendue apres
   les medias de l'etape quel que soit son emplacement dans le texte. */
function splitStats(content: string): { text: string; stats: Stat[] } {
  const blocks = content.split("\n\n");
  const stats: Stat[] = [];
  const kept: string[] = [];

  for (const block of blocks) {
    if (!block.trim().startsWith("stats:")) {
      kept.push(block);
      continue;
    }
    for (const line of block.split("\n")) {
      const m = line.match(/^- \*\*([^*]+)\*\*\s*(.*)$/);
      if (m) stats.push({ value: m[1], label: m[2] });
    }
  }

  return { text: kept.join("\n\n"), stats };
}

export function CaseStudyStep({
  step,
  stepIndex,
  groupId,
  isFirstWithContent,
}: CaseStudyStepProps) {
  const marginClass =
    isFirstWithContent ? "mt-lg" : stepIndex === 0 ? "" : "mt-xl";

  const { text, stats } = splitStats(step.content);

  return (
    <div className={marginClass}>
      {stepIndex > 0 && groupId === "how" && (
        <hr className="border-t border-border/50 mb-xl" />
      )}
      <h3 className="font-display text-h3 font-bold leading-h3 tracking-h3 text-text-primary">
        {step.heading}
      </h3>
      <div className="mt-xs">
        <CaseStudyContent text={text} />
      </div>
      <CaseStudyMedia images={step.images} />
      {stats.length > 0 && (
        <div className="mt-lg grid grid-cols-4 gap-sm max-md:grid-cols-2">
          {stats.map((s, i) => (
            <div key={i} className="bg-surface px-md py-md">
              <p className="font-display text-h3 font-bold leading-h3 tracking-h3 text-text-primary">
                {s.value}
              </p>
              <p className="mt-xs font-body text-caption text-text-secondary">{s.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
