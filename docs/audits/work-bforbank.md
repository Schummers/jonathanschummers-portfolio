# DS Audit — /work/bforbank
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

## Findings (12)

### high — Arbitrary width brackets in 3-column layout
- **file:** `app/work/[slug]/page.tsx:209`
- **rule:** `arbitrary-bracket`
- **found:** `w-[calc((100%-var(--case-center))/2)] min-w-[140px]`
- **expected:** `min-w` doit utiliser un token (140 hors grille — passer en `min-w-3xl` (96) ou créer un palier sidebar) ; le `w-[calc(...)]` est légitime sémantiquement mais reste un bracket

### high — Arbitrary width brackets (right column symmetry)
- **file:** `app/work/[slug]/page.tsx:383`
- **rule:** `arbitrary-bracket`
- **found:** `w-[calc((100%-var(--case-center))/2)] min-w-[140px]`
- **expected:** Idem ligne 209 — utiliser un token sidebar

### high — Arbitrary gap with clamp in hero section
- **file:** `app/work/[slug]/page.tsx:170`
- **rule:** `arbitrary-bracket`
- **found:** `gap-[clamp(8px,1.5vw,24px)]`
- **expected:** Spacing token responsive (gap-xs sm:gap-sm md:gap-md) ou nouveau token `gap-fluid` documenté

### high — Hardcoded inline height in step 6 image (BforBank)
- **file:** `app/work/[slug]/page.tsx:315`
- **rule:** `raw-component`
- **found:** `style={{ height: 600, width: "auto" }}`
- **expected:** Pas de style inline avec pixel hardcoded — passer en utility ou prop sur figure ; 600px hors grille

### high — Hardcoded inline height in step 6 iPhone image (BforBank)
- **file:** `app/work/[slug]/page.tsx:329`
- **rule:** `raw-component`
- **found:** `style={{ height: 600, width: "auto" }}`
- **expected:** Idem — extraire en composant ou utility tokenisée

### high — Arbitrary width bracket in BlueprintShell max-width
- **file:** `components/blueprint-shell.tsx:13`
- **rule:** `arbitrary-bracket`
- **found:** `max-w-[1400px]`
- **expected:** Utiliser `max-w-blueprint` (token `--blueprint-max` déjà déclaré dans globals.css ligne 51)

### high — Arbitrary widths in bullet list markers
- **file:** `components/case-study-content.tsx:28`
- **rule:** `arbitrary-bracket`
- **found:** `before:h-[5px] before:w-[5px]`
- **expected:** Token taille (size-xs ou nouveau `--bullet-size: 4px` aligné grille)

### high — Arbitrary width in image carousel items
- **file:** `components/case-study-image-grid.tsx:16`
- **rule:** `arbitrary-bracket`
- **found:** `w-[180px]`
- **expected:** Token width (180 hors grille — viser `w-44` 176 ou `w-48` 192, ou nommer un `w-thumb`)

### high — Arbitrary width in table-of-contents sidebar
- **file:** `components/case-study-toc.tsx:37`
- **rule:** `arbitrary-bracket`
- **found:** `w-[204px]`
- **expected:** Token sidebar (`w-toc` 204px ou normaliser à 208px = 26×8)

### high — Arbitrary max-width in footer
- **file:** `components/footer.tsx:12`
- **rule:** `arbitrary-bracket`
- **found:** `max-w-[1400px]`
- **expected:** `max-w-blueprint` — partager le token avec BlueprintShell/Nav

### high — Arbitrary max-width in navigation (desktop + mobile)
- **file:** `components/nav.tsx:25` et `components/nav.tsx:60`
- **rule:** `arbitrary-bracket`
- **found:** `max-w-[1400px]`
- **expected:** `max-w-blueprint` — partager le token

### high — Arbitrary padding-y on button default size
- **file:** `components/button.tsx:23`
- **rule:** `arbitrary-bracket`
- **found:** `py-[12px]`
- **expected:** Spacing token (12px hors grille — créer un sub-palier ou normaliser à py-xs/py-sm)

## Token usage observed
- **typography:** text-h3, text-h4, text-body, text-body-lg, text-body-sm, text-label, text-caption, text-tag ; font-display + font-body ; tracking-label/h3 utilisés correctement
- **spacing:** px-xl, py-xl, px-lg, px-md, py-md, gap-xl, gap-md, gap-sm, gap-xs, mt-xl, mt-md, mt-lg, mt-xs, mt-sm, space-y-xs ; bon alignement 4px globalement
- **colors:** bg-bg, bg-surface, border-border, border-border-strong, text-text-primary, text-text-secondary, text-text-tertiary, bg-accent ; usage sémantique consistent ; aucun hex inline détecté
- **radius:** rounded-sm (boutons), rounded-md (tags via Tag), rounded-[var(--radius-frame-iphone)] (IPhoneFrame — légitime CSS-var)
- **motion:** duration-[var(--dur-fast)], duration-[var(--dur-base)] (en bracket — à migrer vers `duration-fast`/`duration-base` si Tailwind v4 supporte les tokens nommés via @theme inline)

## Notes
- Le hero bforbank utilise `grid-cols-7` + IPhoneFrame (lignes 168–191) avec `gap-[clamp(...)]` pour fluidité responsive. Si on garde l'effet, formaliser `gap-fluid` dans le DS plutôt que de tolérer le clamp inline.
- Step 6 (lignes 291–339) est un cas spécial bforbank avec hardcode `height: 600` inline — c'est le finding le plus singulier (les autres findings sont systémiques sur tous les case studies, celui-ci est unique à cette page).
- BlueprintShell, Nav et Footer hardcodent `max-w-[1400px]` indépendamment alors que `--blueprint-max` existe déjà dans globals.css ligne 51. Centraliser en `max-w-blueprint` (extend Tailwind) résoudrait 4 findings d'un coup.
- 1 brand button par page : la page rend un seul `<Button>` (ligne 372 "Book a call") sans variant explicite → variant primary par défaut. Aucun brand sur cette route. ✓
- Dark mode parity : aucun hardcode de couleur, toutes les surfaces et borders basculent via les CSS vars `.dark` ✓
