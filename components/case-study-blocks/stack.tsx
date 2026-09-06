import { renderInline } from "../case-study-content";
import type { BlockDef } from "./types";

interface StackGroup {
  label: string;
  items: string[];
}

interface StackColumn {
  label: string;
  title: string | null;
  paragraphs: string[];
  groups: StackGroup[];
}

interface StackBase {
  title: string;
  text: string;
}

/* `stack:` suivi de colonnes `- **Label** Titre | paragraphe | paragraphe`
   et d'une ligne de base `= **Titre** texte`. Trois colonnes dans le temps
   (la premiere est celle qui est livree, en encre), une couche de fondation
   qui court sous les trois, une fleche par colonne entre les deux. Dans une
   colonne, un segment `Nom: a; b; c` devient un groupe en pointille avec sa
   liste. Sur mobile les colonnes s'empilent, les fleches, les paragraphes et
   les listes disparaissent : il reste les en-tetes, un titre par colonne ou
   par groupe, et le titre de la base. */
export const stackBlock: BlockDef = {
  match: (lines) => lines[0].startsWith("stack:"),
  parse(lines) {
    const columns: StackColumn[] = [];
    let base: StackBase | null = null;
    for (const line of lines.slice(1)) {
      const col = line.match(/^- \*\*([^*]+)\*\*\s*(.*)$/);
      if (col) {
        const column: StackColumn = { label: col[1], title: null, paragraphs: [], groups: [] };
        for (const raw of col[2].split(" | ")) {
          const seg = raw.trim();
          const group = seg.match(/^([^:;]+): (.+;.+)$/);
          if (group) {
            column.groups.push({
              label: group[1],
              items: group[2].split(";").map((s) => s.trim()).filter(Boolean),
            });
          } else if (column.title === null) {
            column.title = seg;
          } else {
            column.paragraphs.push(seg);
          }
        }
        columns.push(column);
        continue;
      }
      const b = line.match(/^= \*\*([^*]+)\*\*\s*(.*)$/);
      if (b) base = { title: b[1], text: b[2] };
    }
    if (!columns.length) return null;
    const grid = "grid grid-cols-3 gap-sm max-md:grid-cols-1";
    return {
      render: (key, gap) => (
        <div key={key} className={`${gap} flex flex-col gap-sm`}>
          <div className={grid}>
            {columns.map((c, j) => (
              <div key={j} className="flex flex-col gap-xs">
                <p
                  className={`px-sm py-xs text-center font-body text-label font-medium uppercase tracking-label ${
                    j === 0 ? "bg-invert-bg text-invert-fg" : "bg-surface text-text-secondary"
                  }`}
                >
                  {c.label}
                </p>
                <div
                  className={`flex grow flex-col gap-sm bg-surface px-md py-md ${
                    j === 0 ? "border border-text-primary" : ""
                  }`}
                >
                  {c.title && (
                    <p className="font-display text-h4 font-bold tracking-h4 text-text-primary">
                      {renderInline(c.title)}
                    </p>
                  )}
                  {c.paragraphs.map((p, k) => (
                    <p key={k} className="font-body text-body-sm leading-body text-text-secondary max-md:hidden">
                      {renderInline(p)}
                    </p>
                  ))}
                  {c.groups.map((g, k) => (
                    <div key={k} className="flex grow flex-col">
                      <p className="font-display text-h4 font-bold tracking-h4 text-text-primary md:hidden">
                        {g.label}
                      </p>
                      <div className="flex grow flex-col gap-xs border border-dashed border-border-strong px-sm py-sm max-md:hidden">
                        <p className="font-body text-caption font-medium uppercase tracking-label text-text-secondary">
                          {g.label}
                        </p>
                        <ul className="flex flex-col gap-2xs font-body text-body-sm leading-body text-text-primary">
                          {g.items.map((it, m) => (
                            <li key={m}>{renderInline(it)}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {base && (
            <>
              <div className={`${grid} max-md:hidden`} aria-hidden="true">
                {columns.map((_, j) => (
                  <svg
                    key={j}
                    viewBox="0 0 16 24"
                    className="mx-auto h-6 w-4 text-text-tertiary"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M8 24V4" />
                    <path d="M2 9l6-6 6 6" />
                  </svg>
                ))}
              </div>
              <div className="flex flex-col gap-xs bg-invert-bg px-md py-md text-invert-fg max-md:mt-xs">
                <p className="font-display text-h4 font-bold tracking-h4">{renderInline(base.title)}</p>
                <p className="font-body text-body-sm leading-body opacity-80 max-md:hidden">{renderInline(base.text)}</p>
              </div>
            </>
          )}
        </div>
      ),
    };
  },
};
