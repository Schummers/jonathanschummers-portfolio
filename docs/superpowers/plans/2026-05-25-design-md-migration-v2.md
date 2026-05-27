# Design System Migration v2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the portfolio's design system to a tighter agent-first architecture: archive the 808-line French spec, refactor `--sem-*` CSS variables to bare role-based names, add a Google-Stitch-compatible `DESIGN.md` at the repo root, enrich `AGENTS.md` with anti-drift rules, and add an indicative (non-blocking) lint script + GitHub Action.

**Architecture:** `app/globals.css` is the operational source of truth; `DESIGN.md` is a declarative reflection updated ponctually. Dark mode lives in CSS only (no `modes.dark` YAML extension). The lint script is warning-only and never blocks PRs. Two files only: `AGENTS.md` (~40 lines, rules) + `DESIGN.md` (~230 lines, tokens). No `COMPONENTS.md`.

**Tech Stack:** Next.js 16 (App Router), Tailwind v4, TypeScript 5, Node.js 24, GitHub Actions. No test framework currently in the project — verification is done via grep/visual smoke tests and inline fixture runs for the lint script.

**Branch:** `feature/design-md-migration-v2` (already created, spec already committed as `ca061fe`).

**Spec reference:** `docs/superpowers/specs/2026-05-25-design-md-migration-v2.md`

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `docs/DESIGN_SYSTEM.md` | **Move** → `docs/archive/2026-05-25-design-system-original.md` | Frozen historical reference (still contains Annex A's 18 decisions). |
| `app/globals.css` | **Modify** | Drop `--sem-` prefix on every token; add `--blueprint-max: 1400px`. Tailwind utility class names unchanged. |
| `DESIGN.md` (root) | **Create** | ~230-line Google-Stitch-relax doc: YAML frontmatter + 9 markdown sections. |
| `AGENTS.md` | **Modify** | Append design system protocol + anti-drift rules; preserve existing `nextjs-agent-rules` block. |
| `scripts/check-design.mjs` | **Create** | ~50-line Node ESM regex script. Catches raw hex + arbitrary brackets in `app/`, `components/`, `content/`. |
| `package.json` | **Modify** | Add `"ds:check": "node scripts/check-design.mjs"` to scripts. |
| `.github/workflows/ds-check.yml` | **Create** | GitHub Action that runs the script on PR/push. Warning-only, not in branch protection. |

---

## Task 1: Archive the original design system spec

**Files:**
- Move: `docs/DESIGN_SYSTEM.md` → `docs/archive/2026-05-25-design-system-original.md`
- Create: `docs/archive/` directory if it does not exist

- [ ] **Step 1: Verify current state**

Run: `ls docs/DESIGN_SYSTEM.md && wc -l docs/DESIGN_SYSTEM.md`
Expected: file exists, 808 lines (or close).

- [ ] **Step 2: Create the archive directory and move the file**

```bash
mkdir -p docs/archive
git mv docs/DESIGN_SYSTEM.md docs/archive/2026-05-25-design-system-original.md
```

- [ ] **Step 3: Verify the move**

Run:
```bash
ls docs/DESIGN_SYSTEM.md 2>&1 | head -1
ls docs/archive/2026-05-25-design-system-original.md
wc -l docs/archive/2026-05-25-design-system-original.md
```
Expected: first command shows `No such file or directory`; second shows the file; third shows 808 lines.

- [ ] **Step 4: Verify no other file references `docs/DESIGN_SYSTEM.md`**

Run: `grep -rn "docs/DESIGN_SYSTEM" --include="*.md" --include="*.tsx" --include="*.ts" --include="*.mjs" --include="*.js" --include="*.json" --include="*.yml" .`
Expected: only matches inside `docs/superpowers/specs/2026-05-25-design-md-migration-*.md` (the specs themselves, which reference the file path historically — fine to leave). If any operational file (component, script, AGENTS.md, package.json) references the old path, update that file in this commit.

- [ ] **Step 5: Commit**

```bash
git add docs/DESIGN_SYSTEM.md docs/archive/2026-05-25-design-system-original.md
git commit -m "chore(docs): archive original 808-line design system spec

Moved as-is to docs/archive/2026-05-25-design-system-original.md. The
file is preserved unchanged: Annex A (18 audit decisions) remains
consultable. It is no longer auto-loaded by agents.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## Task 2: Refactor `--sem-` prefix out of `app/globals.css`

**Files:**
- Modify: `app/globals.css` (find/replace + add one new token + update internal references)

- [ ] **Step 1: Verify the current state**

Run:
```bash
grep -c "\-\-sem\-" app/globals.css
grep -c "blueprint-max" app/globals.css
```
Expected: first prints a count > 50 (every `--sem-*` occurrence); second prints `0` (token absent today).

- [ ] **Step 2: Take a "before" snapshot of utility usage**

Run: `grep -oE "(text|bg|border|fill|stroke|outline|ring|divide|placeholder|accent|caret)-[a-z0-9-]+" components/*.tsx app/**/*.tsx 2>/dev/null | sort -u > /tmp/utilities-before.txt && wc -l /tmp/utilities-before.txt`
Note the count. After the refactor, the count and content of `/tmp/utilities-after.txt` must match.

- [ ] **Step 3: Find/replace `--sem-` → empty string in `app/globals.css`**

Use a single sed pass:
```bash
sed -i.bak 's/--sem-/--/g' app/globals.css
diff app/globals.css.bak app/globals.css | head -40
rm app/globals.css.bak
```
Expected diff: every `--sem-foo` becomes `--foo`. No other change.

- [ ] **Step 4: Confirm zero remaining `--sem-` in globals.css**

Run: `grep -n "\-\-sem\-" app/globals.css || echo "clean"`
Expected: `clean`.

- [ ] **Step 5: Add the `--blueprint-max` token**

Edit `app/globals.css`. Inside the `:root { ... }` light-mode block, under the existing `/* Layout — case study widths */` group, add the line:
```css
  --blueprint-max: 1400px;   /* max content width (BlueprintShell) */
```

Inside the `@theme inline { ... }` block, in the `/* Layout — case study */` group, add the line:
```css
  --width-blueprint: var(--blueprint-max);
```

- [ ] **Step 6: Verify the additions**

Run:
```bash
grep -n "blueprint-max" app/globals.css
grep -n "width-blueprint" app/globals.css
```
Expected: each grep returns exactly one line (the new entry).

- [ ] **Step 7: Run a Tailwind/Next build to confirm CSS is valid**

Run: `npm run build 2>&1 | tail -40`
Expected: build succeeds. If the build fails on a missing variable, the find/replace either missed a reference or introduced a typo — read the error, find the offending line, fix, re-build.

- [ ] **Step 8: Start the dev server**

Run: `npm run dev` in a background terminal.

- [ ] **Step 9: Visual smoke test, light mode**

Open in the browser:
- `http://localhost:3000/` (homepage)
- `http://localhost:3000/about`
- `http://localhost:3000/work` (if exists)
- Every case study page found in `app/work/[slug]/page.tsx` content folder

Compare each to a recent production deploy. Look for: missing background colors (page reverts to browser default white), missing borders, wrong text colors, broken button styles.

- [ ] **Step 10: Visual smoke test, dark mode**

Toggle the dark-mode switch in the nav (or set `localStorage.theme = "dark"` in DevTools console and reload). Re-check the same pages.

- [ ] **Step 11: Confirm utility list unchanged**

Run: `grep -oE "(text|bg|border|fill|stroke|outline|ring|divide|placeholder|accent|caret)-[a-z0-9-]+" components/*.tsx app/**/*.tsx 2>/dev/null | sort -u > /tmp/utilities-after.txt && diff /tmp/utilities-before.txt /tmp/utilities-after.txt && echo "IDENTICAL"`
Expected: `IDENTICAL`. No utility class name changed.

- [ ] **Step 12: Commit**

```bash
git add app/globals.css
git commit -m "refactor(css): drop --sem- prefix from CSS tokens

Aligns with Linear-style role-based naming (--text-primary, --bg,
--surface, --border). Tailwind utility class names are unchanged
because the @theme inline bridge still maps to --color-* / --spacing-*
/ etc. Components are untouched.

Also adds --blueprint-max: 1400px as a first-class token (replaces
inline max-w-[1400px] usages — those will be migrated in a later PR).

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## Task 3: Create `DESIGN.md` at repo root

**Files:**
- Create: `DESIGN.md` (at repo root)

- [ ] **Step 1: Verify the file does not yet exist**

Run: `ls DESIGN.md 2>&1 | head -1`
Expected: `No such file or directory`.

- [ ] **Step 2: Create `DESIGN.md` with full content**

Create the file with the following content (the YAML frontmatter and 9 sections from spec §4):

```markdown
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

> **Source of truth note.** `app/globals.css` is the operational truth for CSS tokens. This file is a declarative reflection, updated ponctually (per audit or per token-PR). If you find a mismatch, the CSS wins; please open a PR that updates this file.

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
```

- [ ] **Step 3: Verify line count is in the 200–300 range**

Run: `wc -l DESIGN.md`
Expected: a number between 200 and 300 (inclusive). If 350+, trim prose. If under 180, double-check no section was lost.

- [ ] **Step 4: Verify the YAML frontmatter parses**

Run this one-shot inline check (no new dependency needed — `js-yaml` is not in the project, but Node can validate via a simple regex grab + manual parse):

```bash
node -e "
const fs = require('fs');
const src = fs.readFileSync('DESIGN.md', 'utf8');
const m = src.match(/^---\n([\s\S]+?)\n---/);
if (!m) { console.error('FAIL: no YAML frontmatter found'); process.exit(1); }
console.log('YAML frontmatter detected, length:', m[1].split('\n').length, 'lines');
"
```
Expected: a non-error line indicating roughly 80–100 lines of YAML.

- [ ] **Step 5: Verify cross-references in prose are consistent**

Run: `grep -oE "\{(colors|typography|spacing|rounded|shadow|motion|layout|components)\.[a-z0-9-]+\}" DESIGN.md | sort -u`
Look at the output. Every reference must point to a key that actually exists in the YAML. (Manual cross-check.)

- [ ] **Step 6: Commit**

```bash
git add DESIGN.md
git commit -m "docs: add DESIGN.md at repo root (Stitch-compatible relax)

Google DESIGN.md format (alpha) with YAML frontmatter + 9 markdown
sections. ~230 lines. English. Light-mode tokens only in YAML; dark
mode documented in prose pointing to app/globals.css .dark { }.

DESIGN.md is a declarative reflection — app/globals.css remains the
operational source of truth.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## Task 4: Enrich `AGENTS.md` with the design system protocol

**Files:**
- Modify: `AGENTS.md` (append new sections, preserve existing block)

- [ ] **Step 1: Verify the current state**

Run: `cat AGENTS.md`
Expected output:
```
<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
```

- [ ] **Step 2: Append the design system protocol section**

Open `AGENTS.md` and append (after the closing `<!-- END:nextjs-agent-rules -->` marker, with a blank line separator) the following content:

```markdown

## Design system protocol

Before generating any UI code:

1. **Read `DESIGN.md`** at the repo root — tokens, role-based color naming,
   type scale, layout, do's and don'ts.
2. **Reuse existing components** from `components/`. Open the `.tsx` file to
   discover variants and props (`button.tsx`, `tag.tsx`, frames,
   `blueprint-shell.tsx`, `case-study-*.tsx`).
3. **Do not inline a raw `<button>`, `<a>`, or `<input>`** styled with Tailwind
   utilities. Always compose from the existing component, or ask the user
   before extending the catalog.

## Anti-drift rules (hard)

1. **No raw hex codes** in `app/`, `components/`, `content/`. Use the semantic
   Tailwind utilities (`bg-text-primary`, `text-text-secondary`, etc.).
2. **No arbitrary bracket values** for spacing/sizing/radius (`px-[24px]`,
   `gap-[16px]`, `rounded-[8px]` are forbidden). Use token utilities (`px-md`,
   `gap-sm`, `rounded-md`).
3. **No bare `hover:`** on touch-reachable surfaces. Use the custom
   `hover-supported:` variant.
4. **One `brand` button per page maximum.**

## Verification

After producing UI code, run `npm run ds:check`. The script catches raw hex
codes and arbitrary brackets and reports them locally. The same check also
runs on every PR via the `design-check` GitHub Action — its result is
informational and never blocks a merge.

Source-of-truth note: `app/globals.css` is the operational truth for CSS
tokens; `DESIGN.md` is a declarative reflection updated ponctually.
```

- [ ] **Step 3: Verify the structure**

Run:
```bash
wc -l AGENTS.md
grep -c "^## " AGENTS.md
grep -c "BEGIN:nextjs-agent-rules" AGENTS.md
grep -c "END:nextjs-agent-rules" AGENTS.md
```
Expected: ~40 lines; 3 H2 sections (`Design system protocol`, `Anti-drift rules`, `Verification`); the `BEGIN` / `END` markers each present exactly once.

- [ ] **Step 4: Commit**

```bash
git add AGENTS.md
git commit -m "docs: enrich AGENTS.md with design system protocol

Appends three sections: pre-generation protocol (read DESIGN.md, reuse
components, no inline elements), anti-drift hard rules (no raw hex,
no arbitrary brackets, hover-supported only, one brand button per
page), and post-generation verification (npm run ds:check).

Preserves the existing nextjs-agent-rules block at the top.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## Task 5: Create `scripts/check-design.mjs`

**Files:**
- Create: `scripts/check-design.mjs`
- Modify: `package.json` (add `ds:check` script)
- Temporary: `/tmp/check-design-fixture.tsx` (test fixture, deleted before commit)

- [ ] **Step 1: Verify the scripts directory exists or create it**

Run: `mkdir -p scripts && ls scripts/`
Expected: directory exists.

- [ ] **Step 2: Create the script**

Create `scripts/check-design.mjs` with this exact content:

```javascript
#!/usr/bin/env node
// scripts/check-design.mjs
//
// Indicative anti-drift lint for the design system.
// Catches:
//   - raw hex color codes (#abc, #abcdef, #abcdef00) in JSX/TSX/MDX
//   - arbitrary bracket values for spacing/sizing/radius
//     (px-[24px], gap-[16px], rounded-[8px], etc.)
//
// Exits 1 on any finding so a GitHub Action shows a red check, but the
// workflow is intentionally NOT added to branch protection: the result is
// informational. Run locally via `npm run ds:check`.

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const ROOTS = ['app', 'components', 'content'];
const EXTS = new Set(['.tsx', '.ts', '.mdx']);
const SKIP_DIRS = new Set(['node_modules', '.next', '.git', 'dist', 'build']);

// Raw hex: #abc / #abcd / #aabbcc / #aabbccdd, NOT inside backticks
// (so markdown code fences in MDX don't trip the check).
const RE_HEX = /(?<![\w`])#[0-9a-fA-F]{3,8}\b(?!`)/g;

// Arbitrary Tailwind bracket values for spacing / sizing / radius.
// Examples caught:  px-[24px], py-[1rem], gap-[16px], m-[8px], rounded-[8px], w-[300px], h-[2.5em]
// Examples NOT caught: max-w-[1400px]  (intentionally — `max-w` isn't in the prefix list yet;
// add it if you want it caught.)
const RE_BRACKET = /\b(?:p[xytblr]?|m[xytblr]?|gap|w|h|rounded)-\[\d+(?:\.\d+)?(?:px|rem|em)\]/g;

function* walk(dir) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return;
  }
  for (const name of entries) {
    if (SKIP_DIRS.has(name)) continue;
    const full = join(dir, name);
    let st;
    try {
      st = statSync(full);
    } catch {
      continue;
    }
    if (st.isDirectory()) {
      yield* walk(full);
    } else if (EXTS.has(extname(name))) {
      yield full;
    }
  }
}

const findings = [];
for (const root of ROOTS) {
  for (const file of walk(root)) {
    const src = readFileSync(file, 'utf8');
    const lines = src.split('\n');
    lines.forEach((line, i) => {
      const lineNo = i + 1;
      for (const match of line.matchAll(RE_HEX)) {
        findings.push({ file, lineNo, kind: 'raw-hex', match: match[0] });
      }
      for (const match of line.matchAll(RE_BRACKET)) {
        findings.push({ file, lineNo, kind: 'arbitrary-bracket', match: match[0] });
      }
    });
  }
}

if (findings.length === 0) {
  console.log('✓ ds:check — no raw hex or arbitrary brackets found.');
  process.exit(0);
}

console.log(`✗ ds:check — ${findings.length} finding(s):\n`);
for (const f of findings) {
  console.log(`  ${f.file}:${f.lineNo}  ${f.kind.padEnd(18)} ${f.match}`);
}
console.log('\nThis check is informational; PRs are not blocked.');
console.log('Use Tailwind utilities backed by tokens (bg-text-primary, px-md, rounded-md).');
process.exit(1);
```

Make it executable: `chmod +x scripts/check-design.mjs`.

- [ ] **Step 3: Create a fixture file with known violations**

```bash
mkdir -p /tmp/ds-check-fixture/app
cat > /tmp/ds-check-fixture/app/page.tsx <<'EOF'
export default function Page() {
  return (
    <div className="bg-[#18181b] px-[24px] rounded-[8px]">
      <span style={{ color: '#fafafa' }}>Hello</span>
    </div>
  );
}
EOF
```

- [ ] **Step 4: Run the script against the fixture, confirm it catches the violations**

```bash
cd /tmp/ds-check-fixture && node /Users/jonathanschummers/Documents/jonathan/scripts/check-design.mjs ; cd -
```
Expected output (exit code 1):
```
✗ ds:check — 4 finding(s):

  app/page.tsx:3  raw-hex            #18181b
  app/page.tsx:3  arbitrary-bracket  px-[24px]
  app/page.tsx:3  arbitrary-bracket  rounded-[8px]
  app/page.tsx:4  raw-hex            #fafafa
```
(Counts and ordering may differ slightly — what matters is that all 4 distinct violations appear and the exit code is 1.)

Clean up: `rm -rf /tmp/ds-check-fixture`.

- [ ] **Step 5: Run the script against the actual project**

Run: `node scripts/check-design.mjs`
Expected: either exit 0 with the success line, or exit 1 with a list of findings. **Either is acceptable** — the goal is that the script runs without crashing. Note the count of findings if any (they'll be addressed in a future cleanup PR, not in this migration).

- [ ] **Step 6: Add the `ds:check` npm script**

Open `package.json` and add `"ds:check": "node scripts/check-design.mjs"` to the `scripts` block. Final block should look like:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "ds:check": "node scripts/check-design.mjs"
}
```

- [ ] **Step 7: Verify `npm run ds:check` works end-to-end**

Run: `npm run ds:check`
Expected: same output as Step 5 (success or warnings list), no npm-level error.

- [ ] **Step 8: Commit**

```bash
git add scripts/check-design.mjs package.json
git commit -m "chore: add indicative ds:check script

scripts/check-design.mjs walks app/, components/, content/ for *.tsx,
*.ts, *.mdx and reports raw hex codes and arbitrary Tailwind brackets
for spacing/sizing/radius. Exits 1 on any finding so CI can surface
a red check, but the workflow is not wired into branch protection.

Added 'ds:check' npm script.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## Task 6: Add the GitHub Action

**Files:**
- Create: `.github/workflows/ds-check.yml`

- [ ] **Step 1: Verify the workflows directory or create it**

Run: `mkdir -p .github/workflows && ls .github/workflows/`
Expected: directory exists. List any existing workflows so we don't conflict.

- [ ] **Step 2: Create the workflow**

Create `.github/workflows/ds-check.yml` with this content:

```yaml
name: design-check
on:
  pull_request:
  push:
    branches: [main]
jobs:
  ds-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '24'
      - name: Run design system check
        run: node scripts/check-design.mjs
        continue-on-error: false
```

Note: `continue-on-error: false` is the default — written explicitly so the check turns red on findings. The non-blocking nature comes from *not* adding the check to branch protection, not from making the step itself a no-op.

- [ ] **Step 3: Validate YAML syntax**

Run:
```bash
node -e "
const fs = require('fs');
const src = fs.readFileSync('.github/workflows/ds-check.yml', 'utf8');
// Minimal validation: must have 'name', 'on', 'jobs' top-level keys.
for (const k of ['name:', 'on:', 'jobs:']) {
  if (!src.includes(k)) { console.error('FAIL missing key:', k); process.exit(1); }
}
console.log('YAML keys present.');
"
```
Expected: `YAML keys present.`

- [ ] **Step 4: Commit**

```bash
git add .github/workflows/ds-check.yml
git commit -m "ci: add design-check GitHub Action

Runs scripts/check-design.mjs on every pull_request and push to main.
The check is informational only — it is intentionally NOT added to
branch protection rules. A red check means there is drift to clean
up; it never blocks a merge.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## Task 7: Final verification, push, and open PR

**Files:** (none modified — verification only)

- [ ] **Step 1: Confirm clean working tree**

Run: `git status --short`
Expected: only untracked files that are unrelated to this migration (the v1 spec, the audit doc, `docs/workflowlyse.md`, `.claude/`, the `IA Code-First` note). Nothing modified, nothing staged.

- [ ] **Step 2: Run the full check sequence locally one last time**

```bash
grep -rn "\-\-sem\-" app/ components/ 2>/dev/null || echo "No --sem- remaining"
ls DESIGN.md AGENTS.md docs/archive/2026-05-25-design-system-original.md scripts/check-design.mjs .github/workflows/ds-check.yml
wc -l DESIGN.md
npm run ds:check ; echo "exit=$?"
npm run build
```
Expected:
- `No --sem- remaining` (or only matches in archive, which are filtered out by the `--include` flags of grep above — verify any unexpected match is in `docs/archive/` and ignore).
- Five files listed, all present.
- DESIGN.md between 200 and 300 lines.
- `ds:check` runs and prints either success or a findings list with `exit=` (0 or 1, either fine).
- Next build succeeds.

- [ ] **Step 3: Final visual smoke test**

Start dev server (`npm run dev`) and walk through:
- `/` light + dark
- `/about` light + dark
- Every case study page light + dark

Compare with the production deploy or a recent screenshot if available. If anything visibly differs (colors, borders, spacing), STOP — debug in `app/globals.css` and commit a fix on this same branch.

- [ ] **Step 4: Push the branch**

```bash
git log --oneline -10
git push -u origin feature/design-md-migration-v2
```
Expected: 8 commits on this branch (the spec commit `ca061fe` from before + 7 implementation commits). Branch is published.

- [ ] **Step 5: Open the PR via `gh`**

```bash
gh pr create \
  --title "Design system migration v2: DESIGN.md + AGENTS.md + ds:check" \
  --body "$(cat <<'EOF'
Implements `docs/superpowers/specs/2026-05-25-design-md-migration-v2.md`.

## Summary

- Archive the 808-line French DS spec to `docs/archive/`.
- Refactor `app/globals.css` to drop the `--sem-` prefix (Linear-style naming). Tailwind utility class names unchanged.
- Add `DESIGN.md` at the repo root (Google Stitch-relax format, ~230 lines, English).
- Enrich `AGENTS.md` with the design system protocol + anti-drift rules.
- Add `scripts/check-design.mjs` + `npm run ds:check` (catches raw hex and arbitrary Tailwind brackets in `app/`, `components/`, `content/`).
- Add `design-check` GitHub Action — runs on every PR/push but is **warning-only**; intentionally NOT added to branch protection.

## Verification

- [x] Local build (`npm run build`) succeeds.
- [x] `npm run ds:check` runs cleanly (success or known findings list).
- [x] Visual smoke test on `/`, `/about`, every case study, light + dark.
- [x] `DESIGN.md` between 200 and 300 lines.
- [x] No `--sem-` references remain outside `docs/archive/`.

## Out of scope

- No component refactor. Tailwind utility class names unchanged.
- No automated generator (`@google/design.md export`).
- Migrating inline `max-w-[1400px]` usages to `max-w-blueprint` — token is added in this PR, swaps in a later PR.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

- [ ] **Step 6: Confirm the GitHub Action runs**

Run: `gh pr checks --watch` (or open the PR in the browser).
Expected: the `design-check` action runs to completion. Either green (no findings) or red (findings listed). Either result is acceptable per the indicative-only policy — note the result in the PR comments if red, so you remember to clean up in a follow-up PR.

- [ ] **Step 7: Merge when ready**

After self-review of the PR diff, merge via:
```bash
gh pr merge --squash --delete-branch
```
(Squash so the final commit on `main` is one clean migration commit; the granular history is preserved on the branch / in the closed PR.)

---

## Definition of Done (cross-check with spec §9)

- [ ] `DESIGN.md` exists at repo root, between 200 and 300 lines, YAML parses, markdown reads correctly. *(Task 3)*
- [ ] `AGENTS.md` includes the protocol + anti-drift sections; the `nextjs-agent-rules` block is preserved. *(Task 4)*
- [ ] `docs/DESIGN_SYSTEM.md` no longer exists; `docs/archive/2026-05-25-design-system-original.md` contains the original content unchanged. *(Task 1)*
- [ ] No `--sem-*` reference remains in `app/globals.css` or anywhere else outside `docs/archive/`. *(Task 2 + Task 7 Step 2)*
- [ ] `app/globals.css` renders identically in light + dark on every page. *(Task 2 Steps 9–10, Task 7 Step 3)*
- [ ] `npm run ds:check` runs without crashing. *(Task 5 Step 7)*
- [ ] `design-check` action runs on the PR. *(Task 7 Step 6)*

---

*End of plan.*
