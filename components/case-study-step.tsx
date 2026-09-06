import type { CaseStudyStep as StepData } from "@/lib/case-studies";
import { CaseStudyContent } from "./case-study-content";
import { CaseStudyMedia } from "./case-study-media";
import { CaseStudyEvolution, type EvolutionFrame } from "./case-study-evolution";
import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";

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

interface Pick {
  text: string;
  chosen: boolean;
}

interface Picks {
  caption: string;
  items: Pick[];
}

/* Conventions Markdown, lues sur les blocs du contenu d'une etape :
   - `stats:` suivi de bullets `- **836** Visitors` devient une rangee de
     mini-cards, rendue apres les medias de l'etape.
   - `picks: <legende>` suivi de bullets `- [ ] rejetee` / `- [x] retenue`
     devient une liste d'options barrees, une seule cochee, sur fond surface.
   Les deux sont extraits quel que soit leur emplacement dans le texte.
   - `evolution:` suivi de lignes `- <commit> | <ce que j'ai change> | <src>`
     devient la timeline dans un iPhone (`CaseStudyEvolution`), rendue la ou
     le bloc est ecrit, comme un groupe d'images. */
function parseEvolution(block: string): EvolutionFrame[] {
  const frames: EvolutionFrame[] = [];
  for (const line of block.split("\n").slice(1)) {
    const m = line.match(/^- (.+?)\s*\|\s*(.+?)\s*\|\s*(\S+)$/);
    if (m) frames.push({ label: m[1], caption: m[2], src: decodeURIComponent(m[3]) });
  }
  return frames;
}

function splitBlocks(content: string): {
  text: string;
  stats: Stat[];
  picks: Picks | null;
} {
  const blocks = content.split("\n\n");
  const stats: Stat[] = [];
  let picks: Picks | null = null;
  const kept: string[] = [];

  for (const block of blocks) {
    const trimmed = block.trim();
    if (trimmed.startsWith("stats:")) {
      for (const line of trimmed.split("\n")) {
        const m = line.match(/^- \*\*([^*]+)\*\*\s*(.*)$/);
        if (m) stats.push({ value: m[1], label: m[2] });
      }
      continue;
    }
    if (trimmed.startsWith("picks:")) {
      const [head, ...lines] = trimmed.split("\n");
      const items: Pick[] = [];
      for (const line of lines) {
        const m = line.match(/^- \[( |x)\]\s*(.*)$/);
        if (m) items.push({ chosen: m[1] === "x", text: m[2] });
      }
      picks = { caption: head.replace(/^picks:\s*/, "").trim(), items };
      continue;
    }
    kept.push(block);
  }

  return { text: kept.join("\n\n"), stats, picks };
}

export function CaseStudyStep({
  step,
  stepIndex,
  groupId,
  isFirstWithContent,
}: CaseStudyStepProps) {
  const marginClass =
    isFirstWithContent ? "mt-lg" : stepIndex === 0 ? "" : "mt-xl";

  const { text, stats, picks } = splitBlocks(step.content);

  /* Le contenu alterne texte et groupes d'images (lignes `![alt](src)`
     conservees par le parser). Chaque groupe est rendu la ou il est ecrit. */
  const segments: {
    text: string;
    images: typeof step.images;
    evolution?: EvolutionFrame[];
  }[] = [];
  let cur = { text: "", images: [] as typeof step.images };
  for (const block of text.split("\n\n")) {
    if (block.trim().startsWith("evolution:")) {
      segments.push({ ...cur, evolution: parseEvolution(block.trim()) });
      cur = { text: "", images: [] };
      continue;
    }
    const lines = block.trim().split("\n");
    const imgs = lines
      .map((l) => l.match(/^!\[([^\]]*)\]\(([^)]+)\)$/))
      .filter((m): m is RegExpMatchArray => m !== null)
      .map((m) => ({ alt: m[1], src: decodeURIComponent(m[2]) }));
    if (imgs.length === lines.length && imgs.length > 0) {
      cur.images.push(...imgs);
      segments.push(cur);
      cur = { text: "", images: [] };
    } else {
      cur.text += (cur.text ? "\n\n" : "") + block;
    }
  }
  if (cur.text || cur.images.length) segments.push(cur);

  return (
    <div className={marginClass}>
      {stepIndex > 0 && groupId === "how" && (
        <hr className="border-t border-border/50 mb-xl" />
      )}
      <h3 className="font-display text-h3 font-bold leading-h3 tracking-h3 text-text-primary">
        {step.heading}
      </h3>
      {segments.map((seg, i) => (
        <div key={i} className={i === 0 ? "mt-xs" : "mt-lg"}>
          {seg.text && <CaseStudyContent text={seg.text} />}
          <CaseStudyMedia images={seg.images} />
          {seg.evolution && seg.evolution.length > 0 && (
            <CaseStudyEvolution frames={seg.evolution} />
          )}
        </div>
      ))}
      {picks && picks.items.length > 0 && (
        <figure className="mt-lg">
          <ul className="bg-surface px-md py-md flex flex-col gap-sm">
            {picks.items.map((p, i) => (
              <li
                key={i}
                className="flex items-start gap-sm font-display text-h3 font-bold leading-h3 tracking-h3"
              >
                {/* h-lh = une ligne de texte, le cercle se centre sur la premiere ligne */}
                <span className="flex h-lh shrink-0 items-center">
                  <span className="flex size-7 items-center justify-center rounded-full bg-bg">
                    {p.chosen ? (
                      <CheckIcon className="size-4 text-green-600" aria-label="Chosen" />
                    ) : (
                      <XMarkIcon className="size-4 text-red-500" aria-label="Rejected" />
                    )}
                  </span>
                </span>
                <span
                  className={
                    p.chosen
                      ? "text-text-primary"
                      : "text-text-secondary line-through decoration-1"
                  }
                >
                  {p.text}
                </span>
              </li>
            ))}
          </ul>
          {picks.caption && (
            <figcaption className="mt-xs font-body text-caption italic font-normal text-text-tertiary">
              {picks.caption}
            </figcaption>
          )}
        </figure>
      )}
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
