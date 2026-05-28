# DS Audit — <route>
_Generated <YYYY-MM-DD> by `/ds-audit`_

## Page tree

- `app/<route>/page.tsx`
- `components/<...>.tsx`
- _(composants composés, résolus récursivement)_

## Findings (<count>)

<!--
Classés high → medium → low.
Chaque finding suit ce bloc :
-->

### high — <one-line title>
- **file:** `path/to/file.tsx:42`
- **rule:** `<typography-token | spacing-grid | raw-hex | raw-component | duplicate-pattern | arbitrary-bracket | bare-hover | dark-mode-gap | multiple-brand | responsive-drift>`
- **found:** `<snippet exact du code>`
- **expected:** `<ce que DESIGN.md prescrit>`

### medium — <one-line title>
- **file:** `path/to/file.tsx:88`
- **rule:** `<rule>`
- **found:** `<snippet>`
- **expected:** `<token attendu>`

### low — <one-line title>
- **file:** `path/to/file.tsx:120`
- **rule:** `<rule>`
- **found:** `<snippet>`
- **expected:** `<suggestion qualitative>`

## Token usage observed

- **typography:** text-h1, text-h2, text-body, …
- **spacing:** px-md, py-section, gap-sm, …
- **colors:** bg-bg, text-text-primary, border-border, …
- **radius:** rounded-md, rounded-frame-browser, …

## Notes

<!--
Observations qualitatives non-actionnables :
- zones grises où DESIGN.md ne tranche pas
- suggestions d'évolution du DS (nouveau token utile, abstraction de composant)
- patterns intéressants à reproduire ailleurs
-->
