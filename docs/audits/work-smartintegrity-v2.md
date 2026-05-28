# DS Audit — /work/smartintegrity-v2
_Generated 2026-05-28 by `/ds-audit`_

## Page tree
- `app/work/[slug]/page.tsx`
- `components/nav.tsx`
- `components/blueprint-shell.tsx`
- `components/back-bar.tsx`
- `components/case-study-toc.tsx`
- `components/case-study-header.tsx`
- `components/case-study-step.tsx`
- `components/case-study-content.tsx`
- `components/case-study-image-grid.tsx`
- `components/button.tsx`
- `components/footer.tsx`
- `components/iphone-frame.tsx`
- `components/tag.tsx`
- `components/icons.tsx`
- `components/dark-mode-toggle.tsx`

## Findings (10)

### high — Arbitrary bracket: min-w-[140px] left column
- **file:** `app/work/[slug]/page.tsx:209`
- **rule:** `arbitrary-bracket`
- **found:** `min-w-[140px]`
- **expected:** Token sidebar ou normaliser palier grille

### high — Arbitrary bracket: min-w-[140px] right column symmetry
- **file:** `app/work/[slug]/page.tsx:383`
- **rule:** `arbitrary-bracket`
- **found:** `min-w-[140px]`
- **expected:** Symétrie — même token

### high — Arbitrary bracket: max-w-[1400px] BlueprintShell
- **file:** `components/blueprint-shell.tsx:13`
- **rule:** `arbitrary-bracket`
- **found:** `max-w-[1400px]`
- **expected:** `max-w-blueprint` (token `--blueprint-max` déjà en globals.css)

### high — Arbitrary bracket: max-w-[1400px] Nav desktop
- **file:** `components/nav.tsx:25`
- **rule:** `arbitrary-bracket`
- **found:** `max-w-[1400px]`
- **expected:** `max-w-blueprint`

### high — Arbitrary bracket: max-w-[1400px] Nav mobile
- **file:** `components/nav.tsx:60`
- **rule:** `arbitrary-bracket`
- **found:** `max-w-[1400px]`
- **expected:** `max-w-blueprint`

### high — Arbitrary bracket: max-w-[1400px] Footer
- **file:** `components/footer.tsx:12`
- **rule:** `arbitrary-bracket`
- **found:** `max-w-[1400px]`
- **expected:** `max-w-blueprint`

### high — Arbitrary bracket: w-[204px] TOC sidebar
- **file:** `components/case-study-toc.tsx:37`
- **rule:** `arbitrary-bracket`
- **found:** `w-[204px]`
- **expected:** Token sidebar (204 hors grille — `w-toc` ou normaliser 208=26×8)

### high — Arbitrary bracket: w-[180px] image grid
- **file:** `components/case-study-image-grid.tsx:16`
- **rule:** `arbitrary-bracket`
- **found:** `w-[180px]`
- **expected:** Token thumbnail ou normaliser palier grille

### high — Arbitrary bracket: bullet dot 5px
- **file:** `components/case-study-content.tsx:28`
- **rule:** `arbitrary-bracket`
- **found:** `before:h-[5px] before:w-[5px]`
- **expected:** Token de taille (5 hors grille — viser 4 ou 8, ou nouveau `--bullet-size`)

### high — Arbitrary bracket: py-[12px] button
- **file:** `components/button.tsx:23`
- **rule:** `arbitrary-bracket`
- **found:** `py-[12px]`
- **expected:** Spacing token (12 hors grille xs/sm)

## Token usage observed
- **typography:** Space Grotesk (hero/h1/h2/h3/h4) et Manrope (body/label/tag/caption) via `font-display` et `font-body` ; tokens appliqués correctement
- **spacing:** Utilities `px-xl`, `py-xl`, `gap-md`, `gap-xs`, `px-container`, `py-section` utilisés systématiquement ; exceptions = 10 brackets arbitraires bypassent la grille
- **colors:** Tokens sémantiques (`text-text-primary`, `text-text-secondary`, `border-border`, `bg-surface`, `bg-accent`) ; aucun hex inline détecté
- **radius:** `rounded-sm` (button), `rounded-md` (tag), `rounded-[var(--radius-frame-iphone)]` (frame iphone — légitime CSS-var)
- **motion:** `duration-[var(--dur-fast)]`, `duration-[var(--dur-base)]` avec `ease-out` — corrects sémantiquement

## Notes

La page démontre une forte adhésion aux primitives du DS : tokens sémantiques de couleur, échelle typographique, utilities spacing (`gap-sm`, `px-xl`, `py-lg`), patterns du catalogue de composants (Button, Tag, BlueprintShell). Cependant, 10 valeurs arbitraires en bracket — spanning max-widths (1400px blueprint, 204px sidebar, 180px image), min-widths (140px column), et padding (12px button) — créent de l'incohérence et un poids de maintenance hardcoded.

**Suggestions DS :**
- **1400px blueprint :** déjà en CSS-var `--blueprint-max` (globals.css:51) et déjà mappé en `--width-blueprint` dans `@theme inline` (ligne 270). Reste à exposer `max-w-blueprint` comme utility Tailwind v4 (probablement déjà disponible, juste pas utilisé) — résoudrait 4 findings.
- **204px, 180px, 140px :** soit ajouter à l'échelle spacing, soit créer des tokens sémantiques nommés (`w-sidebar`, `w-thumb`, `w-toc`)
- **12px button padding :** remplacer par grille spacing (sm=16 ou créer un palier intermédiaire `py-button: 12px`)
- **5px bullet :** définir `--bullet-size` ou aligner à 4/8px

Tous les autres axes (typography, colors, hover-supported, dark mode parity, 1 brand button max, breakpoints responsive) sont propres et alignés.
