# DS Audit — /
_Generated 2026-05-28 by `/ds-audit`_

## Page tree

- `app/page.tsx`
- `components/blueprint-shell.tsx`
- `components/nav.tsx`
- `components/hero.tsx`
- `components/projects-featured.tsx`
- `components/project-card-featured.tsx`
- `components/projects-compact.tsx`
- `components/project-card-compact.tsx`
- `components/testimonials.tsx`
- `components/about.tsx`
- `components/iphone-frame.tsx`
- `components/cta-final.tsx`
- `components/footer.tsx`
- `components/button.tsx`
- `components/tag.tsx`
- `components/browser-frame.tsx`
- `components/bforbank-showcase.tsx`

## Findings (34)

### high — Arbitrary bracket width on max-blueprint constraint
- **file:** `components/blueprint-shell.tsx:13`
- **rule:** `arbitrary-bracket`
- **found:** `w-[1400px]`
- **expected:** Semantic token or max-w class aligned to `blueprint-max=1400` (e.g., `max-w-blueprint` utility)

### high — Arbitrary bracket width on max-blueprint constraint (nav)
- **file:** `components/nav.tsx:25`
- **rule:** `arbitrary-bracket`
- **found:** `max-w-[1400px]`
- **expected:** Semantic `max-w-blueprint` utility

### high — Arbitrary bracket width on max-blueprint constraint (nav mobile)
- **file:** `components/nav.tsx:60`
- **rule:** `arbitrary-bracket`
- **found:** `max-w-[1400px]`
- **expected:** Semantic `max-w-blueprint` utility

### high — Arbitrary bracket width on max-blueprint constraint (footer)
- **file:** `components/footer.tsx:12`
- **rule:** `arbitrary-bracket`
- **found:** `max-w-[1400px]`
- **expected:** Semantic `max-w-blueprint` utility

### high — Arbitrary bracket height on featured project card desktop view
- **file:** `components/project-card-featured.tsx:73`
- **rule:** `arbitrary-bracket`
- **found:** `md:h-[560px]`
- **expected:** Semantic height token or design grid

### high — Arbitrary bracket height on CTA section
- **file:** `components/cta-final.tsx:12`
- **rule:** `arbitrary-bracket`
- **found:** `max-h-[500px]`
- **expected:** Semantic height token or design grid

### high — Arbitrary bracket width on hero copy container
- **file:** `components/hero.tsx:28`
- **rule:** `arbitrary-bracket`
- **found:** `max-w-[520px]`
- **expected:** Semantic token (e.g., `max-w-case-center` or similar)

### high — Arbitrary bracket width on About section left column
- **file:** `components/about.tsx:15`
- **rule:** `arbitrary-bracket`
- **found:** `max-w-[500px]`
- **expected:** Semantic width token

### high — Arbitrary bracket width on About section right column text
- **file:** `components/about.tsx:49`
- **rule:** `arbitrary-bracket`
- **found:** `max-w-[500px]`
- **expected:** Semantic width token

### high — Arbitrary bracket gap on About section side-by-side layout
- **file:** `components/about.tsx:57`
- **rule:** `arbitrary-bracket`
- **found:** `gap-[40px]`
- **expected:** Semantic spacing token (e.g., `gap-lg-plus`)

### high — Arbitrary bracket width on iPhone frame in About
- **file:** `components/about.tsx:58`
- **rule:** `arbitrary-bracket`
- **found:** `w-[240px]`
- **expected:** Semantic width token

### high — Raw hex code on iPhone screenshot background (first)
- **file:** `components/about.tsx:59`
- **rule:** `raw-hex`
- **found:** `bg-[#0B1013]`
- **expected:** Semantic color token (e.g., `bg-text-primary` or custom dark token)

### high — Arbitrary bracket padding-top on iPhone screenshot (first)
- **file:** `components/about.tsx:59`
- **rule:** `arbitrary-bracket`
- **found:** `pt-[16px]`
- **expected:** Semantic spacing token (e.g., `pt-sm`)

### high — Arbitrary bracket padding-bottom on iPhone screenshot (first)
- **file:** `components/about.tsx:59`
- **rule:** `arbitrary-bracket`
- **found:** `pb-[6px]`
- **expected:** Semantic spacing token or design grid

### high — Arbitrary bracket width on iPhone frame (second)
- **file:** `components/about.tsx:69`
- **rule:** `arbitrary-bracket`
- **found:** `w-[240px]`
- **expected:** Semantic width token

### high — Raw hex code on iPhone screenshot background (second)
- **file:** `components/about.tsx:70`
- **rule:** `raw-hex`
- **found:** `bg-[#0B1013]`
- **expected:** Semantic color token (e.g., `bg-text-primary` or custom dark token)

### high — Arbitrary bracket padding-top on iPhone screenshot (second)
- **file:** `components/about.tsx:70`
- **rule:** `arbitrary-bracket`
- **found:** `pt-[16px]`
- **expected:** Semantic spacing token (e.g., `pt-sm`)

### high — Arbitrary bracket padding-bottom on iPhone screenshot (second)
- **file:** `components/about.tsx:70`
- **rule:** `arbitrary-bracket`
- **found:** `pb-[6px]`
- **expected:** Semantic spacing token or design grid

### high — Arbitrary bracket height on featured card mobile image
- **file:** `components/project-card-featured.tsx:99`
- **rule:** `arbitrary-bracket`
- **found:** `h-[240px]`
- **expected:** Semantic height token

### high — Arbitrary bracket width on featured card description container
- **file:** `components/project-card-featured.tsx:114`
- **rule:** `arbitrary-bracket`
- **found:** `max-w-[500px]`
- **expected:** Semantic width token

### high — Arbitrary bracket height on compact project card
- **file:** `components/project-card-compact.tsx:23`
- **rule:** `arbitrary-bracket`
- **found:** `md:min-h-[200px]`
- **expected:** Semantic height token

### high — Arbitrary bracket width on compact project thumbnail
- **file:** `components/project-card-compact.tsx:46`
- **rule:** `arbitrary-bracket`
- **found:** `w-[280px]`
- **expected:** Semantic width token

### high — Arbitrary bracket padding on compact project thumbnail
- **file:** `components/project-card-compact.tsx:46`
- **rule:** `arbitrary-bracket`
- **found:** `py-[16px]`
- **expected:** Semantic spacing token (e.g., `py-sm`)

### high — Arbitrary bracket dimensions on testimonials image
- **file:** `components/testimonials.tsx:16`
- **rule:** `arbitrary-bracket`
- **found:** `w-[157px] h-[200px]`
- **expected:** Semantic width/height tokens

### high — Arbitrary bracket max-width on testimonials blockquote
- **file:** `components/testimonials.tsx:29`
- **rule:** `arbitrary-bracket`
- **found:** `max-w-[745px]`
- **expected:** Semantic width token (e.g., `max-w-prose` ou `max-w-case-prose`)

### high — Arbitrary brackets in BforBank showcase container
- **file:** `components/bforbank-showcase.tsx:33`
- **rule:** `arbitrary-bracket`
- **found:** `h-[320px]`, `h-[480px]`, `gap-[20px]`, `gap-[24px]`, `py-[24px]`
- **expected:** Semantic spacing and height tokens

### high — Arbitrary bracket gaps in BforBank column flex
- **file:** `components/bforbank-showcase.tsx:38`
- **rule:** `arbitrary-bracket`
- **found:** `gap-[20px]`, `gap-[24px]`
- **expected:** Semantic spacing tokens (e.g., `gap-md`, `gap-lg`)

### high — Arbitrary bracket heights on BforBank fade overlays
- **file:** `components/bforbank-showcase.tsx:59` et `:60`
- **rule:** `arbitrary-bracket`
- **found:** `h-[48px]`
- **expected:** Semantic height token (xl=48px existe — `h-xl` ?)

### high — Arbitrary bracket gap in browser frame chrome bar
- **file:** `components/browser-frame.tsx:18`
- **rule:** `arbitrary-bracket`
- **found:** `gap-[5px]`, `px-[8px]`, `h-[16px]`
- **expected:** Semantic spacing tokens ou design grid alignment

### high — Arbitrary bracket gap in browser frame traffic lights
- **file:** `components/browser-frame.tsx:20`
- **rule:** `arbitrary-bracket`
- **found:** `gap-[3px]`
- **expected:** Semantic spacing token ou design grid

### high — Arbitrary bracket shadow on browser frame
- **file:** `components/browser-frame.tsx:13`
- **rule:** `arbitrary-bracket`
- **found:** `shadow-[var(--shadow-mockup)]`
- **expected:** Named shadow utility (extend Tailwind shadow.mockup)

### high — Arbitrary bracket padding-y on button default size
- **file:** `components/button.tsx:23`
- **rule:** `arbitrary-bracket`
- **found:** `py-[12px]`
- **expected:** Semantic spacing token (12px hors grille — créer un sub-palier ou normaliser)

### high — Arbitrary bracket padding on Tag component
- **file:** `components/tag.tsx:16`
- **rule:** `arbitrary-bracket`
- **found:** `px-[10px]`, `py-[6px]`
- **expected:** Semantic spacing tokens (commentaire indique Figma-exact off-grid, mais reste une violation hard)

## Token usage observed

- **typography:** text-h1, text-h2, text-h3, text-h4, text-body, text-body-lg, text-body-sm, text-label, text-tag, text-caption
- **spacing:** px-xl, py-xl, px-lg, py-md, px-md, py-sm, gap-lg, gap-md, gap-sm, gap-xs, px-xl2, py-xl2, px-container, py-section
- **colors:** bg-bg, bg-surface, bg-invert-bg, text-text-primary, text-text-secondary, text-text-tertiary, text-invert-fg, border-border, border-border-strong
- **radius:** rounded-md, rounded-sm, rounded-[var(--radius-frame-browser)], rounded-[var(--radius-frame-iphone)]
- **motion:** duration-[var(--dur-fast)], duration-[var(--dur-base)], duration-[400ms], ease-out

## Notes

The homepage demonstrates strong semantic color and typography discipline, with correct `hover-supported:` usage throughout. However, it is heavily constrained by **34 arbitrary bracket violations** across width, height, padding, gap, and shadow properties. Most violations cluster in three areas:

1. **Container widths** (blueprint max 1400px, prose containers ~500–745px) — These are design constraints that should map to semantic width tokens rather than hardcoded px values.
2. **Layout heights** (featured cards 560px, CTA 500px, mockup frames 320–480px) — Design grid heights repeated across components with no token abstraction.
3. **Micro-spacing** (gaps 3–24px, paddings 6–16px) — Fine-grained adjustments qui devraient s'aligner à la grille 4px via tokens sémantiques (gap-sm/md/lg, py-xs/sm).

The `BforBankShowcase` and `BrowserFrame` components carry the highest technical debt: they layer arbitrary brackets for internal chrome, fade overlay heights, and dynamic gaps. The `about.tsx` section hardcodes iPhone frame widths (240px) and background colors (#0B1013) outside the token system.

One intentional exception is documented: `tag.tsx:16` notes that `px-[10px]` is a Figma-exact override (off the 8px grid), but it remains a bracket violation. The presence of `max-w-[500px]` and `w-[520px]` across multiple files suggests missing semantic width tokens for the common prose/case-study container size (~500px).

**Suggestions DS :**
- Extract blueprint, prose, frame dimension constants en width/height token utilities (`max-w-blueprint`, `w-frame-iphone`, etc.)
- Unifier micro-spacing (gaps et paddings 3–6–10–12px) à la grille 4px via aliases sémantiques
- Si 48px revient pour les fade overlays, utiliser `h-xl` (token existant)
- Documenter le `bg-[#0B1013]` comme token mockup-only ou le remplacer par `bg-text-primary` (#18181b)
