import type { ReactNode } from "react";

/* Un bloc Markdown d'une etape (paragraphe separe par une ligne vide) qui
   n'est pas du texte. Chaque bloc vit dans son fichier et sait deux choses :
   se reconnaitre sur ses lignes, et se rendre. `parse` rend `null` quand le
   bloc n'a rien d'exploitable, il redevient alors du texte. */
export interface ParsedBlock {
  render: (key: number, gap: string) => ReactNode;
}

export interface BlockDef {
  match: (lines: string[]) => boolean;
  parse: (lines: string[]) => ParsedBlock | null;
}
