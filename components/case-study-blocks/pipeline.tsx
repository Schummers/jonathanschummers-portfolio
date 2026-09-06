import { ArrowRightIcon } from "@heroicons/react/16/solid";
import { renderInline } from "../case-study-content";
import type { BlockDef } from "./types";

interface PipelineNode {
  title: string;
  hint: string;
  tables: string[];
  /* Table de liaison posee sur la fleche qui suit ce noeud. */
  link: string;
}

/* `pipeline:` suivi de noeuds `- **Ce que fait l'utilisateur** indice | table; table`
   et, entre deux noeuds, d'une ligne `-> table_de_liaison` (vide si aucune).
   Une ligne `= Label du haut | Label du bas` nomme les deux rangees.
   Deux rangees alignees : le parcours utilisateur en cartes, et sous chaque
   carte les tables que l'etape ecrit, la table de liaison vers l'etape
   suivante en derniere ligne, precedee d'une fleche.
   Sur mobile la rangee data et les fleches disparaissent, les cartes
   s'empilent. */
export const pipelineBlock: BlockDef = {
  match: (lines) => lines[0].startsWith("pipeline:"),
  parse(lines) {
    const nodes: PipelineNode[] = [];
    let labels = ["What the user does", "What the data becomes"];
    for (const line of lines.slice(1)) {
      const node = line.match(/^- \*\*([^*]+)\*\*\s*(.*)$/);
      if (node) {
        const [hint = "", tables = ""] = node[2].split(" | ");
        nodes.push({
          title: node[1],
          hint: hint.trim(),
          tables: tables.split(";").map((t) => t.trim()).filter(Boolean),
          link: "",
        });
        continue;
      }
      const link = line.match(/^->\s*(.*)$/);
      if (link && nodes.length) {
        nodes[nodes.length - 1].link = link[1].trim();
        continue;
      }
      const lab = line.match(/^=\s*(.+)$/);
      if (lab) labels = lab[1].split(" | ").map((l) => l.trim());
    }
    if (!nodes.length) return null;
    const label = "font-body text-label font-medium uppercase tracking-label text-text-secondary";
    return {
      render: (key, gap) => (
        <div key={key} className={`${gap} flex flex-col gap-xs`}>
          <p className={label}>{labels[0]}</p>
          <ol className="flex items-stretch gap-2xs max-md:flex-col max-md:gap-xs">
            {nodes.map((n, j) => (
              <li key={j} className="contents">
                <div className="flex flex-1 basis-0 flex-col gap-2xs bg-surface px-sm py-sm max-md:flex-none">
                  <p className="font-display text-body-sm font-bold text-text-primary">{renderInline(n.title)}</p>
                  {n.hint && <p className="font-body text-caption text-text-secondary">{n.hint}</p>}
                </div>
                {j < nodes.length - 1 && (
                  <span aria-hidden="true" className="flex w-5 shrink-0 items-center justify-center text-text-tertiary max-md:hidden">
                    <ArrowRightIcon className="size-4" />
                  </span>
                )}
              </li>
            ))}
          </ol>
          <p className={`${label} mt-xs max-md:hidden`}>{labels[1]}</p>
          <div className="flex items-start gap-2xs max-md:hidden">
            {nodes.map((n, j) => (
              <div key={j} className="contents">
                <ul className="flex flex-1 basis-0 flex-col gap-2xs px-sm font-body text-caption text-text-secondary">
                  {n.tables.map((t, m) => (
                    <li key={m}>{t}</li>
                  ))}
                  {n.link && (
                    <li className="flex items-center gap-2xs text-text-tertiary">
                      <ArrowRightIcon className="size-3 shrink-0" aria-hidden="true" />
                      {n.link}
                    </li>
                  )}
                </ul>
                {j < nodes.length - 1 && <span className="w-5 shrink-0" aria-hidden="true" />}
              </div>
            ))}
          </div>
        </div>
      ),
    };
  },
};
