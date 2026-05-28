# DS Audit — /work/spie-bat-v2
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

## Findings (13)

### high — Arbitrary bracket: max-w-[1400px] BlueprintShell
- **file:** `components/blueprint-shell.tsx:13`
- **rule:** `arbitrary-bracket`
- **found:** `w-[1400px]`
- **expected:** `max-w-blueprint` (token `--blueprint-max` déjà déclaré globals.css:51)

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

### medium — Arbitrary bracket: w-[180px] image grid
- **file:** `components/case-study-image-grid.tsx:16`
- **rule:** `arbitrary-bracket`
- **found:** `w-[180px]`
- **expected:** Token thumbnail ou normaliser palier (180 hors grille)

### medium — Arbitrary bracket: w-[204px] TOC sidebar
- **file:** `components/case-study-toc.tsx:37`
- **rule:** `arbitrary-bracket`
- **found:** `w-[204px]`
- **expected:** Token sidebar (`w-toc`) ou normaliser 208=26×8

### medium — Arbitrary bracket: py-[12px] button
- **file:** `components/button.tsx:23`
- **rule:** `arbitrary-bracket`
- **found:** `py-[12px]`
- **expected:** Spacing token (12 hors grille — créer sub-palier ou normaliser xs/sm)

### medium — Arbitrary bracket: bullet dot 5px
- **file:** `components/case-study-content.tsx:28`
- **rule:** `arbitrary-bracket`
- **found:** `before:h-[5px] before:w-[5px]`
- **expected:** Token de taille (5 hors grille — viser 4 ou 8, ou `--bullet-size`)

### low — Bare hover without hover-supported guard
- **file:** `components/case-study-header.tsx:70`
- **rule:** `bare-hover`
- **found:** `hover:text-text-secondary`
- **expected:** `hover-supported:text-text-secondary` (respecte `@media (hover: hover)`)

### low — Motion duration via arbitrary bracket on CSS var
- **file:** `components/case-study-toc.tsx:44`
- **rule:** `arbitrary-bracket`
- **found:** `duration-[var(--dur-fast)]`
- **expected:** Utility nommée `duration-fast` exposée via `@theme inline` (sémantique correcte mais syntaxe en bracket)

### low — Motion duration via arbitrary bracket on CSS var
- **file:** `components/back-bar.tsx:25`
- **rule:** `arbitrary-bracket`
- **found:** `duration-[var(--dur-base)]`
- **expected:** Utility nommée `duration-base` exposée via `@theme inline`

## Token usage observed
- **typography:** Usage consistent de Space Grotesk (display h1–h4) et Manrope (body-lg, body, body-sm, label, tag, caption). Toutes les classes typographiques correctement mappées aux specs DESIGN.md.
- **spacing:** Majoritairement correct (xs, sm, md, lg, xl, 2xl, 3xl). Violations : `py-[12px]` dans button.tsx, `h-[5px] w-[5px]` dans case-study-content.tsx, sub-grid widths.
- **colors:** Usage sémantique correct (text-primary, text-secondary, text-tertiary, border, border-strong, bg, surface, accent, accent-hover). Aucun raw hex détecté.
- **radius:** Usage correct (rounded-sm pour buttons, rounded-md pour tags, rounded-[var(--radius-frame-iphone)] pour iPhone frames).

## Notes

**Pattern systémique :** Les 13 violations arbitrary-bracket tombent dans **exactement deux catégories** :
1. **Conteneurs layout (1400px width)** : blueprint-shell + nav (×2) + footer — 4 répétitions dans 3 fichiers
2. **Tailles spécifiques aux composants** : 180px carousel, 204px sidebar, 140px column, 12px padding, 5px bullet — éparpillées sur des composants depth-1

**Recommandation DS :**
- `max-w-blueprint` = `max-w-[1400px]` (s'applique à BlueprintShell, Nav, Footer) — le token CSS existe déjà, il faut juste l'exposer en utility
- `w-sidebar` = `w-[204px]` (case-study-toc)
- `w-carousel-item` = `w-[180px]` (case-study-image-grid)
- Ajuster button padding à la grille spacing (py-xs ou py-sm), ou justifier 12px via un sub-palier documenté
- Migrer `duration-[var(--dur-fast)]` vers `duration-fast` (vérifier que Tailwind v4 expose bien le token via `@theme inline`)

**Dark mode parity :** IPhoneFrame et tous les tokens text/color répondent correctement aux CSS vars. Aucun hardcoded light-only color ni hack de brightness mode-spécifique détecté ✓

**Catalogue composants :** Tous les composites (Button, Tag, CaseStudyHeader, etc.) correctement nommés et composés. Pas de duplication ni abuse de style inline.

**Règle 1 brand button :** Respectée — seul `variant="brand"` dans button.tsx produit la couleur accent. Single-use case : CTA dans page.tsx ligne 372 ("Book a call") en variant default primary, pas brand. ✓
