import type { BlockDef } from "./types";

interface Stat {
  value: string;
  previous: string | null;
  label: string;
}

/* `stats:` suivi de bullets `- **836** Visitors` : une rangee de mini-cards.
   `- **~~836~~ 312** Visitors` barre l'ancienne valeur avant la nouvelle. */
export const statsBlock: BlockDef = {
  match: (lines) => lines[0].startsWith("stats:"),
  parse(lines) {
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
    if (!stats.length) return null;
    return {
      render: (key, gap) => (
        <div key={key} className={`${gap} grid grid-cols-4 gap-sm max-md:grid-cols-2`}>
          {stats.map((s, j) => (
            <div key={j} className="bg-surface px-md py-md">
              <p className="font-display text-h3 font-bold leading-h3 tracking-h3 text-text-primary">
                {s.previous && (
                  <>
                    <span className="text-text-tertiary line-through decoration-1">{s.previous}</span>{" "}
                  </>
                )}
                {s.value}
              </p>
              <p className="mt-xs font-body text-caption text-text-secondary">{s.label}</p>
            </div>
          ))}
        </div>
      ),
    };
  },
};
