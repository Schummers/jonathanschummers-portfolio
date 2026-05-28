# DS Audit — Summary

_Run du 2026-05-28 via `/ds-audit` (audit qualitatif, le checker déterministe `npm run ds:check` est complémentaire)_

## Findings par page

| Page | high | medium | low | **total** | Rapport |
|---|---:|---:|---:|---:|---|
| `/` (homepage) | 34 | 0 | 0 | **34** | [home.md](home.md) |
| `/work/bforbank` | 12 | 0 | 0 | **12** | [work-bforbank.md](work-bforbank.md) |
| `/work/boosted` | 9 | 1 | 0 | **10** | [work-boosted.md](work-boosted.md) |
| `/work/nod-v2` | 11 | 1 | 0 | **12** | [work-nod-v2.md](work-nod-v2.md) |
| `/work/smartintegrity-v2` | 10 | 0 | 0 | **10** | [work-smartintegrity-v2.md](work-smartintegrity-v2.md) |
| `/work/spie-bat-v2` | 6 | 4 | 3 | **13** | [work-spie-bat-v2.md](work-spie-bat-v2.md) |
| **Total** | **82** | **6** | **3** | **91** | |

> _Note : les findings sont en grande partie systémiques — la même règle violée dans le même fichier partagé (ex : `blueprint-shell.tsx:13`) apparaît dans chaque rapport. Le compte unique de violations distinctes est plus proche de **~40** (voir cluster ci-dessous)._

## Top 5 violations transverses

Classées par nombre de pages affectées.

| Rang | Règle / pattern | Fichier:ligne | Pages | Sévérité |
|---|---|---|---:|---|
| 1 | `max-w-[1400px]` (blueprint-max non tokenisé) | `components/blueprint-shell.tsx:13`, `nav.tsx:25`+`:60`, `footer.tsx:12` | 6/6 | high |
| 2 | `py-[12px]` button (12px hors grille 4px) | `components/button.tsx:23` | 6/6 | high (med dans spie/smartintegrity) |
| 3 | `min-w-[140px]` colonnes layout case-study | `app/work/[slug]/page.tsx:209`+`:383` | 5/5 case studies | high |
| 4 | `w-[204px]` TOC sidebar (hors grille) | `components/case-study-toc.tsx:37` | 5/5 case studies | high/med |
| 5 | `w-[180px]` image grid thumb (hors grille) | `components/case-study-image-grid.tsx:16` | 5/5 case studies | high/med |

## Pages les plus saines (0 high)

**Aucune.** Toutes les pages héritent des violations partagées des composants layout (BlueprintShell, Nav, Footer, Button).

La page la moins problématique en findings distincts est `/work/boosted` (10 findings, tous systémiques sauf le bare hover dans case-study-header).

## Page la plus problématique

**`/` (homepage)** avec 34 findings, dont :
- 2 raw-hex (`bg-[#0B1013]` dans `about.tsx:59` et `:70`) — seules violations raw-hex de tout le portfolio
- Prolifération de brackets dans `about.tsx` (11 findings sur ce seul fichier)
- Composants `bforbank-showcase`, `browser-frame`, `project-card-featured/compact` chacun avec 4–5 brackets

## Pattern observé

Sur les 91 findings totaux, **88 sont de type `arbitrary-bracket`** (97%). Le reste :
- 2 `raw-hex` (homepage uniquement, `about.tsx`)
- 2 `raw-component` (inline `style={{ height: 600 }}` dans le step 6 bforbank)
- 3 occurrences de `bare-hover` (toutes sur `components/case-study-header.tsx:70`, propagées aux pages case-study)

Il n'y a **aucune violation de la règle "1 brand button max"** ni de problème de **dark mode parity** détecté.

## Notes transverses

1. **Le token `--blueprint-max` existe déjà** dans `app/globals.css:51` et est mappé à `--width-blueprint` dans `@theme inline` (ligne 270), mais n'est utilisé nulle part. Exposer/utiliser `max-w-blueprint` supprime 4 findings × multiples pages d'un coup.
2. **L'exception Figma-exact du Tag** (`px-[10px] py-[6px]` dans `tag.tsx:16`) est documentée en commentaire mais reste une violation hard rule AGENTS.md. Décision DS à arbitrer : relâcher la règle ou normaliser le tag.
3. **Les `duration-[var(--dur-fast)]`** utilisés partout sont sémantiquement corrects (référencent un CSS-var défini) mais en syntaxe bracket. Question : migrer vers utilities Tailwind v4 nommées (`duration-fast`) si exposées via `@theme inline`.
4. **Le step 6 bforbank** (`app/work/[slug]/page.tsx:315` + `:329`) est le seul cas d'inline `style={{ height: 600 }}` du repo — singulier, isolable.
