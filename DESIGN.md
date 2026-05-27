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
  text-primary:   "#18181b"
  text-secondary: "#71717b"
  text-tertiary:  "#9f9fa9"

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
  hero:    { fontFamily: Space Grotesk, fontSize: 56px, fontWeight: 700, lineHeight: 0.92, letterSpacing: -0.03em }
  h1:      { fontFamily: Space Grotesk, fontSize: 48px, fontWeight: 700, lineHeight: 1.1,  letterSpacing: -0.02em }
  h2:      { fontFamily: Space Grotesk, fontSize: 32px, fontWeight: 500, lineHeight: 1.2,  letterSpacing: -0.02em }
  h3:      { fontFamily: Space Grotesk, fontSize: 24px, fontWeight: 500, lineHeight: 1.3,  letterSpacing: -0.01em }
  h4:      { fontFamily: Space Grotesk, fontSize: 18px, fontWeight: 500, lineHeight: 1.3,  letterSpacing: -0.02em }
  body-lg: { fontFamily: Manrope,       fontSize: 18px, fontWeight: 400, lineHeight: 1.65 }
  body:    { fontFamily: Manrope,       fontSize: 16px, fontWeight: 400, lineHeight: 1.65 }
  body-sm: { fontFamily: Manrope,       fontSize: 14px, fontWeight: 400, lineHeight: 1.5 }
  label:   { fontFamily: Manrope,       fontSize: 14px, fontWeight: 500, lineHeight: 1.5,  letterSpacing: 0.08em }
  tag:     { fontFamily: Manrope,       fontSize: 12px, fontWeight: 500, lineHeight: 16px }
  caption: { fontFamily: Manrope,       fontSize: 12px, fontWeight: 400, lineHeight: 16px }

spacing:
  xs:   8px
  sm:   16px
  md:   24px
  lg:   32px
  xl:   48px
  2xl:  64px
  xl2:  72px        # featured cards (9 × 8)
  3xl:  96px
  4xl:  128px

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

components:
  button-primary:        { backgroundColor: "{colors.btn-primary}",        textColor: "{colors.btn-primary-fg}", typography: "{typography.body}", rounded: "{rounded.sm}", padding: "12px 24px" }
  button-primary-hover:  { backgroundColor: "{colors.btn-primary-hover}",  textColor: "{colors.btn-primary-fg}" }
  button-brand:          { backgroundColor: "{colors.accent}",             textColor: "#ffffff",                 typography: "{typography.body}", rounded: "{rounded.sm}", padding: "12px 24px" }
  button-brand-hover:    { backgroundColor: "{colors.accent-hover}",       textColor: "#ffffff" }
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

## Typography

| Token | Family | Size (desktop) | Weight | Line | Tracking | Use |
|---|---|---|---|---|---|---|
| `{typography.hero}` | Space Grotesk | 56px | 700 | 0.92 | −0.03em | Homepage hero only |
| `{typography.h1}` | Space Grotesk | 48px | 700 | 1.1 | −0.02em | Page H1 |
| `{typography.h2}` | Space Grotesk | 32px | 500 | 1.2 | −0.02em | Section titles |
| `{typography.h3}` | Space Grotesk | 24px | 500 | 1.3 | −0.01em | Sub-titles, key-results |
| `{typography.h4}` | Space Grotesk | 18px | 500 | 1.3 | −0.02em | Small titles in cards |
| `{typography.body-lg}` | Manrope | 18px | 400 | 1.65 | normal | Lead paragraphs |
| `{typography.body}` | Manrope | 16px | 400 | 1.65 | normal | Default body |
| `{typography.body-sm}` | Manrope | 14px | 400 | 1.5 | normal | Captions, meta |
| `{typography.label}` | Manrope | 14px | 500 | 1.5 | 0.08em (uppercase) | Section labels |
| `{typography.tag}` | Manrope | 12px | 500 | 16px | normal | Tag chips |
| `{typography.caption}` | Manrope | 12px | 400 | 16px | normal | Image captions (italic) |

**Responsive.** Tablet (`≤1024px`) and mobile (`≤767px`) reduce hero / H1 / H2 / H3 sizes by 1–2 steps. Body sizes are unchanged except `body-lg` which collapses to `body` on mobile. The shifts are implemented as media-query overrides in `app/globals.css`.

## Layout

The portfolio runs on a single vertical blueprint:

- **Max width**: `{layout.blueprint-max}` (1400px), enforced by `<BlueprintShell>`.
- **Vertical rails**: `border-x border-border` on the shell, creating the editorial framing.
- **Section padding (horizontal)**: 24px mobile, 32px tablet, 48px desktop. Use spacing tokens (`px-md`, `px-lg`, `px-xl`).
- **Case-study grid (desktop ≥1280px)**: a 3-column layout where the centre column is `{layout.case-center}` (864px) and the inner prose is constrained to `{layout.case-prose}` (640px).

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

**Mode-neutral tokens.** All spacing, rounded, motion, layout, and accent base tokens (`accent`, `accent-hover`, `accent-muted`, `accent-subtle`) are the same in both modes. Only the surfaces, text colors, borders, button-primary palette, disabled palette, and `accent-text` swap.

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
- **Don't** inline raw hex codes (`text-[#18181b]`, `bg-[#fafafa]`). Use the token utility.
- **Don't** inline arbitrary pixel values (`px-[24px]`, `gap-[16px]`, `rounded-[8px]`). Use spacing/rounded tokens.
- **Do** compose className strings with the `cn()` helper (`lib/cn.ts`).
- **Do** use `hover-supported:` for any hover rule, never plain `hover:` on a touch-reachable surface.
- **Don't** ship a page with more than one `brand` button. Use `primary` or `outline` for secondary actions.
- **Don't** add a shadow to structure layout. Use borders. Mockup frames are the only authorised shadow exception.
- **Do** treat `app/globals.css` as the truth when in doubt — this file is a reflection.
