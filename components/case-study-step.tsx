import type { CaseStudyStep as StepData } from "@/lib/case-studies";
import { CaseStudyContent } from "./case-study-content";
import { CaseStudyMedia } from "./case-study-media";
import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";

interface CaseStudyStepProps {
  step: StepData;
  stepIndex: number;
  groupId: string;
  isFirstWithContent: boolean;
}

interface Stat {
  value: string;
  previous: string | null;
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

type Image = { alt: string; src: string };

type Segment =
  | { kind: "text"; text: string }
  | { kind: "images"; images: Image[] }
  | { kind: "stats"; stats: Stat[] }
  | { kind: "picks"; picks: Picks }
  | { kind: "table"; rows: string[][] };

/* Conventions Markdown, lues bloc par bloc (blocs separes par une ligne
   vide) et rendues a l'endroit ou elles sont ecrites :
   - un bloc de lignes `![alt](src)` devient un groupe de medias ;
   - `stats:` suivi de bullets `- **836** Visitors` devient une rangee de
     mini-cards. `- **~~836~~ 312** Visitors` barre l'ancienne valeur avant
     la nouvelle ;
   - `picks: <legende>` suivi de bullets `- [ ] rejetee` / `- [x] retenue`
     devient une liste d'options barrees, une seule cochee, sur fond surface ;
   - `table:` suivi de lignes `| a | b |` devient un tableau, premiere ligne
     en en-tete, ligne `|---|` ignoree, scroll horizontal sur mobile. */
function parseSegments(content: string): Segment[] {
  const segments: Segment[] = [];
  let text: string[] = [];
  const flushText = () => {
    if (text.length) segments.push({ kind: "text", text: text.join("\n\n") });
    text = [];
  };

  for (const block of content.split("\n\n")) {
    const trimmed = block.trim();
    if (!trimmed) continue;
    const lines = trimmed.split("\n");

    if (trimmed.startsWith("stats:")) {
      const stats: Stat[] = [];
      for (const line of lines) {
        const m = line.match(/^- \*\*([^*]+)\*\*\s*(.*)$/);
        if (!m) continue;
        const prev = m[1].match(/^~~([^~]+)~~\s*(.+)$/);
        stats.push({
          value: prev ? prev[2] : m[1],
          previous: prev ? prev[1] : null,
          label: m[2],
        });
      }
      flushText();
      segments.push({ kind: "stats", stats });
      continue;
    }

    if (trimmed.startsWith("picks:")) {
      const [head, ...rest] = lines;
      const items: Pick[] = [];
      for (const line of rest) {
        const m = line.match(/^- \[( |x)\]\s*(.*)$/);
        if (m) items.push({ chosen: m[1] === "x", text: m[2] });
      }
      flushText();
      segments.push({
        kind: "picks",
        picks: { caption: head.replace(/^picks:\s*/, "").trim(), items },
      });
      continue;
    }

    if (trimmed.startsWith("table:")) {
      const rows = lines
        .slice(1)
        .filter((l) => l.startsWith("|") && !/^\|\s*-/.test(l))
        .map((l) =>
          l
            .replace(/^\|/, "")
            .replace(/\|$/, "")
            .split("|")
            .map((c) => c.trim()),
        );
      flushText();
      segments.push({ kind: "table", rows });
      continue;
    }

    const imgs = lines
      .map((l) => l.match(/^!\[([^\]]*)\]\(([^)]+)\)$/))
      .filter((m): m is RegExpMatchArray => m !== null)
      .map((m) => ({ alt: m[1], src: decodeURIComponent(m[2]) }));
    if (imgs.length === lines.length) {
      flushText();
      segments.push({ kind: "images", images: imgs });
      continue;
    }

    text.push(trimmed);
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

        if (seg.kind === "text") {
          return (
            <div key={i} className={gap}>
              <CaseStudyContent text={seg.text} />
            </div>
          );
        }

        if (seg.kind === "images") {
          return (
            <div key={i} className={gap}>
              <CaseStudyMedia images={seg.images} />
            </div>
          );
        }

        if (seg.kind === "picks") {
          const { picks } = seg;
          if (!picks.items.length) return null;
          return (
            <figure key={i} className={gap}>
              <ul className="bg-surface px-md py-md flex flex-col gap-sm">
                {picks.items.map((p, j) => (
                  <li
                    key={j}
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
          );
        }

        if (seg.kind === "stats") {
          return (
            <div key={i} className={`${gap} grid grid-cols-4 gap-sm max-md:grid-cols-2`}>
              {seg.stats.map((s, j) => (
                <div key={j} className="bg-surface px-md py-md">
                  <p className="font-display text-h3 font-bold leading-h3 tracking-h3 text-text-primary">
                    {s.previous && (
                      <>
                        <span className="text-text-tertiary line-through decoration-1">
                          {s.previous}
                        </span>{" "}
                      </>
                    )}
                    {s.value}
                  </p>
                  <p className="mt-xs font-body text-caption text-text-secondary">{s.label}</p>
                </div>
              ))}
            </div>
          );
        }

        if (seg.kind === "table") {
          const [head, ...body] = seg.rows;
          if (!head) return null;
          return (
            <div key={i} className={`${gap} overflow-x-auto`}>
              <table className="w-full min-w-xl border-collapse font-body text-body-sm leading-body text-text-primary">
                <thead>
                  <tr className="border-b border-border">
                    {head.map((c, j) => (
                      <th
                        key={j}
                        scope="col"
                        className={`py-xs pr-sm font-semibold whitespace-nowrap text-text-secondary ${
                          j === 0 ? "text-left" : "text-right"
                        }`}
                      >
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {body.map((row, r) => (
                    <tr key={r} className="border-b border-border/50">
                      {row.map((c, j) => (
                        <td
                          key={j}
                          className={`py-xs pr-sm tabular-nums whitespace-nowrap ${
                            j === 0
                              ? "text-left text-text-secondary"
                              : "text-right"
                          }`}
                        >
                          {c}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
