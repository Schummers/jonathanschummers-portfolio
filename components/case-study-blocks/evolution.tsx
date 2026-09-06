import { CaseStudyEvolution, type EvolutionFrame } from "../case-study-evolution";
import type { BlockDef } from "./types";

/* `evolution:` suivi, par etat, d'une ligne `- <commit> | <src>` puis de
   puces indentees `  - <ce que j'ai change>` : la timeline dans un iPhone
   (`CaseStudyEvolution`). */
export const evolutionBlock: BlockDef = {
  match: (lines) => lines[0].startsWith("evolution:"),
  parse(lines) {
    const frames: EvolutionFrame[] = [];
    for (const line of lines.slice(1)) {
      const head = line.match(/^- (.+?)\s*\|\s*(\S+)$/);
      if (head) {
        frames.push({ label: head[1], src: decodeURIComponent(head[2]), points: [] });
        continue;
      }
      const point = line.match(/^\s+- (.+)$/);
      if (point && frames.length) frames[frames.length - 1].points.push(point[1]);
    }
    if (!frames.length) return null;
    return {
      render: (key, gap) => (
        <div key={key} className={gap}>
          <CaseStudyEvolution frames={frames} />
        </div>
      ),
    };
  },
};
