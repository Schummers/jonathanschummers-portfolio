import type { BlockDef } from "./types";
import { statsBlock } from "./stats";
import { picksBlock } from "./picks";
import { flowBlock } from "./flow";
import { tableBlock } from "./table";
import { evolutionBlock } from "./evolution";
import { imagesBlock } from "./images";
import { stackBlock } from "./stack";
import { pipelineBlock } from "./pipeline";

/* Registre des blocs Markdown d'une etape, dans l'ordre d'essai. Ajouter
   une convention = un fichier ici et une ligne dans ce tableau. */
export const CASE_STUDY_BLOCKS: BlockDef[] = [
  statsBlock,
  picksBlock,
  flowBlock,
  tableBlock,
  evolutionBlock,
  stackBlock,
  pipelineBlock,
  imagesBlock,
];

export type { BlockDef, ParsedBlock } from "./types";
