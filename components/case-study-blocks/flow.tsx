import { renderInline } from "../case-study-content";
import type { BlockDef } from "./types";

interface FlowPhase {
  name: string;
  text: string;
}

/* `flow:` suivi de bullets `- **Nom**: ce que fait la phase` : une bande de
   phases numerotees, cartes sur fond surface, 3 par ligne sur desktop, une
   par ligne sur mobile avec le numero a gauche. */
export const flowBlock: BlockDef = {
  match: (lines) => lines[0].startsWith("flow:"),
  parse(lines) {
    const phases: FlowPhase[] = [];
    for (const line of lines.slice(1)) {
      const m = line.match(/^- \*\*([^*]+)\*\*:?\s*(.*)$/);
      if (m) phases.push({ name: m[1], text: m[2] });
    }
    if (!phases.length) return null;
    return {
      render: (key, gap) => (
        <ol key={key} className={`${gap} grid grid-cols-3 gap-sm max-md:grid-cols-1`}>
          {phases.map((ph, j) => (
            <li
              key={j}
              className="bg-surface px-md py-md flex flex-col gap-xs max-md:flex-row max-md:gap-sm"
            >
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-bg font-display text-label font-bold text-text-primary">
                {j + 1}
              </span>
              <div className="flex flex-col gap-xs">
                <p className="font-display text-h4 font-bold tracking-h4 text-text-primary">{ph.name}</p>
                <p className="font-body text-body-sm leading-body text-text-secondary">
                  {renderInline(ph.text)}
                </p>
              </div>
            </li>
          ))}
        </ol>
      ),
    };
  },
};
