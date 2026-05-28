# DS Audit — /work/nod-v2
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
- `components/dark-mode-toggle.tsx`
- `components/icons.tsx`

## Findings (11)

### high — Arbitrary bracket: min-w-[140px] left column
- **file:** `app/work/[slug]/page.tsx:209`
- **rule:** `arbitrary-bracket`
- **found:** `min-w-[140px]`
- **expected:** Token sidebar (140 hors grille — créer `w-sidebar` ou normaliser à 144=18×8)

### high — Arbitrary bracket: min-w-[140px] right column symmetry
- **file:** `app/work/[slug]/page.tsx:383`
- **rule:** `arbitrary-bracket`
- **found:** `min-w-[140px]`
- **expected:** Symétrie — même token

### high — Arbitrary bracket: max-w-[1400px] BlueprintShell
- **file:** `components/blueprint-shell.tsx:13`
- **rule:** `arbitrary-bracket`
- **found:** `max-w-[1400px]`
- **expected:** `max-w-blueprint` (token `--blueprint-max` déjà déclaré globals.css)

### high — Arbitrary bracket: w-[180px] image grid
- **file:** `components/case-study-image-grid.tsx:16`
- **rule:** `arbitrary-bracket`
- **found:** `w-[180px]`
- **expected:** Token thumbnail width ou normaliser palier grille

### high — Arbitrary bracket: w-[204px] TOC sidebar
- **file:** `components/case-study-toc.tsx:37`
- **rule:** `arbitrary-bracket`
- **found:** `w-[204px]`
- **expected:** Token sidebar (204 hors grille — `w-toc` ou 208=26×8)

### high — Arbitrary bracket: max-w-[1400px] Footer
- **file:** `components/footer.tsx:12`
- **rule:** `arbitrary-bracket`
- **found:** `max-w-[1400px]`
- **expected:** `max-w-blueprint` — token partagé

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

### high — Arbitrary bracket: px-[10px] py-[6px] Tag
- **file:** `components/tag.tsx:16`
- **rule:** `arbitrary-bracket`
- **found:** `px-[10px] py-[6px]`
- **expected:** Spacing tokens (le commentaire dans le fichier mentionne une exception Figma-exact off-grid, mais la règle AGENTS.md #2 reste violée)

### high — Arbitrary bracket: py-[12px] button
- **file:** `components/button.tsx:23`
- **rule:** `arbitrary-bracket`
- **found:** `py-[12px]`
- **expected:** Spacing token (12 hors grille xs/sm)

### high — Arbitrary bracket: active:scale-[0.98] button
- **file:** `components/button.tsx:27`
- **rule:** `arbitrary-bracket`
- **found:** `active:scale-[0.98]`
- **expected:** Token de scale-press ou valeur Tailwind native (scale-95/100) — sinon documenter `--scale-press: 0.98`

### medium — Bare hover without hover-supported
- **file:** `components/case-study-header.tsx:70`
- **rule:** `bare-hover`
- **found:** `hover:text-text-secondary`
- **expected:** `hover-supported:text-text-secondary` (respecte `@media (hover: hover)`)

## Token usage observed
- **typography:** Space Grotesk pour display (h1/h2/h3/h4), Manrope pour body/label/tag/caption — bien appliqué
- **spacing:** Tokens xs/sm/md/lg/xl/2xl/3xl utilisés correctement ; px-container, py-section actifs ; brackets 10/6/12/140/180/204/1400 bypassent la grille
- **colors:** Tous tokens sémantiques (bg, surface, border, text-*, accent) ; dark mode supporté via CSS vars
- **radius:** rounded-sm (buttons), rounded-md (tags), rounded-[var(--radius-frame-iphone)] (frame iphone)
- **motion:** duration-[var(--dur-fast)], duration-[var(--dur-base)] avec ease-out — corrects sémantiquement mais en arbitrary bracket plutôt qu'utility nommée

## Notes
- Page rend en mode standard case-study (pas de special-case bforbank).
- Toutes les violations arbitrary-bracket dérivent de contraintes de layout (blueprint max 1400, TOC 204, carrousel 180) qui suggèrent des tokens manquants dans le DS. Le `--blueprint-max` existe en CSS-var mais n'est pas exposé en utility `max-w-blueprint` — une seule ligne dans @theme inline résoudrait 4 findings.
- La violation `tag.tsx:16` est documentée comme exception Figma-exact mais reste une règle hard AGENTS.md. Discussion à avoir : soit relâcher la règle pour les tokens documentés, soit normaliser le Tag à `px-xs py-2xs` (8/4) en acceptant un micro-shift visuel.
- La violation `bare hover` dans case-study-header est isolée et corrigible en 2 caractères.
- Brand button : 1 max (CTA "Book a call" ligne 372, default primary, pas de `variant="brand"`) ✓
- Dark mode parity : tous les surfaces/borders/texte basculent ✓
- Pas de raw HTML interactif détecté (Button, Link ghost via composants) ✓
