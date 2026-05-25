# Design System Migration v2 — DESIGN.md + AGENTS.md + Lint Action

**Date:** 2026-05-25
**Status:** Spec (pre-implementation)
**Author:** Jonathan Schummers (with Claude, post-audit)
**Supersedes:** `2026-05-25-design-md-migration-design.md` (v1, archived as input to the audit)

---

## 1. Context

The portfolio's design system lives across three uncoordinated places today:

- **`docs/DESIGN_SYSTEM.md`** — 808 lines of French prose, the human-readable reference, with 18 audit decisions in Annex A (May 2026).
- **`app/globals.css`** — 312 lines of Tailwind v4 CSS variables (`--sem-*`) + `@theme inline` registration. The operational source the running app reads.
- **`components/`** — Custom primitives (`button.tsx`, `tag.tsx`, frames) and case-study blocks (`case-study-*.tsx`). No catalog.

This works for a solo human author but leaves agents two known gaps:
- Agents that read the project have no canonical, machine-readable token contract.
- The 808-line French spec burns ~12k tokens of context per session.
- Agents drift toward `text-[#18181b]` or `px-[24px]` because nothing surfaces a violation.

The Google **DESIGN.md** format ([open-sourced 21–23 April 2026](https://github.com/google-labs-code/design.md), alpha) is the emerging AI-agent convention. Adoption is real but young (~1 month). Public examples in `awesome-design-md` are **scraped snapshots**, not files actually committed by Stripe/Linear/Vercel — the convention is not yet an industry standard.

This migration is a **forward bet** on the convention, scaled to a solo portfolio. It explicitly:

- Treats `app/globals.css` as the operational source of truth (DESIGN.md is a declarative reflection, not a generator input).
- Keeps the format Google-Stitch-compatible but relaxes strict conformance (we accept linter warnings on custom sections).
- Refuses to invent a `modes.dark` YAML extension (light mode is documented in YAML; dark mode lives in CSS).
- Drops the `--sem-` prefix on CSS variables to align with Linear-style role-based naming.

This is the v2 of a previously brainstormed spec ([v1 archived](2026-05-25-design-md-migration-design.md)) that an independent audit and a deep research pass tightened on five points: file count, size target, naming, dark-mode encoding, and CI strictness.

---

## 2. Goals & non-goals

### Goals

- **Single canonical machine-readable artifact for agents** (`DESIGN.md` at repo root) — Google Stitch-compatible, ~200–300 lines, English.
- **Anti-drift signal in CI** — a script catches raw hex codes and arbitrary Tailwind brackets in `app/`, `components/`, `content/`. Warning only, never blocks PRs.
- **Code remains source of truth.** `app/globals.css` is operational; DESIGN.md is updated ponctually (per audit, per PR that touches tokens). Drift is an accepted, audited cost.
- **No mode-encoding extension** to the alpha Google spec. Dark mode lives in `globals.css` only.
- **Preserved history.** The current 808-line French spec is archived to `docs/archive/`, not deleted. Annex A's 18 decisions remain consultable.
- **Naming refactor** — drop the `--sem-` prefix on CSS variables (find/replace; utility class names unchanged).

### Non-goals

- **No `COMPONENTS.md`.** AGENTS.md instructs agents to read existing `.tsx` files for component APIs. JSDoc + types are enough for ~30 components.
- **No automated Tailwind generator** from DESIGN.md. We use Option A (manual sync); the CLI `@google/design.md export` may be reconsidered later if the format stabilizes.
- **No `@google/design.md` CLI in CI.** Alpha tool, friction risks. The lint is our own script.
- **No DTCG/Style Dictionary integration.** Premature for a solo portfolio.
- **No Storybook or visual catalog.** The portfolio is the showcase.
- **No pre-commit hook.** Pull-request CI is enough.
- **No migration of component code.** Components keep their current API; only docs, CSS variable names, and lint config change.
- **No re-evaluation date.** We revisit when an external trigger appears (Google v1.0, Anthropic skills consume DESIGN.md, etc.).

---

## 3. Architecture

### 3.1 File layout

```
~/Documents/jonathan/
├── AGENTS.md                                       [enriched, ~40 lines]
├── DESIGN.md                                       [new, ~230 lines, root, English]
├── app/
│   └── globals.css                                 [refactored — drops --sem- prefix; structurally unchanged]
├── components/                                     [unchanged]
├── scripts/
│   └── check-design.mjs                            [new, ~50 lines]
├── package.json                                    [+ "ds:check" npm script]
├── .github/workflows/
│   └── ds-check.yml                                [new — warning-only, not in branch protection]
└── docs/
    ├── DESIGN_SYSTEM.md                            [removed]
    ├── archive/
    │   └── 2026-05-25-design-system-original.md    [moved, untouched]
    └── superpowers/specs/
        ├── 2026-05-25-design-md-migration-design.md   [v1, kept as audit input]
        └── 2026-05-25-design-md-migration-v2.md       [this file]
```

### 3.2 Source-of-truth hierarchy

| Layer | File | Role | Update cadence |
|---|---|---|---|
| 1 (truth) | `app/globals.css` | The CSS the browser actually reads | Each PR that touches tokens |
| 2 (reflection) | `DESIGN.md` | Declarative description for agents and humans | Ponctually, per audit or per token-PR |
| 3 (archive) | `docs/archive/2026-05-25-design-system-original.md` | Historical reference, decisions log | Frozen |
| Behaviour | `AGENTS.md` | Anti-drift rules + read-protocol | Rare |
| Check | `scripts/check-design.mjs` | Catches drift in agent-generated code | Rare |

---

## 4. `DESIGN.md` — structure and content

Target: **~230 lines**. English. At repo root. Google Stitch-compatible but relaxed (we accept linter warnings on the `Motion` and `Dark Mode` sections since they extend the spec).

### 4.1 Section order

1. **YAML frontmatter** (~85 lines) — machine-readable tokens
2. **Overview** (~25 lines) — brand voice, design principles
3. **Colors** (~25 lines) — palette description + role explanations
4. **Typography** (~30 lines) — hierarchy table + responsive notes
5. **Layout** (~20 lines) — blueprint + case-study grid
6. **Shapes** (~10 lines) — radius scale
7. **Components** (~30 lines) — Button + Tag + Link rules
8. **Dark Mode** (~15 lines) — prose pointing to `globals.css .dark { }`
9. **Motion** (~10 lines) — durations + easing
10. **Do's and Don'ts** (~20 lines) — hard rules for agents

### 4.2 YAML frontmatter — token schema

```yaml
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
  bg: "#fafafa"
  surface: "#f4f4f5"
  border: "#e4e4e7"
  border-strong: "#d4d4d8"
  invert-bg: "#18181b"
  invert-fg: "#fafafa"

  # Text
  text-primary: "#18181b"
  text-secondary: "#71717b"
  text-tertiary: "#9f9fa9"

  # Brand accent
  accent: "#0A4CF0"
  accent-hover: "#0839b8"
  accent-text: "#0A4CF0"
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
  xs:  8px
  sm:  16px
  md:  24px
  lg:  32px
  xl:  48px
  2xl: 64px
  xl2: 72px        # featured cards (9 × 8)
  3xl: 96px
  4xl: 128px

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
```

### 4.3 Prose conventions inside `DESIGN.md`

- Every token reference uses `{colors.foo}` / `{typography.bar}` syntax.
- Component sub-sections describe **rules, not state machines** — variants are separate `components.*` entries in the YAML.
- The Do's and Don'ts section enforces:
  - Use tokens, not raw hex.
  - Compose with `cn()`. No arbitrary `text-[#xxx]` brackets.
  - Use the `hover-supported:` variant. Never plain `hover:` for mobile-touchable surfaces.
  - One brand button per page max.
  - No shadow for layout structure (mockup frames are the only exception).

### 4.4 Dark Mode section (canonical text)

```markdown
## Dark Mode

The system has full dark-mode parity. The dark theme is activated by the `dark`
class on `<html>` (Tailwind v4 standard) and respects `prefers-color-scheme:
dark` as the default. A user toggle persists to `localStorage.theme`.

**Source of truth.** The light values live in this file's YAML frontmatter; the
dark values live in `app/globals.css` under the `.dark { ... }` block. The light
mode is the privileged design — dark is a deliberate overlay, not a
mirror-image.

**Mode-neutral tokens.** All spacing, rounded, motion, layout, and accent base
tokens (`accent`, `accent-hover`, `accent-muted`, `accent-subtle`) are the same
in both modes. Only the surfaces, text colors, borders, button-primary palette,
disabled palette, and `accent-text` swap.

**No `modes:` YAML extension.** We deliberately do not encode dark mode in this
file's frontmatter. Inventing a custom YAML extension on an alpha spec would
risk a collision when Google ships an official mode mechanism.
```

### 4.5 Motion section (canonical text)

```markdown
## Motion

The portfolio uses three duration tokens and a single easing curve. We
deliberately do not adopt the Material 3 emphasized curves — the portfolio
animates simple state changes (hover, active, image fade), not entering/leaving
surfaces, so a single ease-out is sufficient.

- `duration-fast` (150ms) — color and background hovers
- `duration-base` (300ms) — background transitions, image grayscale → color
- `duration-slow` (400ms) — hero/featured animations
- `ease-default` (ease-out) — used for all of the above

The `hover-supported:` custom variant gates every `:hover` rule behind
`@media (hover: hover)` so taps on touch surfaces never trigger a hover state.

The `prefers-reduced-motion: reduce` query neutralises all transitions and
animations globally in `globals.css`.
```

---

## 5. `AGENTS.md` — enriched content

Target: ~40 lines. The current AGENTS.md (one warning line) is preserved at the top.

```markdown
<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may
all differ from your training data. Read the relevant guide in
`node_modules/next/dist/docs/` before writing any code. Heed deprecation
notices.
<!-- END:nextjs-agent-rules -->

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

---

## 6. CSS naming refactor — drop the `--sem-` prefix

Today: `--sem-text-primary`, `--sem-bg`, `--sem-surface`, …
After: `--text-primary`, `--bg`, `--surface`, …

The bridge in `@theme inline { ... }` is unchanged in mapping but updated to
reference the new variable names:

```css
@theme inline {
  --color-bg: var(--bg);
  --color-text-primary: var(--text-primary);
  /* ... */
}
```

The Tailwind utility class names **do not change** (`bg-bg`, `text-text-primary`,
`border-border`, etc.). No `.tsx` component touches its className strings.

Refactor procedure:
1. `app/globals.css` — find `--sem-` and replace with empty string. Verify the
   `:root`, `.dark`, `@media (prefers-color-scheme: dark)`, and `@theme inline`
   blocks all resolve correctly.
2. Add `--blueprint-max: 1400px` token to `:root` and the matching
   `--width-blueprint: var(--blueprint-max)` entry in `@theme inline`, so
   `max-w-[1400px]` inline usages can later become `max-w-blueprint`. (Replacing
   the inline usages is out of scope for this migration; the token addition is
   the prerequisite.)
3. Visually smoke-test light + dark mode on every main page (`/`, `/about`,
   `/work`, every case study).
4. Update any internal CSS reference in `globals.css` itself (e.g.
   `body { color: var(--sem-fg) }` → `body { color: var(--fg) }`).

Estimated time: **30 minutes** including visual checks.

---

## 7. `scripts/check-design.mjs` — anti-drift script

Node.js ESM, ~50 lines.

```js
// scripts/check-design.mjs (high-level shape)
//
// 1. Walks app/, components/, content/ recursively for *.tsx, *.ts, *.mdx.
// 2. For each file, runs two regex checks:
//    - Raw hex (excluding strings inside markdown code fences):
//        /(?<!`)#[0-9a-fA-F]{3,8}\b(?!`)/g
//    - Arbitrary brackets for spacing/sizing/radius:
//        /(?:px|py|pt|pb|pl|pr|p|gap|m[xytblr]?|w|h|rounded)-\[\d+(?:px|rem|em)\]/g
// 3. Collects { file, line, column, kind, match } entries.
// 4. Prints human-readable findings to stdout:
//        app/page.tsx:42  raw-hex          #18181b
//        components/foo.tsx:17  arbitrary-bracket  px-[24px]
// 5. Exits 0 if no findings; exits 1 if any finding (so the CI check turns red).
//
// The CI workflow does NOT block merges (no branch protection rule on this check).
```

### 7.1 `package.json` script

```json
{
  "scripts": {
    "ds:check": "node scripts/check-design.mjs"
  }
}
```

### 7.2 GitHub Actions workflow

`.github/workflows/ds-check.yml`:

```yaml
name: design-check
on: [pull_request, push]
jobs:
  ds-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '24' }
      - run: node scripts/check-design.mjs
```

The check is **never added to a branch protection rule**, so a failing run
shows a red check on the PR but does not block the merge. This is the
"indicative, visible, non-blocking" stance.

---

## 8. Migration plan (sequential, 7 commits)

Implementation will be planned via `superpowers:writing-plans`. High-level
order:

1. **`chore(docs): archive original design system spec`** — Move
   `docs/DESIGN_SYSTEM.md` to `docs/archive/2026-05-25-design-system-original.md`.
   Single file move, zero content edit.
2. **`refactor(css): drop --sem- prefix from CSS tokens`** — Find/replace in
   `app/globals.css`. Visual smoke test light + dark on `/`, `/about`, every
   case study. Update any internal `var(--sem-fg)` references.
3. **`docs: add DESIGN.md at repo root`** — Write the new file per §4. Validate
   YAML loads with a Node `js-yaml` parse (manual sanity check, not a CI step).
4. **`docs: enrich AGENTS.md with design system protocol`** — Append §5
   content. Preserve the existing `nextjs-agent-rules` block.
5. **`chore: add ds:check script`** — Implement `scripts/check-design.mjs` per
   §7, add the npm script. Run locally — fix any false positives by tightening
   the regexes if needed.
6. **`ci: add design-check workflow`** — Add `.github/workflows/ds-check.yml`.
   Push to a feature branch, confirm the workflow runs.
7. **Final smoke test + PR merge** — Manual visual check on every main page,
   light + dark. Merge to `main`. Confirm CI runs cleanly on main.

Each step is a separate commit, conventional commit message.

Estimated total time: **2 days** (down from 4–6 days in v1).

---

## 9. Verification protocol (definition of done)

This migration is complete when **all** of the following are true:

- [ ] `DESIGN.md` exists at repo root, between 200 and 300 lines, parses as
      valid YAML (frontmatter), reads correctly as markdown.
- [ ] `AGENTS.md` includes the design system protocol + anti-drift rules from
      §5; the original `nextjs-agent-rules` warning block is preserved.
- [ ] `docs/DESIGN_SYSTEM.md` no longer exists;
      `docs/archive/2026-05-25-design-system-original.md` contains the
      original content unchanged.
- [ ] All `--sem-*` references in `app/globals.css` are renamed; no `--sem-`
      remains anywhere in the codebase (`grep -r "\-\-sem\-"` returns empty,
      excluding `docs/archive/`).
- [ ] `app/globals.css` still renders identically in light + dark on `/`,
      `/about`, `/work`, and every case study (manual visual check).
- [ ] `npm run ds:check` runs and reports any findings without crashing.
- [ ] The `design-check` GitHub Action runs on the migration PR (red or green,
      either is fine — it's informational).
- [ ] No raw hex or arbitrary brackets remain in `app/`, `components/`, or
      `content/` (other than inside markdown code fences in documentation
      files).

---

## 10. Risks and mitigations

| Risk | Likelihood | Mitigation |
|---|---|---|
| Google changes or abandons the DESIGN.md format | Medium | Code (`globals.css`) remains source of truth. DESIGN.md is jetable. Migration cost in worst case: ~1 day to convert YAML to whatever replaces it. |
| `scripts/check-design.mjs` regex generates false positives | Medium | The script is warning-only and not blocking. We tighten regexes as needed. Acceptable noise. |
| `DESIGN.md` and `globals.css` drift over time | High | This is **accepted by design**. We treat DESIGN.md as a declarative reflection updated ponctually. Drift is surfaced at the next token-touching PR. |
| Renaming `--sem-*` breaks something | Low | Step 2 is a single commit on a feature branch, visually tested before merge. The find/replace is mechanical; if anything breaks, we revert. |
| New components are added without updating DESIGN.md's `components:` YAML | Medium | AGENTS.md instructs agents to read existing components, not the YAML. The YAML is a documentation aid, not a contract. |
| Visual signal value to clients is exaggerated | High (already accepted) | This migration is a forward bet on the convention + a personal tooling improvement, not a marketing differentiator. Budget capped at 2 days. |

---

## 11. Open questions / deferred

- **Tailwind v4 generator from DESIGN.md** (`npx @google/design.md export
  --format css-tailwind`). Not adopted today because (a) the format is alpha,
  (b) only ~60% of tokens are covered (dark mode, custom variants,
  responsive media queries stay manual), (c) workflow cost exceeds the parity
  benefit. Revisit if Google ships v1.0 or if `globals.css` ↔ DESIGN.md drift
  starts costing real time.
- **`@google/design.md` CLI** (`lint`, `diff`). Not adopted today because the
  CLI is alpha and the `lint` value is marginal for our relaxed-conformance
  posture. Try locally once after writing DESIGN.md to see what it complains
  about; ignore the report.
- **shadcn/ui adoption.** We're not on shadcn today and have no plan to
  migrate. If a client project demands it, the Linear-style naming we adopt
  here is the closest neighbour — moving to shadcn would still require a real
  refactor.
- **Lyse-style Plan → Ship → Analyze framework.** Out of scope.

---

*End of spec.*
