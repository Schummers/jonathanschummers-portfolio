---
version: 1.0.0
name: jonathan-portfolio
description: |
  An editorial portfolio for a freelance Product Designer. The system
  anchors on warm near-white surfaces with deep ink type, a single
  electric-blue accent, and pixel-perfect borders instead of shadows.
  Voice is quietly technical: Space Grotesk for display, Manrope for
  body. Dark mode mirrors the system on a deep neutral canvas
  (documented in prose; see the Dark Mode section).
  Token naming is role-based, Linear-style (no namespace prefix).

colors:
  # Surfaces & borders (light mode only — see Dark Mode section for the overlay)
  bg:             "#fafafa"
  surface:        "#f4f4f5"
  border:         "#e4e4e7"
  border-strong:  "#d4d4d8"
  invert-bg:      "#18181b"
  invert-fg:      "#fafafa"

  # Text
  text-primary:    "#18181b"
  text-secondary:  "#71717b"
  text-tertiary:   "#9f9fa9"
  text-on-accent:  "#ffffff"   # text/icons posed on bg-accent (brand button)

  # Brand accent
  accent:         "#0A4CF0"
  accent-hover:   "#0839b8"
  accent-text:    "#0A4CF0"
  accent-muted:   "#3670f5"
  accent-subtle:  "#d4e3ff"

  # Primary button
  btn-primary:        "#1e1e21"
  btn-primary-hover:  "#09090b"
  btn-primary-fg:     "#fafafa"

  # Disabled
  disabled-bg:    "#e4e4e7"
  disabled-fg:    "#9f9fa9"

typography:
  # lineHeight en px absolus, alignés sur grille 4px (pas de ratios → pas de virgules en sortie)
  hero:    { fontFamily: Space Grotesk, fontSize: 56px, fontWeight: 700, lineHeight: 60px, letterSpacing: -0.03em }
  h1:      { fontFamily: Space Grotesk, fontSize: 48px, fontWeight: 700, lineHeight: 52px, letterSpacing: -0.02em }
  h2:      { fontFamily: Space Grotesk, fontSize: 32px, fontWeight: 500, lineHeight: 40px, letterSpacing: -0.02em }
  h3:      { fontFamily: Space Grotesk, fontSize: 24px, fontWeight: 500, lineHeight: 32px, letterSpacing: -0.01em }
  h4:      { fontFamily: Space Grotesk, fontSize: 18px, fontWeight: 500, lineHeight: 24px, letterSpacing: -0.02em }
  body-lg: { fontFamily: Manrope,       fontSize: 18px, fontWeight: 400, lineHeight: 28px }
  body:    { fontFamily: Manrope,       fontSize: 16px, fontWeight: 400, lineHeight: 24px }
  body-sm: { fontFamily: Manrope,       fontSize: 14px, fontWeight: 400, lineHeight: 20px }
  label:   { fontFamily: Manrope,       fontSize: 14px, fontWeight: 500, lineHeight: 20px, letterSpacing: 0.08em }
  tag:     { fontFamily: Manrope,       fontSize: 12px, fontWeight: 500, lineHeight: 16px }
  caption: { fontFamily: Manrope,       fontSize: 12px, fontWeight: 400, lineHeight: 16px }

spacing:
  none:     0px         # annule un gap hérité
  2xs:      4px         # padding inline fin, gap icône-texte
  xs:       8px
  sm:       16px
  md:       24px
  lg:       32px
  lg-plus:  40px        # entre lg=32 et xl=48
  xl:       48px
  2xl:      64px
  xl2:      72px        # featured cards (9 × 8)
  3xl:      96px
  4xl:      128px

rounded:
  none:           0px
  sm:             1px       # buttons
  pill:           3px       # rare
  md:             8px       # tags, chips (overrides Tailwind default)
  frame-browser:  6px
  frame-iphone:   16px

shadow:
  mockup: "0 2px 8px rgba(0, 0, 0, 0.06)"  # browser + iPhone frames only

motion:
  duration-fast:  150ms
  duration-base:  300ms
  duration-slow:  400ms
  ease-default:   ease-out

layout:
  case-prose:     640px
  case-center:    864px
  blueprint-max:  1400px

  # Container padding (horizontal : viewport ↔ BlueprintShell)
  # Utiliser px-container (Tailwind) — bascule responsive automatique
  container-px-mobile:   24px       # ≤ 767px
  container-px-tablet:   32px       # 768-1024px
  container-px-desktop:  48px       # ≥ 1025px

  # Section padding (vertical : entre sections empilées)
  # Utiliser py-section (Tailwind). About garde son override xl2 (72px desktop).
  section-py-mobile:    48px
  section-py-tablet:    48px
  section-py-desktop:   48px

components:
  button-primary:        { backgroundColor: "{colors.btn-primary}",        textColor: "{colors.btn-primary-fg}", typography: "{typography.body}", rounded: "{rounded.sm}", padding: "12px 24px" }
  button-primary-hover:  { backgroundColor: "{colors.btn-primary-hover}",  textColor: "{colors.btn-primary-fg}" }
  button-brand:          { backgroundColor: "{colors.accent}",             textColor: "{colors.text-on-accent}", typography: "{typography.body}", rounded: "{rounded.sm}", padding: "12px 24px" }
  button-brand-hover:    { backgroundColor: "{colors.accent-hover}",       textColor: "{colors.text-on-accent}" }
  button-outline:        { backgroundColor: "transparent",                  textColor: "{colors.text-primary}",  typography: "{typography.body}", rounded: "{rounded.sm}", padding: "12px 24px" }
  button-outline-hover:  { backgroundColor: "{colors.surface}",             textColor: "{colors.text-primary}" }
  tag:                   { backgroundColor: "transparent",                  textColor: "{colors.text-secondary}", typography: "{typography.tag}", rounded: "{rounded.md}", padding: "6px 10px" }
---

# Design System

The portfolio's design system, in the [Google DESIGN.md format](https://github.com/google-labs-code/design.md) (alpha) — Stitch-compatible but relaxed.

> **Source of truth note.** `app/globals.css` is the operational truth for CSS tokens. This file is a declarative reflection, updated as needed (per audit or per token-PR). If you find a mismatch, the CSS wins; please open a PR that updates this file.

## Overview

**Voice.** Quiet, technical, editorial. Less "trustworthy enterprise SaaS", more "small studio that ships". The portfolio is the case study of itself — every choice (no shadows, one accent, structural borders) is deliberate and visible.

**Design principles.**

1. **Structure by borders, not by shadow.** Sections are delimited by 1px borders. The only shadow in the system is on mockup frames (browser, iPhone) so the screenshot can detach from the canvas.
2. **One accent.** A single electric blue (`#0A4CF0`) for brand and key emphasis. Never a second hue.
3. **Hover is for pointers only.** Every `:hover` rule is gated behind `@media (hover: hover)` via the `hover-supported:` custom variant so taps on touch surfaces do not trigger hover state.
4. **Reduced motion is respected globally.** A single `prefers-reduced-motion: reduce` block in `globals.css` neutralises every transition and animation.

## Colors

Color tokens are role-based and Linear-style (no `--sem-` or `--color-` namespace at the CSS variable level — the bridge to Tailwind happens via `@theme inline`).

- **Surfaces** (`{colors.bg}`, `{colors.surface}`, `{colors.invert-bg}`) are warm near-whites. `{colors.surface}` is reserved for raised states (cards on hover, key-results) and never used as a default background.
- **Borders** (`{colors.border}`, `{colors.border-strong}`) carry the layout. `{colors.border-strong}` is one step heavier and reserved for borders on inverse-coloured surfaces.
- **Text** uses a 3-step hierarchy (`{colors.text-primary}` / `{colors.text-secondary}` / `{colors.text-tertiary}`). Tertiary is sparingly used, only for the lightest metadata (captions, faint timestamps).
- **Accent** is split: `{colors.accent}` is the brand background colour for the `brand` button; `{colors.accent-text}` is the text colour for accent links — they differ in dark mode because the brand button colour does not adapt but the link colour must regain contrast.
- **CV print artifact:** the A4 CV (`docs/cv/`) is a standalone HTML with its **own forked token canon** — see `docs/cv/DESIGN-CV.md`. It does not consume this DS, and this DS no longer carries CV-specific tokens.

## Typography

Line-heights are stored as **absolute pixel values** (not unitless ratios) so every typo lands on the 4px grid and components keep round heights. Implicit ratio shown for reference only.

| Token | Family | Size (desktop) | Weight | Line (px) | _Ratio_ | Tracking | Use |
|---|---|---|---|---|---|---|---|
| `{typography.hero}` | Space Grotesk | 56px | 700 | 60px | _1.07_ | −0.03em | Homepage hero only |
| `{typography.h1}` | Space Grotesk | 48px | 700 | 52px | _1.08_ | −0.02em | Page H1 |
| `{typography.h2}` | Space Grotesk | 32px | 500 | 40px | _1.25_ | −0.02em | Section titles |
| `{typography.h3}` | Space Grotesk | 24px | 500 | 32px | _1.33_ | −0.01em | Sub-titles, key-results |
| `{typography.h4}` | Space Grotesk | 18px | 500 | 24px | _1.33_ | −0.02em | Small titles in cards |
| `{typography.body-lg}` | Manrope | 18px | 400 | 28px | _1.56_ | normal | Lead paragraphs |
| `{typography.body}` | Manrope | 16px | 400 | 24px | _1.50_ | normal | Default body |
| `{typography.body-sm}` | Manrope | 14px | 400 | 20px | _1.43_ | normal | Captions, meta |
| `{typography.label}` | Manrope | 14px | 500 | 20px | _1.43_ | 0.08em (uppercase) | Section labels |
| `{typography.tag}` | Manrope | 12px | 500 | 16px | _1.33_ | normal | Tag chips |
| `{typography.caption}` | Manrope | 12px | 400 | 16px | _1.33_ | normal | Image captions (italic) |

**Responsive.** Tablet (`≤1024px`) and mobile (`≤767px`) reduce hero / H1 / H2 / H3 sizes by 1–2 steps. Body sizes are unchanged except `body-lg` which collapses to `body` on mobile. The shifts are implemented as media-query overrides in `app/globals.css`.

## Layout

The portfolio runs on a single vertical blueprint:

- **Max width**: `{layout.blueprint-max}` (1400px), enforced by `<BlueprintShell>`.
- **Vertical rails**: `border-x border-border` on the shell, creating the editorial framing.
- **Container padding (horizontal)**: `{layout.container-px-mobile}` (24px ≤767), `{layout.container-px-tablet}` (32px 768-1024), `{layout.container-px-desktop}` (48px ≥1025). The active token `--container-px` switches automatically via media queries — use the single utility **`px-container`** in JSX. Do not compose `px-md md:px-lg lg:px-xl` manually anymore.
- **Section padding (vertical)**: `{layout.section-py-mobile}` / `-tablet` / `-desktop` — all 48px (the dominant rhythm of the home). Use **`py-section`**. About keeps its `py-xl2` (72px desktop) override as a deliberate outlier for the most narrative section.
- **Case-study grid (desktop ≥1280px)**: a 3-column layout where the centre column is `{layout.case-center}` (864px) and the inner prose is constrained to `{layout.case-prose}` (640px).

## Spacing

Base 8px scale with two 4px sub-paliers (`2xs` and `lg-plus`). Every token lands on the 4px grid — this is non-negotiable, so headings, paddings, and gaps stay aligned.

| Token | Value | Utility | Typical use |
|---|---|---|---|
| `{spacing.none}` | 0px | `p-none`, `gap-none` | Cancel an inherited gap (semantic intent). |
| `{spacing.2xs}` | 4px | `p-2xs`, `gap-2xs` | Icon-to-text gap, fine inline padding. |
| `{spacing.xs}` | 8px | `p-xs`, `gap-xs` | Tight clusters (label + value, badges). |
| `{spacing.sm}` | 16px | `p-sm`, `gap-sm` | Default gap between siblings. |
| `{spacing.md}` | 24px | `p-md`, `gap-md` | Default section gutter, card-to-card. |
| `{spacing.lg}` | 32px | `p-lg`, `gap-lg` | Tablet container padding. |
| `{spacing.lg-plus}` | 40px | `p-lg-plus`, `gap-lg-plus` | In-between for rhythms that don't fit 32 or 48. |
| `{spacing.xl}` | 48px | `p-xl`, `gap-xl` | Desktop container padding, default section padding. |
| `{spacing.2xl}` | 64px | `p-2xl`, `gap-2xl` | Generous breaks. |
| `{spacing.xl2}` | 72px | `p-xl2`, `gap-xl2` | About-card vertical padding (9 × 8). |
| `{spacing.3xl}` | 96px | `p-3xl`, `gap-3xl` | Hero / featured breathing room. |
| `{spacing.4xl}` | 128px | `p-4xl`, `gap-4xl` | Page-level vertical rhythm. |

The 3 sub-paliers (`none`, `2xs`, `lg-plus`) exist to give the system enough granularity for the IA — and you — to hit the right rhythm without resorting to arbitrary brackets.

## Shapes

Radius tokens are deliberately small. Pill shapes are rare and almost never used; mockup frames have their own dedicated tokens (browser 6px, iPhone 16px) because they imitate real device chrome.

- `{rounded.none}` (0): sections, primary cards
- `{rounded.sm}` (1px): all buttons
- `{rounded.md}` (8px): tags, chips (overrides Tailwind's default 6px)
- `{rounded.frame-browser}`, `{rounded.frame-iphone}`: mockup frames

## Components

The portfolio has a small primitives library (Button, Tag, BlueprintShell, frames, case-study blocks) under `components/`. Agents must compose from these components rather than inline raw `<button>`/`<a>`/`<input>` elements.

**Button.** Two sizes (`default`, `xl`), three variants (`primary`, `brand`, `outline`).
- `primary` → uses `{components.button-primary}` and its hover.
- `brand` → uses `{components.button-brand}` and its hover. **One per page, max.**
- `outline` → uses `{components.button-outline}` and its hover.

**Tag.** Non-interactive metadata (role, duration, sector). Transparent background + 1px `border-strong`, never filled. Uses `{components.tag}`.

**Link (ghost).** A single link style across the portfolio: `text-text-secondary` at rest, `text-text-primary` on hover-supported. No underline. External links: `target="_blank" rel="noopener noreferrer"`.

## Dark Mode

The system has full dark-mode parity. The dark theme is activated by the `dark` class on `<html>` (Tailwind v4 standard) and respects `prefers-color-scheme: dark` as the default. A user toggle persists to `localStorage.theme`.

**Source of truth.** The light values live in this file's YAML frontmatter; the dark values live in `app/globals.css` under the `.dark { ... }` block. The light mode is the privileged design — dark is a deliberate overlay, not a mirror-image.

**Mode-neutral tokens.** All spacing, rounded, motion, layout, and accent base tokens (`accent`, `accent-hover`, `accent-muted`, `accent-subtle`, `text-on-accent`) are the same in both modes. Only the surfaces, text colors, borders, button-primary palette, disabled palette, and `accent-text` swap.

**Mirror par index Zinc.** Surfaces and borders follow a **positional mirror** in the Tailwind Zinc palette (light step N ↔ dark step (1000-N)). This is **not** a hex inversion — perceptual contrast on dark canvases is non-symmetric, so a literal inversion produces tonal jumps that feel too loud. The mirror pattern (May 2026 fix) :

| Token | Light | Dark |
|---|---|---|
| `bg` | zinc-50 (`#fafafa`) | zinc-950 (`#09090b`) |
| `surface` | zinc-100 (`#f4f4f5`) | zinc-900 (`#18181b`) |
| `border` | zinc-200 (`#e4e4e7`) | zinc-800 (`#27272a`) |
| `border-strong` | zinc-300 (`#d4d4d8`) | zinc-700 (`#3f3f47`) |

Same index distance from the extreme of the palette on both sides, no skipped steps.

**No `modes:` YAML extension.** We deliberately do not encode dark mode in this file's frontmatter. Inventing a custom YAML extension on an alpha spec would risk a collision when Google ships an official mode mechanism.

## Motion

The portfolio uses three duration tokens and a single easing curve. We deliberately do not adopt the Material 3 emphasized curves — the portfolio animates simple state changes (hover, active, image fade), not entering/leaving surfaces, so a single ease-out is sufficient.

- `{motion.duration-fast}` (150ms) — color and background hovers
- `{motion.duration-base}` (300ms) — background transitions, image grayscale → color
- `{motion.duration-slow}` (400ms) — hero / featured animations
- `{motion.ease-default}` (`ease-out`) — used for all of the above

The `hover-supported:` custom variant gates every `:hover` rule behind `@media (hover: hover)` so taps on touch surfaces never trigger a hover state. The `prefers-reduced-motion: reduce` query neutralises all transitions and animations globally in `globals.css`.

## Do's and Don'ts

- **Do** use the semantic Tailwind utilities (`bg-bg`, `text-text-primary`, `border-border`, `px-md`, `rounded-md`).
- **Do** use `px-container` and `py-section` for section padding (responsive baked into the CSS variable) rather than composing `px-md md:px-lg lg:px-xl` manually.
- **Do** use `text-text-on-accent` for text/icons posed on `bg-accent` (brand button, accent banners) — never hardcode `#ffffff`.
- **Don't** inline raw hex codes (`text-[#18181b]`, `bg-[#fafafa]`). Use the token utility.
- **Don't** inline arbitrary pixel values (`px-[24px]`, `gap-[16px]`, `rounded-[8px]`). Use spacing/rounded tokens.
- **Do** compose className strings with the `cn()` helper (`lib/cn.ts`).
- **Do** use `hover-supported:` for any hover rule, never plain `hover:` on a touch-reachable surface.
- **Don't** ship a page with more than one `brand` button. Use `primary` or `outline` for secondary actions.
- **Don't** add a shadow to structure layout. Use borders. Mockup frames are the only authorised shadow exception.
- **Do** treat `app/globals.css` as the truth when in doubt — this file is a reflection.
