# DS Audit — /work/boosted
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
- `components/dark-mode-toggle.tsx`
- `components/icons.tsx`

## Findings (10)

### high — Arbitrary bracket: min-w-[140px] sidebar column left
- **file:** `app/work/[slug]/page.tsx:209`
- **rule:** `arbitrary-bracket`
- **found:** `w-[calc((100%-var(--case-center))/2)] min-w-[140px]`
- **expected:** Token sidebar ou normaliser min-w à un palier de la grille

### high — Arbitrary bracket: min-w-[140px] sidebar column right
- **file:** `app/work/[slug]/page.tsx:383`
- **rule:** `arbitrary-bracket`
- **found:** `w-[calc((100%-var(--case-center))/2)] min-w-[140px]`
- **expected:** Symétrie — même token que ligne 209

### high — Arbitrary bracket: max-w-[1400px] in BlueprintShell
- **file:** `components/blueprint-shell.tsx:13`
- **rule:** `arbitrary-bracket`
- **found:** `max-w-[1400px]`
- **expected:** `max-w-blueprint` (token `--blueprint-max` déjà en globals.css)

### high — Arbitrary bracket: max-w-[1400px] in Footer
- **file:** `components/footer.tsx:12`
- **rule:** `arbitrary-bracket`
- **found:** `max-w-[1400px]`
- **expected:** `max-w-blueprint` — token partagé avec BlueprintShell

### high — Arbitrary bracket: max-w-[1400px] in Nav (desktop)
- **file:** `components/nav.tsx:25`
- **rule:** `arbitrary-bracket`
- **found:** `max-w-[1400px]`
- **expected:** `max-w-blueprint`

### high — Arbitrary bracket: max-w-[1400px] in Nav (mobile drawer)
- **file:** `components/nav.tsx:60`
- **rule:** `arbitrary-bracket`
- **found:** `max-w-[1400px]`
- **expected:** `max-w-blueprint`

### high — Arbitrary bracket: w-[204px] sidebar TOC
- **file:** `components/case-study-toc.tsx:37`
- **rule:** `arbitrary-bracket`
- **found:** `w-[204px]`
- **expected:** Token sidebar (204 hors grille — normaliser à 208 = 26×8 ou créer `w-toc`)

### high — Arbitrary bracket: w-[180px] image grid thumb
- **file:** `components/case-study-image-grid.tsx:16`
- **rule:** `arbitrary-bracket`
- **found:** `w-[180px]`
- **expected:** Token width (180 hors grille — `w-44` 176 ou `w-48` 192 ou nommer `w-thumb`)

### high — Arbitrary bracket: bullet dot 5px
- **file:** `components/case-study-content.tsx:28`
- **rule:** `arbitrary-bracket`
- **found:** `before:h-[5px] before:w-[5px]`
- **expected:** Token de taille (5px non-aligné grille — viser size-xs 8 ou créer `--bullet-size: 4`)

### medium — Arbitrary bracket: py-[12px] button
- **file:** `components/button.tsx:23`
- **rule:** `arbitrary-bracket`
- **found:** `py-[12px]`
- **expected:** Spacing token (12px hors grille — créer sub-palier ou normaliser xs/sm)

## Token usage observed

- **typography:** Space Grotesk via `font-display` pour h1–h4 ; Manrope via `font-body` pour body/label/tag/caption ; line-heights et tracking via tokens CSS-vars dans @theme inline
- **spacing:** xs (8), sm (16), md (24), lg (32), xl (48), 2xl (64), xl2 (72), 3xl (96) utilisés correctement ; `px-container`, `py-section` actifs ; violations isolées sur 140, 180, 204, 12, 5
- **colors:** text-text-primary, text-text-secondary, text-text-tertiary, bg-bg, bg-surface, border-border, border-border-strong, bg-accent ; aucun hex inline
- **radius:** rounded-sm (button), rounded-md (tag), rounded-[var(--radius-frame-iphone)] (frame — légitime CSS-var)
- **motion:** transition-colors avec duration-[var(--dur-fast)] et ease-out ; hover-supported: utilisé sur la nav et les liens (bare hover détecté à case-study-header.tsx:70 — non bloquant pour cette page mais à noter)

## Notes

**Rendu :** `/work/boosted` utilise le rendu standard (PAS le special-case bforbank). Les conditionnels bforbank (lignes 168, 269, 274, 292–340) ne sont pas déclenchés ; boosted rend le hero image normalement (lignes 195–203), le layout 3-colonnes (lignes 209, 383), et CaseStudyImageGrid pour tous les blocs d'images.

**Pattern :** Les 10 findings se regroupent en deux catégories nettes :
1. **Conteneur layout (1400px)** : blueprint-shell + nav (×2) + footer = 4 findings sur le même chiffre. Le token `--blueprint-max` existe DÉJÀ dans globals.css ligne 51 mais n'est pas exposé en utility Tailwind. Une seule entrée `@theme inline { --width-blueprint: var(--blueprint-max); }` (déjà présente ligne 270) suffirait à passer en `max-w-blueprint`.
2. **Sub-grid values (140, 180, 204, 12, 5)** : ces 5 valeurs hors grille 4px suggèrent soit un manque de tokens intermédiaires (sidebar width, image thumb width), soit des arrondis à faire (5→4, 12→16, 140→144, 180→176/192, 204→208).

**Brand button :** 1 brand button détecté max (`Book a call` ligne 372, default primary). Règle ✓.

**Dark mode :** Aucune couleur hardcodée, tous les surfaces/borders/texte basculent ✓.

**Hover & motion :** Toutes les transitions interactives sur cette page utilisent `hover-supported:` ou sont protégées via le custom variant. Aucun bare `hover:` détecté dans les composants composés strictement par cette route.

**Responsive :** Breakpoints cohérents (max-md, md:max-xl, xl). Le `gap-[clamp(...)]` du hero bforbank n'est pas exécuté ici. ✓

**Accessibilité :** focus-visible:outline-2 outline-fg global (correct dans globals.css). ARIA labels présents sur la TOC et back-bar.
