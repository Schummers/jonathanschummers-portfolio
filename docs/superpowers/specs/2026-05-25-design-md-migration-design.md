# Design System Migration: DESIGN.md + COMPONENTS.md + Agent Guardrails

**Date:** 2026-05-25
**Status:** Spec (pre-implementation)
**Author:** Jonathan Schummers (with Claude)

---

## 1. Context

The portfolio's design system currently lives across three uncoordinated places:

- **`docs/DESIGN_SYSTEM.md`** — 808 lines of French prose, the human-readable reference. Includes 18 audit decisions in Annex A (May 2026).
- **`app/globals.css`** — 312 lines of Tailwind v4 CSS variables (`--sem-*` tokens) and `@theme` registration. The operational source for the running app.
- **`components/`** — Reusable primitives (`button.tsx`, `tag.tsx`, `icons.tsx`, frames) and case-study blocks (`case-study-*.tsx`). No catalog — discovery happens by reading code.

This works for a solo human author but fails agent-first workflows:

- Agents that read the project have no canonical, machine-readable token contract.
- The 808-line French spec is too long to load into agent context without quadratic token burn (~12k tokens just for the design system).
- Agents drift toward inline hex codes (`text-[#18181b]`) or arbitrary pixel values (`px-[24px]`) because nothing enforces the token discipline beyond convention.
- There is no component registry — agents must read each `.tsx` file to discover what exists and how to use it.

The Google **DESIGN.md** format (open-sourced March 2026) is the emerging convention for machine-readable design system documentation. It is the design counterpart to `AGENTS.md`. Industry adoption (Linear, Supabase, Anthropic Claude, Notion, Vercel, etc., per the `VoltAgent/awesome-design-md` registry) confirms the convention is stable enough to commit to.

This migration replaces the fragmented setup with a tight three-file architecture (`AGENTS.md` + `DESIGN.md` + `COMPONENTS.md`) plus an enforcement script (`lint-tokens.mjs`) that runs in CI.

---

## 2. Goals & non-goals

### Goals

- **Single canonical machine-readable source** for design tokens, at the repo root, lintable by `@google/design.md`.
- **Agent-first**: every artifact in English, in formats agents are trained to read.
- **Drift prevention**: CI fails on raw hex codes, arbitrary pixel values, or use of UI elements not registered in `COMPONENTS.md`.
- **Single mode-neutral token name space** (DTCG-aligned): no `-light` / `-dark` suffixes. Dark values overlay via a custom `modes.dark:` YAML block.
- **Living archive**: the current 808-line French spec is preserved (not deleted) in `docs/archive/` for historical context.
- **Scope-bounded**: ~400-line target for `DESIGN.md` (vs 808 today). Anything that doesn't fit gets archived or moved to `COMPONENTS.md`.

### Non-goals

- **No automated Tailwind generator** from `DESIGN.md`. `globals.css` remains the operational CSS; the lint script ensures the two stay aligned manually. (Generator can be added later if the divergence cost grows.)
- **No DTCG/Style Dictionary integration.** Premature for a solo portfolio.
- **No Storybook or visual catalog.** The portfolio itself demonstrates the components in context.
- **No pre-commit hook.** CI gate is sufficient.
- **No Lyse-style Plan → Ship → Analyze framework.** Out of scope. Addressed separately after this migration ships.
- **No migration of `.tsx` component code.** Components keep their current API. Only documentation and lint config change.

---

## 3. Architecture

### 3.1 File layout

```
~/Documents/jonathan/
├── AGENTS.md                                    [enriched]
├── DESIGN.md                                    [new — root, Google Stitch convention]
├── COMPONENTS.md                                [new — Atomic Design catalog]
├── app/
│   └── globals.css                              [aligned with DESIGN.md, unchanged structurally]
├── components/
│   └── *.tsx                                    [unchanged]
├── scripts/
│   └── lint-tokens.mjs                          [new — drift checker]
├── package.json                                 [+ scripts: ds:lint, ds:check]
├── .github/workflows/
│   └── ds-lint.yml                              [new — CI enforcement]
└── docs/
    ├── DESIGN_SYSTEM.md                         [deleted]
    └── archive/
        └── 2026-05-25-design-system-original.md [moved from docs/DESIGN_SYSTEM.md]
```

### 3.2 Responsibility split

| File | Role | Read by | Update cadence |
|---|---|---|---|
| `AGENTS.md` | Rules of engagement, anti-drift protocol | Agents | Rare |
| `DESIGN.md` | Design tokens (colors, typography, spacing, radius, motion, components) | Agents | Rare (per audit) |
| `COMPONENTS.md` | Component catalog (atoms/molecules/organisms/templates) with import paths and variants | Agents | Each new case study or component |
| `app/globals.css` | Operational CSS (the running app reads this) | Build system | Aligned with `DESIGN.md` manually |
| `scripts/lint-tokens.mjs` | Detect raw hex / arbitrary px / unregistered UI elements | CI | Rare |

---

## 4. `DESIGN.md` — structure and content

Target: **~400 lines**. English. At repo root. Conforms to Google Stitch spec (alpha) with one documented extension (`modes:` block).

### 4.1 Section order (spec-compliant)

1. **YAML frontmatter** — All machine-readable tokens
2. **Overview** — Brand personality, voice, design principles (~50 lines prose)
3. **Colors** — Palette description with `{colors.*}` references (~40 lines)
4. **Typography** — Font families, hierarchy table, principles (~50 lines)
5. **Layout** — Spacing scale, blueprint grid, case-study widths (~30 lines)
6. **Elevation & Depth** — "No shadows" principle + mockup-frame exception (~15 lines)
7. **Shapes** — Radius scale (~15 lines)
8. **Components** — Atom-level styling rules (Button, Tag, links, focus) (~80 lines)
9. **Dark Mode** — *Custom section* documenting the `modes.dark` swap rule (~30 lines)
10. **Motion** — *Custom section* for durations, easing, reduced-motion, hover-supported (~30 lines)
11. **Responsive Behavior** — *Custom section* — breakpoints, type scale shifts (~25 lines)
12. **Do's and Don'ts** — Hard rules for agents (~25 lines)

### 4.2 YAML frontmatter — token schema

```yaml
---
version: alpha
name: jonathan-portfolio
description: |
  An editorial portfolio for a freelance Product Designer. The system anchors
  on warm near-white surfaces with deep ink type, a single electric-blue accent,
  and pixel-perfect borders instead of shadows. Voice is quietly technical:
  Space Grotesk for display, Manrope for body. Dark mode mirrors the system on
  a deep neutral canvas. Structure-by-borders, never structure-by-shadow.

colors:
  # Surfaces & borders
  bg: "#fafafa"               # page background
  surface: "#f4f4f5"          # raised surface (cards on hover, key results)
  border: "#e4e4e7"           # default 1px border
  border-strong: "#d4d4d8"    # 1px on inverse surfaces
  invert-bg: "#18181b"        # inverse band (testimonials)
  invert-fg: "#fafafa"

  # Text
  text-primary: "#18181b"
  text-secondary: "#71717b"
  text-tertiary: "#9f9fa9"

  # Brand accent
  accent: "#0A4CF0"
  accent-hover: "#0839b8"
  accent-text: "#0A4CF0"      # links/text rendered in accent color
  accent-muted: "#3670f5"
  accent-subtle: "#d4e3ff"

  # Primary button
  btn-primary: "#1e1e21"
  btn-primary-hover: "#09090b"
  btn-primary-fg: "#fafafa"

  # Disabled
  disabled-bg: "#e4e4e7"
  disabled-fg: "#9f9fa9"

typography:
  hero:
    fontFamily: Space Grotesk
    fontSize: 56px
    fontWeight: 700
    lineHeight: 0.92
    letterSpacing: -0.03em
  h1:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -0.02em
  h2:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: -0.02em
  h3:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: -0.01em
  h4:
    fontFamily: Space Grotesk
    fontSize: 18px
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: -0.02em
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.65
  body:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.65
  body-sm:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: 0.08em        # uppercase labels
  tag:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: 500
    lineHeight: 16px
  caption:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: 400
    lineHeight: 16px

rounded:
  none: 0px
  sm: 1px                       # buttons
  pill: 3px                     # rare
  md: 8px                       # tags, chips (overrides Tailwind default)
  frame-browser: 6px            # browser mockup frame
  frame-iphone: 16px            # iPhone mockup frame

spacing:
  xs: 8px
  sm: 16px
  md: 24px
  lg: 32px
  xl: 48px
  2xl: 64px
  xl2: 72px                     # featured cards (9 × 8)
  3xl: 96px
  4xl: 128px

components:
  button-primary:
    backgroundColor: "{colors.btn-primary}"
    textColor: "{colors.btn-primary-fg}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: 12px 24px
  button-primary-hover:
    backgroundColor: "{colors.btn-primary-hover}"
    textColor: "{colors.btn-primary-fg}"
  button-brand:
    backgroundColor: "{colors.accent}"
    textColor: "#ffffff"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: 12px 24px
  button-brand-hover:
    backgroundColor: "{colors.accent-hover}"
    textColor: "#ffffff"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.text-primary}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: 12px 24px
  button-outline-hover:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
  tag:
    backgroundColor: "transparent"
    textColor: "{colors.text-secondary}"
    typography: "{typography.tag}"
    rounded: "{rounded.md}"
    padding: 6px 10px

# --- Custom extension (non-standard, consumed only by scripts/lint-tokens.mjs
#     and any future Tailwind generator). Linter ignores unknown top-level keys.) ---
modes:
  dark:
    bg: "#09090b"
    surface: "#27272a"
    border: "#3f3f47"
    border-strong: "#52525c"
    invert-bg: "#fafafa"
    invert-fg: "#18181b"
    text-primary: "#e4e4e7"
    text-secondary: "#9f9fa9"
    text-tertiary: "#71717b"
    accent-text: "#6d9dfa"
    btn-primary: "#ececee"
    btn-primary-hover: "#fafafa"
    btn-primary-fg: "#09090b"
    disabled-bg: "#3f3f47"
    disabled-fg: "#52525c"
    # Tokens not listed are mode-neutral (accent, accent-hover, etc.)

# Motion is also a custom extension — not in the Google spec.
motion:
  duration-fast: 150ms
  duration-base: 300ms
  duration-slow: 400ms
  ease-default: ease-out

# Layout widths (case-study three-column grid) — custom.
layout:
  case-prose: 640px
  case-center: 864px
  blueprint-max: 1400px
---
```

### 4.3 Prose conventions inside `DESIGN.md`

- Every token reference uses `{colors.foo}` / `{typography.bar}` syntax.
- Component sub-sections describe **rules, not state machines** — variants are separate component entries in the YAML.
- "Do's and Don'ts" section enforces:
  - Do use tokens. Don't use raw hex.
  - Do compose with `cn()`. Don't use arbitrary `text-[#xxx]`.
  - Do use `hover-supported:` variant. Don't use plain `hover:` for mobile.
  - One brand button per page max.
  - No shadow for structure (except mockup frames).

### 4.4 Dark Mode section (canonical text)

```markdown
## Dark Mode

The system has full dark-mode parity. The dark theme is activated by the `dark`
class on `<html>` (Tailwind v4 standard) and respects `prefers-color-scheme:
dark` as the default. A user toggle persists to `localStorage.theme`.

**Token override rule.** Tokens listed under `modes.dark` in the YAML
frontmatter override their `colors.*` counterpart when `.dark` is on `<html>`.
Tokens not listed in `modes.dark` are mode-neutral (e.g., `accent`,
`accent-hover`, all `spacing.*`, all `rounded.*`, all `motion.*`).

**Implementation note.** `app/globals.css` is the operational source. The
`modes.dark` block in this file must mirror the `.dark { ... }` overrides in
`globals.css`. The lint script (`scripts/lint-tokens.mjs`) verifies parity.
```

---

## 5. `COMPONENTS.md` — structure

Target: **~200 lines**. English. At repo root.

Atomic Design vocabulary. For each component: import path, props summary, when to use, when NOT to use.

```markdown
# Components

The portfolio's component catalog. Organized by Atomic Design level.

When generating UI, agents MUST compose from these components. Inline HTML
elements (`<button>`, `<input>`, `<a>` styled inline) are forbidden in the
portfolio surfaces — see AGENTS.md §Anti-drift.

## Atoms

### Button
- **Import:** `import { Button } from "@/components/button"`
- **Variants:** `primary` | `brand` | `outline`
- **Sizes:** `default` | `xl`
- **Constraints:** one `brand` per page max (see DESIGN.md §Do's and Don'ts)
- **Tokens:** All variants defined under `components.button-*` in DESIGN.md

### Tag
- **Import:** `import { Tag } from "@/components/tag"`
- **Use for:** non-interactive metadata (role, duration, sector, technology)
- **Constraints:** transparent + 1px border (outline style, not filled)

### Icons
- **Import:** `import { ArrowRight, ... } from "@/components/icons"`
- **Source:** Heroicons (subset, tree-shaken)
- **Sizing:** Always use `currentColor` for stroke/fill

## Molecules

### BrowserFrame
- **Import:** `import { BrowserFrame } from "@/components/frames/browser-frame"`
- **Use for:** desktop product screenshots in case studies
- **Tokens:** `rounded.frame-browser`, `motion.duration-base`

### IPhoneFrame
- **Import:** `import { IPhoneFrame } from "@/components/frames/iphone-frame"`
- **Use for:** mobile product screenshots in case studies
- **Tokens:** `rounded.frame-iphone`

## Organisms

### CaseStudyHero / CaseStudyContext / CaseStudyHow / ...
- **Import:** `import { ... } from "@/components/case-study-*"`
- **Use for:** assembling a case study page from MDX content
- **Constraints:** All compose `BlueprintShell` as their outer template

## Templates

### BlueprintShell
- **Import:** `import { BlueprintShell } from "@/components/blueprint-shell"`
- **Use for:** every page-level layout
- **Tokens:** `layout.blueprint-max`, `spacing.xl`, `border.border`

## How to add a new component

1. Implement in `components/`.
2. Register here under the correct Atomic level.
3. Reference its tokens in `DESIGN.md`. If new tokens are needed, add them under
   `components.<name>` in the YAML frontmatter.
4. Run `npm run ds:lint` to verify.
```

---

## 6. `AGENTS.md` — enriched content

The current `AGENTS.md` is one line (`This is NOT the Next.js you know`). Migration appends an anti-drift protocol while preserving the existing warning.

### 6.1 Target content

```markdown
# AGENTS.md

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may
all differ from your training data. Read the relevant guide in
`node_modules/next/dist/docs/` before writing any code. Heed deprecation
notices.

## Design system protocol

The design system is the single source of constraint for every UI generation.
Read **all three** of these before generating any UI code:

1. **`DESIGN.md`** at repo root — design tokens, colors, typography, spacing,
   component rules, dark mode swap rule.
2. **`COMPONENTS.md`** at repo root — the catalog of allowed components with
   import paths.
3. This file (`AGENTS.md`) — the rules of engagement below.

## Anti-drift rules (hard)

1. **No raw hex codes** in any `.tsx`, `.ts`, `.css`, or `.mdx` file under
   `app/`, `components/`, or `content/`. Use the semantic Tailwind utilities
   that resolve to `DESIGN.md` tokens.
2. **No arbitrary pixel values** for spacing, sizing, or radius
   (`px-[24px]`, `gap-[16px]`, `rounded-[8px]` are forbidden). Use token
   utilities (`px-md`, `gap-sm`, `rounded-md`).
3. **No inline HTML interactive elements.** Always compose from
   `COMPONENTS.md` (`<Button>`, `<Tag>`, etc.) instead of `<button>`, `<a>` with
   inline styles, or raw `<input>`.
4. **No `hover:` on touch surfaces.** Use the `hover-supported:` custom variant
   defined in `globals.css`.
5. **One `brand` button per page.** Enforced by code review + lint warning.

## Pre-generation protocol

Before producing UI code:

1. Confirm `DESIGN.md` and `COMPONENTS.md` are loaded.
2. Identify which existing components (`COMPONENTS.md`) satisfy the request.
3. If a request requires a component not in the catalog, STOP and ask the user
   whether to extend the catalog or substitute.

## Post-generation verification

After producing UI code:

1. Run `npm run ds:lint`. Must exit 0.
2. Run `npx @google/design.md lint DESIGN.md`. Must report 0 errors.
3. Visually verify in dev server (`npm run dev`) — light + dark mode.
```

---

## 7. `scripts/lint-tokens.mjs` — drift checker

Node.js ESM script. Detects three classes of drift:

```js
// scripts/lint-tokens.mjs (high-level shape)
//
// 1. Walks app/, components/, content/ for *.tsx, *.ts, *.mdx files.
// 2. For each file, runs regex checks:
//    - Raw hex: /#[0-9a-fA-F]{3,8}\b/  (excluding inside .md/.mdx code fences)
//    - Arbitrary brackets for spacing/sizing/radius:
//        /(?:px|py|pt|pb|pl|pr|p|gap|m[xytblr]?|w|h|rounded)-\[\d+(?:px|rem|em)\]/
//    - <button|<input|<a (raw, not via Button/Tag/Link import)
// 3. Cross-checks DESIGN.md `colors:` and `modes.dark:` against globals.css
//    `:root` and `.dark` blocks — every token defined in DESIGN.md must exist
//    in globals.css, and vice versa.
// 4. Cross-checks DESIGN.md `components:` references — every `{colors.foo}` must
//    resolve to a defined token. (This is also what @google/design.md lint does,
//    so we delegate that check.)
// 5. Exits 1 on any error, 0 on clean.
//
// Output format: JSON to stdout, human-readable to stderr.
```

### 7.1 `package.json` scripts

```json
{
  "scripts": {
    "ds:lint": "node scripts/lint-tokens.mjs && npx @google/design.md lint DESIGN.md",
    "ds:check": "npm run ds:lint && npm run lint && npm run typecheck"
  }
}
```

### 7.2 GitHub Actions CI

`.github/workflows/ds-lint.yml`:

```yaml
name: design-system-lint
on: [pull_request, push]
jobs:
  ds-lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '24' }
      - run: npm ci
      - run: npm run ds:lint
```

---

## 8. Migration plan (sequential, with checkpoints)

Implementation will go through a separate plan (via `superpowers:writing-plans`). High-level order:

1. **Archive** — Move `docs/DESIGN_SYSTEM.md` → `docs/archive/2026-05-25-design-system-original.md`. Single git commit.
2. **DESIGN.md** — Write the new file at repo root following §4 structure. Run `npx @google/design.md lint DESIGN.md` — must exit 0. Manual diff against `globals.css` to ensure parity.
3. **COMPONENTS.md** — Write following §5. Cross-reference against actual `components/` directory.
4. **AGENTS.md** — Append §6 content, preserve the existing "NOT the Next.js you know" warning.
5. **`scripts/lint-tokens.mjs`** — Implement per §7. Add `ds:lint` and `ds:check` scripts to `package.json`. Run locally — must exit 0.
6. **GitHub Actions** — Add `.github/workflows/ds-lint.yml`. Push to a feature branch, confirm green.
7. **Final verification** — Open a PR with all changes. Confirm CI green. Manual smoke test of the dev server (light + dark mode, all main pages).

Each step is a separate commit. Conventional commit messages (`chore:`, `docs:`, `feat:`).

---

## 9. Verification protocol (definition of done)

This migration is complete when **all** of the following are true:

- [ ] `DESIGN.md` exists at repo root, is < 450 lines, and `npx @google/design.md lint DESIGN.md` reports 0 errors.
- [ ] `COMPONENTS.md` exists at repo root, lists every component in `components/`.
- [ ] `AGENTS.md` includes the design-system protocol and anti-drift rules from §6.
- [ ] `docs/DESIGN_SYSTEM.md` is removed; `docs/archive/2026-05-25-design-system-original.md` exists with the original content unchanged.
- [ ] `npm run ds:lint` exits 0 on the main branch.
- [ ] `npm run ds:check` exits 0 (ds:lint + typecheck + Next lint).
- [ ] CI workflow `design-system-lint` passes green on the merge PR.
- [ ] Manual smoke test: every main page (`/`, `/about`, every case study) renders identically before/after in light AND dark mode (visual diff acceptable: pixel-identical).
- [ ] No raw hex codes, arbitrary brackets, or inline HTML elements remain in `app/`, `components/`, or `content/` (other than inside markdown code fences / docs).

---

## 10. Risks and mitigations

| Risk | Likelihood | Mitigation |
|---|---|---|
| `modes.dark` custom YAML extension becomes invalid if Google adds a conflicting `modes` key to the spec | Low | We control the consumer (`lint-tokens.mjs`); easy to rename if conflict arises. Spec is in `alpha`. |
| `DESIGN.md` and `globals.css` drift over time | Medium | `lint-tokens.mjs` cross-checks parity at every CI run. |
| `COMPONENTS.md` becomes stale as new components are added | High | Adding to the catalog is a step in the component-creation protocol in AGENTS.md. Reviewed in PR. |
| Performance / context cost of agents loading three files | Low | Three files together are ~700 lines (~10k tokens) — significantly less than the current 808-line French spec alone. |
| The 18 audit decisions in current Annex A get lost | Low | The original spec is archived, not deleted. Any future decision that conflicts with an archived one is documented in `DESIGN.md` itself (as prose in the Do's and Don'ts section or in a `## Decisions Log` custom section if it grows). |

---

## 11. Open questions deferred

These were raised in brainstorming but explicitly deferred:

- **Tailwind v4 generator from `DESIGN.md`** — would automate the `globals.css` ↔ `DESIGN.md` parity check. Useful if the manual alignment cost grows. Not built now.
- **Lyse-style Plan → Ship → Analyze framework adoption** — separate initiative after this migration ships.
- **Specs convention** (`docs/superpowers/specs/` vs `.claude/specs/`) — staying with `docs/superpowers/specs/` until we revisit.
- **`COMPONENTS.md` vs per-component README files** — staying with a single catalog file; will split if it grows past ~400 lines.

---

*End of spec.*
