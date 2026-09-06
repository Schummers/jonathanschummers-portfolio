import { ArrowRightIcon } from "@heroicons/react/16/solid";
import { renderInline } from "../case-study-content";
import { CaseStudyCaption } from "../case-study-caption";
import type { BlockDef } from "./types";

interface PipelineNode {
  title: string;
  hint: string;
  tables: string[];
  /* Table de liaison vers l'etape suivante, en derniere ligne, avec une fleche. */
  link: string;
}

/* `pipeline:` suivi de noeuds `- **Ce que fait l'utilisateur** indice | table; table`
   et, entre deux noeuds, d'une ligne `-> table_de_liaison` (vide si aucune).
   Une ligne `= legende` ferme le bloc.
   Une carte par etape, sur fond surface : l'action en haut (hauteur minimale
   fixe pour que les filets s'alignent d'une carte a l'autre), un filet, puis
   les tables que l'etape ecrit. Une fleche entre deux cartes. Sur mobile les
   cartes s'empilent, les tables et les fleches disparaissent. */
export const pipelineBlock: BlockDef = {
  match: (lines) => lines[0].startsWith("pipeline:"),
  parse(lines) {
    const nodes: PipelineNode[] = [];
    let caption = "";
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
      const cap = line.match(/^=\s*(.+)$/);
      if (cap) caption = cap[1].trim();
    }
    if (!nodes.length) return null;
    return {
      render: (key, gap) => (
        <figure key={key} className={gap}>
          <ol className="flex items-stretch gap-2xs max-md:flex-col max-md:gap-xs">
            {nodes.map((n, j) => (
              <li key={j} className="contents">
                <div className="flex flex-1 basis-0 flex-col bg-surface px-sm py-sm max-md:flex-none">
                  <div className="flex flex-col gap-2xs md:min-h-28">
                    <p className="font-display text-body-sm font-bold text-text-primary">{renderInline(n.title)}</p>
                    {n.hint && <p className="font-body text-caption text-text-secondary">{n.hint}</p>}
                  </div>
                  <ul className="mt-sm flex flex-col gap-2xs border-t border-border pt-sm font-body text-caption text-text-secondary max-md:hidden">
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
                </div>
                {j < nodes.length - 1 && (
                  <span aria-hidden="true" className="flex w-5 shrink-0 items-center justify-center text-text-tertiary max-md:hidden">
                    <ArrowRightIcon className="size-4" />
                  </span>
                )}
              </li>
            ))}
          </ol>
          <CaseStudyCaption className="max-md:hidden">{caption}</CaseStudyCaption>
        </figure>
      ),
    };
  },
};
