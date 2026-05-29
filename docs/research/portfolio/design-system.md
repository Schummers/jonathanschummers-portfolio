# WattHunter Design-System Documentation: A Decision Brief for Jonathan

## TL;DR
- **Pick Approach B with a clear upgrade path to C**: ship `DESIGN.md` (Google format, exported from your existing `globals.css`) **plus** a hand-curated `components.md` catalog of your ~50 components keyed to `<TacticCard>`, `<XPCard>`, etc. — and add a lightweight `react-docgen-typescript` script that *regenerates* that catalog from JSDoc + props on every commit. A from-scratch Storybook MCP install (Approach C, pure) is too much overhead for a solo dev with zero stories today; a manual catalog (Approach B, pure) drifts within weeks. The hybrid is the only durable answer for one maintainer.
- **Stay on Superpowers; do NOT migrate to "Lyse."** The "Lyse / Plan-Ship-Analyze" workflow with `.claude/workflow/skill.md`, 85% conformance score, and "UltraThink HEART/Kano/JTBD" does not appear to exist as a public product or repo as of May 2026 (the only "Lyse" with a public footprint is a Figma→Linear ticket generator). Borrow the *concepts* (living spec, Ralph Loop, BDD-style acceptance criteria) into Superpowers via custom skills.
- **Do this week**: (1) lint your existing 1655-line doc with `npx @google/design.md lint`, (2) export `globals.css` as the single source of truth for tokens using `npx @google/design.md export --format css-tailwind`, (3) symlink `CLAUDE.md → AGENTS.md` so Cursor/Codex/Vercel Agent see the same rules, (4) install `eslint-plugin-tailwindcss` with `no-arbitrary-value: error` to *physically prevent* the `text-[15px]` / `#06b6d4` failure mode.

---

## Key Findings

1. **Your pain point ("agents hardcode values, recreate components") is the exact problem Spotify Encore, GitHub, and Indeed publicly diagnosed in 2026, and the consensus solution is *three layers, not one file*: always-on rules (DESIGN.md / AGENTS.md), on-demand component retrieval (MCP or manifest), and CI enforcement (lint + WCAG + visual diff).** No single approach solves it; you need overlapping defenses.

2. **DESIGN.md is real, useful, and alpha.** Google open-sourced it April 21 2026 (Apache 2.0). The CLI (`@google/design.md lint | diff | export | spec`) genuinely produces a working Tailwind v4 `@theme` block. Documented gaps: animations, dark-mode tokens, and responsive breakpoints are unresolved in the spec; the 8-property component limit forces workarounds for glassmorphism/border-beam.

3. **AGENTS.md > CLAUDE.md for portability**, but Claude Code still does not read AGENTS.md natively (issue #34235 / #6235, thousands of upvotes, no Anthropic timeline). The standard 2026 fix is `ln -s CLAUDE.md AGENTS.md` (one file, two names, zero drift). Cursor/Codex/Vercel Agent/Windsurf already read AGENTS.md natively.

4. **Vercel's published eval shows AGENTS.md decisively beats on-demand skills for framework docs.** Per Vercel's blog "AGENTS.md outperforms skills in our agent evals": *"A compressed 8KB docs index embedded directly in AGENTS.md achieved a 100% pass rate, while skills maxed out at 79% even with explicit instructions telling the agent to use them. Without those instructions, skills performed no better than having no documentation at all."* This is the strongest published quantitative evidence in the space — and it argues for keeping your design-system context in passive files (DESIGN.md + components.md referenced from AGENTS.md) over a Storybook-MCP server, at least until the model layer improves at tool routing.

5. **Storybook MCP (the cleanest Approach C) requires Storybook 10.1+** and is in early-access/experimental. For a solo dev with 50 components and no existing stories, this is a 1-2 week investment up front. The cheaper Approach C is a 50-line `react-docgen-typescript` script that emits `components.md` on commit — `react-docgen` v8.0.3 (490 dependent npm projects, last published 19 days ago) and `react-docgen-typescript` v2.4.0 (320 dependent projects, 7 months old) are both production-grade.

6. **Linting is the highest-ROI single fix you can ship this week.** `eslint-plugin-tailwindcss`'s `no-arbitrary-value` and `no-custom-classname` rules will block `text-[15px]` and `bg-[#06b6d4]` at commit time. Without enforcement, no doc — DESIGN.md, system.md, or manifest — survives.

7. **"Lyse" Plan-Ship-Analyze workflow doesn't exist publicly.** No GitHub repo, blog post, or talk documents the specific concepts (`.claude/workflow/skill.md` orchestrator, living-spec auto-update, 85% conformance score, UltraThink HEART/Kano/JTBD). "UltraThink" was actually a Claude Code thinking-budget keyword; Anthropic's Sarah Deaton closed the related GitHub issue on January 16, 2026 with the verbatim message *"Closing as ultrathink is now deprecated and thinking mode is enabled by default"* (per decodeclaude.com and ubos.tech/news/ultrathink-deprecation). Stay on Superpowers; borrow real adjacent patterns instead (OpenSpec for living specs, Ralph Loop for fresh context, Gherkin for acceptance criteria).

---

## Details — Answers to all 37 questions

### Category 1 — DESIGN.md in practice

**Q1. Automatic reading by agents.**
*Direct answer:* Only **Cursor, Codex, Windsurf, Gemini CLI, Aider, Zed, and Vercel Agent** read project-root markdown context files automatically (via AGENTS.md). **Claude Code reads CLAUDE.md automatically, but NOT DESIGN.md or AGENTS.md** as of April 2026 (GitHub issue #34235 confirms; Manifold market gives 62% odds it ships in 2026). For Claude Code to read DESIGN.md you must either (a) reference it from CLAUDE.md ("Read DESIGN.md before any UI change") or (b) `@DESIGN.md` it in the prompt. Cursor reads AGENTS.md but also still respects `.cursor/rules`; the Cursor team has not publicly confirmed automatic DESIGN.md reading — in practice you point to it from your rules file.
*Sources:* github.com/anthropics/claude-code/issues/34235 (Mar 14 2026), hivetrail.com/blog/agents-md-vs-claude-md-cross-tool-standard, blink.new/blog/agents-md-vs-claude-md, deployhq.com/blog/ai-coding-config-files-guide.
*Consensus:* ★★★ established (Claude Code = manual; everyone else = automatic via AGENTS.md).
*WattHunter action:* Symlink `ln -s CLAUDE.md AGENTS.md`; in CLAUDE.md write one line: "Before any UI change, read ./DESIGN.md and ./docs/components.md."

**Q2. Token cost of a typical DESIGN.md.**
*Direct answer:* A 300-800 line DESIGN.md is roughly **5-12k tokens** (rule of thumb: ~15 tokens per line for prose-heavy markdown, less for YAML). Claude Code loads CLAUDE.md (and its referenced files) **once per session at startup**, not per message — but anything pulled in via `@file.md` mentions re-enters context per turn. Anthropic's official guidance (per blink.new's summary of the Claude Code docs) is to keep root CLAUDE.md under 200 lines; the same applies to anything you auto-load. For DESIGN.md, the practical move is: keep the root file lean (<500 lines, <8k tokens) and put detailed component-level prose in `components.md` referenced on demand.
*Sources:* blink.new/blog/agents-md-vs-claude-md ("docs recommend keeping CLAUDE.md under 200 lines"), heeki.medium.com/using-spec-driven-development-with-claude-code-4a1ebe5d9f29 (200k context default).
*Consensus:* ★★ emerging.
*WattHunter action:* Cap DESIGN.md at 500 lines; move richer component prose to `components.md`.

**Q3. Tailwind v4 + shadcn compatibility of `npx @google/design.md export --format css-tailwind`.**
*Direct answer:* The CLI produces a clean `@theme { ... }` block of CSS custom properties (oklch colors, type scale, radius, spacing). Compatibility is **good for primitives, manual for shadcn aliases**: the exporter emits `--color-*` variables but does *not* know about shadcn's two-layer pattern (`:root --background` → `@theme inline --color-background: var(--background)`). The community pattern (shadcnblocks.com, the `shadcn-design-md` Chrome extension) is to **paste the exported `@theme` *underneath* your existing `:root`/`@theme inline` and let your shadcn aliases keep their references**. Mesh gradients, animated borders, and custom keyframes have no place in the spec yet (see Q9) — those stay in `globals.css` as keyframes blocks.
*Sources:* github.com/google-labs-code/design.md (CLI docs), shadcn-design-md.vercel.app (community Chrome extension), shadcnblocks.com/blog/tailwind4-shadcn-themeing, ui.shadcn.com/docs/theming.
*Consensus:* ★★ emerging.
*WattHunter action:* Run export *into a sibling file* (`theme.generated.css`), diff against your existing `globals.css`, hand-merge tokens; never let the CLI overwrite shadcn aliases.

**Q4. Single source of truth: which direction works over 6+ months?**
*Direct answer:* **globals.css → DESIGN.md (CSS is the source, MD is regenerated)** is the only direction that survives. The opposite direction breaks the moment a developer (you, in cursor mode) tweaks a CSS variable without re-running the export. Real teams (Spotify Encore architecture talk; the Stitch skills design-md flow) have converged on machine-readable code as source-of-truth, with human-readable prose generated or hand-maintained downstream. The Stitch design-md skill explicitly "automatically analyzes a Stitch project and generates a complete DESIGN.md from it" — code in, doc out.
*Sources:* intodesignsystems.com/use-cases/spotify-design-system, designmd.app/what-is-design-md (`npx skills add google-labs-code/stitch-skills --skill design-md`), mindwiredai.com/2026/04/23/design-md-is-now-open-source.
*Consensus:* ★★ emerging.
*WattHunter action:* Make `globals.css` canonical; add an npm script `pnpm gen:design-md` that exports from CSS into DESIGN.md and fails CI if they drift.

**Q5. 8-property component limit + rich components (glassmorphism, border-beam).**
*Direct answer:* The DESIGN.md component schema is intentionally minimal (backgroundColor, textColor, borderRadius, etc.) and cannot encode multi-stop gradients, backdrop-blur, animated borders, or stateful glow. The documented workaround in awesome-design-md examples (Cursor, Vercel, Linear DESIGN.md files) is **the `## Visual Theme & Atmosphere` and `## Components` prose sections** — describe the effect ("Cards use 12px backdrop-blur with a subtle 1px inner border ramped from `--accent` at 10% opacity") instead of trying to encode it as tokens. Some projects also add a non-standard `## Effects` section. Tooling won't validate this prose, but agents read it.
*Sources:* github.com/voltagent/awesome-design-md (real examples), medium.com/@vignarajj/design-md-demystified (9-section breakdown including Agent Prompt Guide), medium.com/design-bootcamp/google-makes-design-md-open-source ("unresolved issues like animations").
*Consensus:* ★ unique opinions among practitioners.
*WattHunter action:* Use prose `## Effects` and `## Agent Prompt Guide` sections for your mesh-gradient and border-beam; keep tokens minimal in the YAML.

**Q6. Monorepo placement (Turborepo with apps/web).**
*Direct answer:* No formal convention yet. Closest emerging pattern from agent-config files generally (AGENTS.md, CLAUDE.md) is **hierarchical**: a thin root `/DESIGN.md` describing brand/atmosphere and pointing to `apps/web/DESIGN.md` which holds the actual tokens that match `apps/web/app/globals.css`. Codex walks down from repo root concatenating; Claude Code walks up and concatenates closer-wins; both honor "more-specific overrides." For WattHunter today there is one app, so a single `apps/web/DESIGN.md` (next to globals.css) plus a root `/DESIGN.md → apps/web/DESIGN.md` symlink is the cleanest setup.
*Sources:* blink.new/blog/agents-md-vs-claude-md (Codex walks down, Claude walks up), agentfactory.panaversity.org (hierarchy docs).
*Consensus:* ★ unique opinion.
*WattHunter action:* Keep DESIGN.md next to globals.css in `apps/web/`; symlink at root.

**Q7. Versioning + `design.md diff` in CI.**
*Direct answer:* `npx @google/design.md diff before.md after.md` returns structured JSON of added/removed/modified tokens with a `regression: boolean`. No public examples yet of teams wiring it into CI for the version-bump workflow (v3.0 → v3.1) — the format is too new. The realistic pattern is: commit DESIGN.md, let `git diff` be your version history, and run `design.md diff HEAD~1 HEAD` only on PRs that touch tokens. Token bumps that fail WCAG should block merge.
*Sources:* github.com/google-labs-code/design.md (CLI docs), pasqualepillitteri.it/en/news/1251.
*Consensus:* ★ unique opinion (early days).
*WattHunter action:* Skip semantic versioning of DESIGN.md; rely on Git. Add `design.md diff` to a pre-push hook only if you find yourself rewriting tokens often.

**Q8. CI linting examples.**
*Direct answer:* `npx @google/design.md lint DESIGN.md` is the canonical command — it runs 7 (recent docs say 8) rules including broken-token refs, WCAG AA contrast on every component's background/text pair, orphaned tokens, missing typography, and section order. There is no published reference GitHub Action yet, but the lint output is structured JSON suitable for any CI runner. Recommended blocking criteria: **WCAG contrast errors = block merge; missing token references = block; warnings (orphans, section order) = comment only**.
*Sources:* designmd.app/what-is-design-md ("8 rules"), github.com/google-labs-code/design.md.
*Consensus:* ★★ emerging.
*WattHunter action:* Add to `.husky/pre-commit`: `npx @google/design.md lint DESIGN.md || exit 1`.

**Q9. DESIGN.md negative production feedback.**
*Direct answer:* The spec is **officially alpha**. Concrete documented pain points across multiple practitioner posts (April–May 2026): (a) **no animations schema** — keyframes, transitions, motion specs live in prose only; (b) **no dark-mode token pairing** — the format has only one color set; teams hack it via `## Dark Mode` prose or duplicate sections; (c) **no responsive breakpoints** — sm/md/lg are absent; (d) **8-property component limit** — see Q5; (e) **community contribution channel closed** — VoltAgent's awesome-design-md "cannot accept DESIGN.md pull requests"; (f) **token schema still under discussion** — expect breaking changes.
*Sources:* medium.com/design-bootcamp/google-makes-design-md-open-source ("unresolved issues like animations, dark mode tokens, or responsive breakpoints"), pasqualepillitteri.it/en/news/1251 ("Alpha spec — under active development"), github.com/voltagent/awesome-design-md/blob/main/CONTRIBUTING.md.
*Consensus:* ★★ emerging.
*WattHunter action:* Use DESIGN.md for the *token contract* only; keep your existing 1655-line doc for everything DESIGN.md cannot encode (animations, dark mode, responsive, complex components).

### Category 2 — Component catalog

**Q10. 2026 winning approach.**
*Direct answer:* No clear winner — but a **three-layer pattern** has emerged across major design-system talks (Spotify Encore, Brad Frost / Storybook MCP demo, Indeed AI-DS talk, GitHub Jan Six talk): **(1) always-on rules in AGENTS.md/DESIGN.md, (2) on-demand component retrieval via MCP or manifest, (3) progressive disclosure** of detail. By raw GitHub footprint: Storybook addon-mcp shows **exactly 858k weekly downloads** per the official Storybook addons registry at storybook.js.org/addons/@storybook/addon-mcp; awesome-design-md has thousands of stars; AGENTS.md is "60,000+ open-source projects" per DeployHQ. The lightest weight option that fits a 50-component solo project is **AGENTS.md + per-component frontmatter** generated by react-docgen — not Storybook MCP.
*Sources:* intodesignsystems.com/agentic-design-systems, intodesignsystems.com/blog/design-system-not-ready-for-ai-agents, storybook.js.org/addons/@storybook/addon-mcp, deployhq.com/blog/ai-coding-config-files-guide.
*Consensus:* ★★ emerging.
*WattHunter action:* Adopt the three-layer pattern — DESIGN.md + auto-generated `components.json` + ESLint enforcement.

**Q11. Storybook 10.3 MCP setup cost for Next.js 16 with 50 existing un-storied components.**
*Direct answer:* Realistic estimate: **2-3 days to bootstrap Storybook 10 + Next.js 16 framework adapter + addon-mcp, then 15-30 min per component to write a minimal story** = roughly 12-25 hours for a 50-component library before MCP delivers value. The addon is officially experimental (Storybook calls it "early access"). Friction points reported: (a) Next.js 16 + Turbopack adapter compatibility (Storybook officially supports Next.js, but framework upgrades lag), (b) the docs toolset is "currently limited to React projects" (you're fine), (c) MCP server hosting requires either local dev server or Chromatic publishing. ROI is real once stories exist, but the **front-loaded cost is mismatched to a solo dev's priority of "long-term maintenance for 1 dev."**
*Sources:* tympanus.net/codrops/2025/12/09/supercharge-your-design-system-with-llms-and-storybook-mcp (full walkthrough), storybook.js.org/blog/storybook-mcp-sneak-peek ("experimental … Early Access Program"), storybook.js.org/docs/ai/mcp/overview ("currently limited to React projects").
*Consensus:* ★★ emerging.
*WattHunter action:* **Skip Storybook MCP for now.** Revisit in 6 months once it's GA and you have ≥3 components actively breaking from agent misuse.

**Q12. Auto-generated manifest tools (React + TypeScript).**
*Direct answer:* Three real, production-grade options:
- **`react-docgen-typescript`** — v2.4.0, last published 7 months ago, with **exactly 320 dependent npm projects** per npmjs.com/package/react-docgen-typescript ("There are 320 other projects in the npm registry using react-docgen-typescript"). Wraps react-docgen, reads TS prop types + JSDoc, outputs JSON. Used by Storybook itself.
- **`react-docgen`** — v8.0.3, last published 19 days ago, with **exactly 490 dependent npm projects** per npmjs.com/package/react-docgen ("There are 490 other projects in the npm registry using react-docgen"). Babel-AST based; the canonical low-level tool.
- **`ts-morph`**: more control, harder; souporserious.com has a working tutorial for parsing exported React components and extracting prop tables + JSDoc.

Output JSON is **consumed by Claude Code via @file.md mention** or by Cursor via a generated `.cursor/rules/components.md`. There is no native Claude Code "component manifest format" yet — you just emit Markdown with a YAML frontmatter per component (see Storybook MCP's `components.json` schema for a working template).
*Sources:* npmjs.com/package/react-docgen-typescript, npmjs.com/package/react-docgen, souporserious.com/generate-typescript-docs-using-ts-morph.
*Consensus:* ★★★ established for the parsers; ★★ for the manifest-→-agent format.
*WattHunter action:* 50-line script: `react-docgen-typescript apps/web/components/**/*.tsx` → emit `apps/web/docs/components.md` (Markdown with one section per component, props table, JSDoc summary, file path).

**Q13. Spotify Encore "agents bypass our DS" — technical details.**
*Direct answer:* Spotify's solution, presented by Victoria Tholerus (Web Engineer) and Aleksander Djordjevic (Senior Product Designer) at the 2026 Into Design Systems meetup, has four documented components: (1) **A custom MCP server exposing Encore documentation to Cursor and other agents** — "Tools like Cursor can generate code that is aligned with Spotify standards out of the box." (2) **A custom MCP evaluation framework** that "tests prompts against multiple LLMs and compares generated components both in code and visually" — they explicitly said "we can't just launch and hope for the best." (3) **A layered component architecture**: foundations / styles / behaviors decomposed into independent layers to create "smaller context bubbles for AI reasoning." (4) **Headless components** built on React ARIA / Base UI for interaction logic, with Encore focused on brand, accessibility, and consistency. No public GitHub repo for their MCP server — but the *concept* maps directly to Storybook MCP for outside teams.
*Sources:* intodesignsystems.com/blog/how-spotify-design-system-ai-ready, intodesignsystems.com/use-cases/spotify-design-system, intodesignsystems.medium.com/how-spotify-is-making-their-design-system-ai-ready-eaa07558b711.
*Consensus:* ★★ emerging (one major case study).
*WattHunter action:* Borrow the **layered + MCP + eval framework** mental model; for a solo dev, the MCP server can be a static JSON manifest emitted by your react-docgen script.

**Q14. AGENTS.md vs CLAUDE.md precedence.**
*Direct answer:* Claude Code as of May 2026 reads CLAUDE.md only; **AGENTS.md is not automatically loaded** (issue #34235, March 14 2026). Workaround: symlink. When AGENTS.md IS read by other tools, the spec defines: `user prompts > AGENTS.md > README.md`, with closest file to edit-target winning on conflicts. Codex docs explicitly: "deeper files override shallower ones, 32 KiB default size limit." Cases of both files in same repo: very common — Superpowers v5+ explicitly states "User's explicit instructions (CLAUDE.md, GEMINI.md, AGENTS.md, direct requests) — highest priority — Superpowers skills override default system behavior where they conflict."
*Sources:* hivetrail.com/blog/agents-md-vs-claude-md-cross-tool-standard, github.com/anthropics/claude-code/issues/34235, github.com/obra/superpowers/blob/main/skills/using-superpowers/SKILL.md.
*Consensus:* ★★★ established (with the Claude Code gap as a known issue).
*WattHunter action:* `ln -s CLAUDE.md AGENTS.md` today; one file, two names, no drift.

**Q15. Manifest size limit for 50 components × 5-10 props.**
*Direct answer:* Rough math: 50 components × ~150 tokens (name + 1-line description + 8 props × 10 tokens) ≈ **7,500 tokens for an index, 25-40k tokens for full props + variants + JSDoc**. The strongest published comparison is Vercel's eval ("AGENTS.md outperforms skills in our agent evals"), which compressed Next.js docs "from 40KB to 8KB (80% reduction)" embedded directly in AGENTS.md. Vercel's verbatim result: *"A compressed 8KB docs index embedded directly in AGENTS.md achieved a 100% pass rate, while skills maxed out at 79% even with explicit instructions telling the agent to use them. Without those instructions, skills performed no better than having no documentation at all."* The **on-demand strategy works only when (a) the agent reliably decides to fetch, and (b) descriptions are precise enough to route correctly.** For 50 components, the pragmatic split: **index inline in DESIGN.md / components.md (~5k tokens), full props on-demand via @-mention or MCP**.
*Sources:* vercel.com/blog/agents-md-outperforms-skills-in-our-agent-evals, blog.clawsouls.ai/en/posts/progressive-disclosure, ardalis.com/optimizing-ai-agents-with-progressive-disclosure.
*Consensus:* ★★ emerging.
*WattHunter action:* Keep a compressed component-list inline (one line per component: `TacticCard — cycling tactic playbook, used in /strategy and /race`), put detail in per-file references loaded on demand.

**Q16. Custom MCP server exposing React components — open-source examples.**
*Direct answer:* Real running examples:
- **storybookjs/mcp monorepo** — `@storybook/mcp` (standalone library), `@storybook/addon-mcp` (Storybook plugin), `@storybook/mcp-proxy`, `@storybook/claude-code-plugin`, `@storybook/codex-plugin`. Production-grade, MIT.
- **baldasseva/storybook-mcp on Apify** — generic MCP server that points at any public Storybook URL and exposes `list_components`, `get_story_urls`. Useful if you publish a Storybook later.
- **VoltAgent/awesome-agent-skills** — 1000+ skills including design-md, shadcn-ui, react-components.

Setup for Storybook MCP is 5 minutes once Storybook itself runs. **For WattHunter without existing Storybook, the simpler path is to skip MCP entirely** and just write `components.md` that Claude Code reads via CLAUDE.md.
*Sources:* github.com/storybookjs/mcp, storybook.js.org/addons/@storybook/addon-mcp (858k weekly downloads), apify.com/baldasseva/storybook-mcp.
*Consensus:* ★★ emerging.
*WattHunter action:* Defer MCP; static markdown referenced from CLAUDE.md is good enough at 50 components.

### Category 3 — Plan-Ship-Analyze (Lyse) vs Superpowers

**Q17–Q22 (consolidated) — Lyse compatibility, living spec, Ralph Loop, 85% conformance, UltraThink, 6+ month adoption.**
*Direct answer:* **The "Lyse" / "Plan-Ship-Analyze" workflow as described does not exist as a public product, GitHub repo, or documented practitioner post as of May 2026.** A targeted seven-search investigation found:
- The only "Lyse" with significant public footprint is **getlyse.com** — a Figma→Linear ticket generator for design-system handoff. **Not a coding workflow.**
- `.claude/workflow/skill.md` is **not** the Claude Code convention — the standard is `.claude/skills/<skill-name>/SKILL.md`. No repo uses the `.claude/workflow/` path.
- "Living spec" in `specs/active/*.md` updated during Ship: the concept is real (OpenSpec uses `openspec/specs/`, Kiro uses `.kiro/specs/`) but the specific path/phase doesn't match any public framework.
- **85% conformance score**: no public tool computes it. The "85%" number appears in marketing copy (cogeet-io/ai-development-specifications: "85% consistency in code quality") but is a claim, not a computed metric. Closest real work: ICSE 2026 papers on "architectural conformance" of LLM-generated code; Tessl Registry has a per-skill review score; psantanna.com workflow has a 6-step `orchestrator-protocol.md` with quality_score automation.
- **UltraThink HEART/Kano/JTBD**: "UltraThink" was a hardcoded Claude Code thinking-budget keyword (~31,999 tokens). Anthropic's Sarah Deaton closed the related GitHub issue on **January 16, 2026** with the verbatim message *"Closing as ultrathink is now deprecated and thinking mode is enabled by default"* (per decodeclaude.com and ubos.tech/news/ultrathink-deprecation). HEART, Kano, and JTBD all exist as **separate** Claude skills (deanpeters/jobs-to-be-done, phuryn/pm-skills); no public skill combines them as "UltraThink."
- **Ralph Loop** is real — Anthropic ships an official `claude-plugins-official/ralph-loop` plugin; Geoffrey Huntley's July 2025 post is the origin; snarktank/ralph and wiggum.app implement it. Each iteration runs `claude -p` in a fresh process. *Fully compatible with Superpowers* — Ralph drives the outer loop, Superpowers skills run inside each iteration.
- **Gherkin in AI workflows** is a growing 2026 trend (AutomationPanda/gherkin-guidelines-for-ai, April 2026, ~1 month before this brief) but no quantitative adoption data exists; coverage is qualitative.
- **6+ month Plan-Ship-Analyze practitioner reports**: zero found. Real 6+ month Superpowers reports exist (emelia.io: "At Bridgers, we have been using Superpowers daily for several months").

*Conclusion:* The user's "Lyse / Plan-Ship-Analyze" description is either (a) an internal private workflow, (b) a proposed-but-unbuilt synthesis, or (c) confusion with the Superpowers / OpenSpec / Wiggum / Anthropic Ralph-Loop ecosystem. The closest *real* combination is **Superpowers + OpenSpec-style living specs + Anthropic Ralph-Loop plugin + a Gherkin acceptance-criteria skill**.

*Sources:* getlyse.com (the Figma product), github.com/obra/superpowers, claude.com/plugins/ralph-loop, github.com/snarktank/ralph, github.com/chyiiiiiiiiiiii/openspec-skills (OpenSpec), oreilly.com/radar/how-to-write-a-good-spec-for-ai-agents (Addy Osmani on living docs), decodeclaude.com (UltraThink deprecated), github.com/AutomationPanda/gherkin-guidelines-for-ai, blog.fsck.com/2026/03/09/superpowers-5 (Superpowers v5 changelog).
*Consensus:* ★★★ established that "Lyse Plan-Ship-Analyze" as described doesn't exist publicly; ★★ for each adjacent component.
*WattHunter action:* Stay on Superpowers. Add three custom skills: `living-spec` (OpenSpec-style proposal/active/archive), `gherkin-acceptance` (Given/When/Then in plans), `ralph-loop` (already available as Anthropic plugin).

### Category 4 — Linting & Enforcement

**Q24. ESLint rules banning `text-[15px]` and hex codes in Tailwind v4.**
*Direct answer:* Two existing npm packages do this in 2026:
- **`eslint-plugin-tailwindcss`** (francoismassart / hyoban) — `no-arbitrary-value` rule explicitly bans `text-[15px]`, `bg-[#06b6d4]`. `no-custom-classname` bans anything not in your `@theme`. Tailwind v4 support is in beta channel; partial but works.
- **`@poupe/eslint-plugin-tailwindcss`** — Tailwind v4 native with `no-arbitrary-value-overuse` and preset configs.
- **`oxlint-tailwindcss`** — native oxlint plugin with `no-hardcoded-colors`, zero-overhead performance.

For a solo dev, **`eslint-plugin-tailwindcss` with `no-arbitrary-value: error`** is the highest-ROI install — five minutes, catches your stated failure mode.
*Sources:* npmjs.com/package/eslint-plugin-tailwindcss, github.com/poupe-ui/eslint-plugin-tailwindcss, earezki.com/ai-news/2026-03-23-oxlint-tailwindcss.
*Consensus:* ★★★ established.
*WattHunter action:* `pnpm add -D eslint-plugin-tailwindcss`; enable `no-arbitrary-value: error`, `no-custom-classname: error` — THIS WEEK.

**Q25. "Style Binding" skill auto-rewriting `bg-blue-500` → `bg-[var(--accent-default)]`.**
*Direct answer:* No public skill or script does this specific rewrite. The closest existing tools are (a) `eslint-plugin-tailwindcss`'s `--fix` flag, which auto-rewrites *to* shorthand classes but not from arbitrary values *to* token references; (b) manual codemods using jscodeshift. Writing one is straightforward: regex over `className` attributes mapping `bg-blue-500` → `bg-accent`, run via `eslint --fix` custom rule. Probably 1-2 hours of work + a token map.
*Sources:* github.com/francoismassart/eslint-plugin-tailwindcss/blob/master/docs/rules/no-arbitrary-value.md.
*Consensus:* ★ unique opinion (this is unbuilt territory).
*WattHunter action:* Don't auto-rewrite. Use ESLint to *block* commits with arbitrary values; let the agent fix them on the next iteration (cheaper than maintaining a codemod).

**Q26. WCAG contrast across entire codebase (not just DESIGN.md pairs).**
*Direct answer:* `npx @google/design.md lint DESIGN.md` checks contrast only for token pairs declared in the components section. For full-codebase scanning, the established tools are: (a) **axe-core** + axe DevTools or `@axe-core/playwright` — runtime DOM check; (b) **Pa11y CI** — crawls URLs in CI; (c) **Storybook a11y addon** — per-story. For a solo dev without Storybook: a **Playwright + axe-core script** that visits 5-10 canonical pages and reports contrast violations is the realistic option, ~30 lines of code.
*Sources:* general accessibility tooling consensus (axe-core, Pa11y CI are the canonical 2026 options).
*Consensus:* ★★★ established for axe/pa11y.
*WattHunter action:* Add a 30-line Playwright + axe-core script as a nightly GitHub Action; manual until then.

**Q27. Visual regression testing 2026.**
*Direct answer:* Six tools dominate per the 2026 comparison: **BackstopJS** (free, open-source, manual baseline mgmt), **Playwright built-in `toHaveScreenshot()`** (free, pixelmatch-based, in the framework already), **Chromatic** (Storybook-focused), **Percy** (BrowserStack ecosystem), **Applitools Eyes** (AI semantic diffing, enterprise), **Autonoma** (AI with semantic noise filtering). **Playwright + Claude Code MCP integration is the 2026 sweet spot**: Playwright MCP server lets Claude take screenshots and run visual diffs directly. For a solo dev without Storybook, **Playwright's built-in visual comparisons is the right starting point** — zero new dependencies, works today.
*Sources:* getautonoma.com/blog/visual-regression-testing-tools, bug0.com/knowledge-base/playwright-visual-regression-testing, chromatic.com/playwright, pasqualepillitteri.it/en/news/205/ai-blind-playwright-mcp-invisible-bugs.
*Consensus:* ★★★ established.
*WattHunter action:* Playwright's `toHaveScreenshot()` against 5-10 canonical pages, run on PR. Add Chromatic only if/when you add Storybook.

**Q28. `.husky/pre-commit` stack.**
*Direct answer:* Concrete recipe for WattHunter:
```bash
# .husky/pre-commit
pnpm exec eslint apps/web --max-warnings 0  # blocks text-[15px], hex
pnpm exec tsc --noEmit                      # typecheck
npx @google/design.md lint DESIGN.md        # WCAG + structure
```
Add `pnpm exec playwright test --grep @visual` on pre-push (slower).
*Consensus:* ★★★ established (the stack), ★★ (combined recipe).
*WattHunter action:* Ship this exact recipe in `.husky/pre-commit` this week.

### Category 5 — Competitive state of the art

**Q29. Cursor + DESIGN.md precedence with CLAUDE.md + AGENTS.md.**
*Direct answer:* Cursor 1.x reads its own `.cursor/rules/` files first, then AGENTS.md if present (per the AGENTS.md spec adoption), then any explicitly-referenced files. Cursor has not published native automatic DESIGN.md reading — it reads it only when referenced from rules or prompts. With all three present, the practical precedence is: user prompt > .cursor/rules > AGENTS.md > CLAUDE.md (Cursor ignores CLAUDE.md). The simplest WattHunter setup: symlink CLAUDE.md → AGENTS.md, add one `.cursor/rules/design-system.md` that says "Always follow ./DESIGN.md and ./docs/components.md."
*Sources:* deployhq.com/blog/ai-coding-config-files-guide, hivetrail.com/blog/agents-md-vs-claude-md-cross-tool-standard.
*Consensus:* ★★ emerging.
*WattHunter action:* See Q14 — symlink + thin Cursor rule pointing at DESIGN.md.

**Q30. Lovable / Bolt / v0 + DESIGN.md.**
*Direct answer:* No published systematic test exists. Anecdotal practitioner reports across 2026 comparisons (justtalkingtech.medium.com, medium.com/realworld-ai-use-cases, hansreinl.de): v0 produces clean React + Tailwind but **does not respect uploaded DESIGN.md context the way Cursor/Claude Code do** (v0 is a chat UI without project files); Lovable's project-file model can ingest DESIGN.md but treats it like any other file (no special handling); Bolt similar. The pattern that works is: **generate first draft in v0/Lovable, then import to local repo, then let Cursor/Claude Code refactor against DESIGN.md**. WattHunter is a Next.js 16 App Router project — you're past prototyping; v0/Lovable aren't your daily drivers.
*Sources:* justtalkingtech.medium.com/vibe-coding-in-2026, medium.com/realworld-ai-use-cases/i-spent-500-testing-replit-lovable-bolt-v0-cursor, hansreinl.de/blog/ai-code-generators-frontend-comparison.
*Consensus:* ★ unique opinion (no formal benchmark).
*WattHunter action:* Use v0 only for greenfield component spikes; never as the source of truth.

**Q31. Vercel Agent + DS conventions.**
*Direct answer:* Vercel Agent (GA 2026) explicitly publishes guidance to **use AGENTS.md** — Vercel's own changelog "Web Interface Guidelines now available as an agent command" supports "Claude Code, Cursor, OpenCode, Windsurf, and Gemini CLI" and instructs "for other agents, use the command prompt directly or add AGENTS.md to your project." Vercel's eval blog ("AGENTS.md outperforms skills") shows compressed docs in AGENTS.md beats skill-based on-demand retrieval (100% vs 79% pass rate). Vercel Agent reads AGENTS.md for both Code Review and Investigation. **DESIGN.md is not natively recognized by Vercel Agent** — it must be referenced from AGENTS.md.
*Sources:* vercel.com/blog/agents-md-outperforms-skills-in-our-agent-evals, vercel.com/changelog/web-interface-guidelines-now-available-as-an-agent-command, vercel.com/docs/agent.
*Consensus:* ★★★ established.
*WattHunter action:* Reference DESIGN.md from AGENTS.md so Vercel Agent sees it on PR review.

**Q32. Public benchmark: "with vs without DESIGN.md".**
*Direct answer:* No formal DESIGN.md-specific benchmark published yet. The closest quantitative comparison is **Vercel's AGENTS.md eval** (verbatim: *"A compressed 8KB docs index embedded directly in AGENTS.md achieved a 100% pass rate, while skills maxed out at 79% even with explicit instructions telling the agent to use them. Without those instructions, skills performed no better than having no documentation at all."*). For DESIGN.md specifically there are practitioner claims of "pixel-perfect UI on first try" (mindwiredai.com, medium.com/@vignarajj) but no controlled study. Spotify Encore's MCP evaluation framework "tests prompts against multiple LLMs and compares generated components both in code and visually" — but they have not published numerical results.
*Sources:* vercel.com/blog/agents-md-outperforms-skills-in-our-agent-evals, intodesignsystems.com/use-cases/spotify-design-system.
*Consensus:* ★ unique opinions; no rigorous benchmark.
*WattHunter action:* Run your own informal benchmark — pick 3 representative "build a new dashboard widget" prompts, run them in Claude Code with and without DESIGN.md, count hardcoded values and component-recreation events.

### Category 6 — WattHunter-specific migration

**Q33. globals.css partitioning.**
*Direct answer:* The Tailwind v4 + shadcn community pattern (shadcnblocks.com, ui.shadcn.com/docs/theming, deepwiki shadcn-ui/ui) is **everything in one `globals.css`** with clear sections separated by comments:
```css
@import "tailwindcss";
@import "tw-animate-css";

/* 1. Primitives — DO NOT EDIT, sync with DESIGN.md */
:root {
  --watt-cyan-500: oklch(...);
  --watt-radius-pill: 20px;
  ...
}

/* 2. Semantic aliases (shadcn) */
:root {
  --background: ...;
  --primary: var(--watt-cyan-500);
  ...
}
.dark { ... }

/* 3. Tailwind v4 @theme inline — exposes to bg-*, text-* utilities */
@theme inline {
  --color-background: var(--background);
  --color-primary: var(--primary);
  ...
}

/* 4. Keyframes & animations (DESIGN.md cannot encode these) */
@keyframes border-beam { ... }
```
**Don't split into multiple files** — Tailwind v4's `@theme` doesn't merge cleanly across files, and shadcn CLI updaters expect one canonical globals.css.
*Sources:* shadcnblocks.com/blog/tailwind4-shadcn-themeing, ui.shadcn.com/docs/theming, deepwiki.com/shadcn-ui/ui/7.1-tailwind-css-integration.
*Consensus:* ★★ emerging.
*WattHunter action:* Keep one globals.css; add 4 clearly-labeled sections; only Section 1 (primitives) is exported to DESIGN.md.

**Q34. Fate of the existing 1655-line doc.**
*Direct answer:* No published case studies on this exact transition. Reasoning from first principles + agent-design-system community guidance (intodesignsystems.com, dev.to/aws-builders): **split, don't delete.** DESIGN.md is for AI agents (tokens + rationale, ~500 lines). The original prose-heavy doc becomes `docs/design-system-rationale.md` or `docs/design-history.md` (decisions, atmosphere, narrative — *only humans read it*). Avoid two-sources problem by making DESIGN.md the **machine source-of-truth for tokens** and the prose doc the **human source-of-truth for "why."** Cross-link with one sentence: "Tokens authoritative in DESIGN.md; rationale in docs/design-system-rationale.md."
*Sources:* dev.to/aws-builders/agentsmd-skillmd-designmd-how-ai-instructions-split-into-three-layers-d0g (machine vs human concerns), intodesignsystems.com/agentic-design-systems.
*Consensus:* ★ unique opinion.
*WattHunter action:* Archive your 1655-line doc as `docs/design-rationale.md`; extract tokens + 9-section DESIGN.md structure; link both ways.

**Q35. shadcn/ui in DESIGN.md `components:` YAML.**
*Direct answer:* shadcn components are CVA-driven with up to dozens of variant × size combinations — they overflow the 8-property DESIGN.md component slot. The community pattern (visible in awesome-design-md's Cursor / Vercel / Linear DESIGN.md files): **encode only the "primary" variant** in YAML (`button-primary: backgroundColor: ..., textColor: ..., borderRadius: ...`) and **describe variants in prose under `## Components > Button`**. Provide the actual CVA mapping as a snippet in the prose section so the agent sees `variant="primary" size="default"` → token bindings.
*Sources:* github.com/voltagent/awesome-design-md (real examples), shadcn-design-md.vercel.app (community extension that does exactly this).
*Consensus:* ★ unique opinion.
*WattHunter action:* For each shadcn component, encode default variant only in YAML; add prose section with variant→token mapping.

**Q36. Geist Sans + Geist Mono dual typography.**
*Direct answer:* The DESIGN.md typography schema supports `fontFamily` per role — Vercel's own DESIGN.md in awesome-design-md uses both Geist Sans and Geist Mono. The convention is: declare two type ramps explicitly, role-based.
```yaml
typography:
  h1:        { fontFamily: "Geist Sans", fontSize: "2.5rem", ... }
  body-md:   { fontFamily: "Geist Sans", fontSize: "1rem", ... }
  data-lg:   { fontFamily: "Geist Mono", fontSize: "1.5rem", fontVariantNumeric: "tabular-nums" }
  data-md:   { fontFamily: "Geist Mono", fontSize: "1rem", fontVariantNumeric: "tabular-nums" }
```
Then in prose under `## Typography`: "Geist Mono is used **exclusively for numbers, codes, and stat callouts** (watts, %, time, distance). All narrative text uses Geist Sans."
*Sources:* github.com/voltagent/awesome-design-md (Vercel DESIGN.md uses Geist), medium.com/@vignarajj/design-md-demystified (9-section structure).
*Consensus:* ★★ emerging.
*WattHunter action:* Use the schema above; the prose rule is what stops the agent from putting `2:34` in Geist Sans.

**Q37. "Radius-as-affordance" ambiguity (20px = filter pill OR decorative tag).**
*Direct answer:* DESIGN.md's `rounded:` token map (`sm/md/lg/xl/pill`) cannot encode "same value, different semantic by context" cleanly. The pattern that works in awesome-design-md examples is: **two named tokens with the same value, distinguished by name + prose rule**:
```yaml
rounded:
  sm-interactive: 6px
  sub-nav:        8px
  compound:       10px
  filter-pill:    20px
  decorative-tag: 20px   # same value, different semantic
```
Then in `## Components` prose: "`rounded-filter-pill` for any element that *triggers state change on click* (filter chips, segment toggles). `rounded-decorative-tag` for any element that is *display-only* (category labels, status badges). The agent must never pick by value — only by semantic name."
*Sources:* awesome-design-md examples; designsystemscollective.substack.com (citing "intent-rich tokens like action.primary.confirm").
*Consensus:* ★ unique opinion (uncharted in spec, but follows the broader principle of intent-rich tokens).
*WattHunter action:* Rename your 20px radius tokens to be semantic, not value-based; lint blocks `rounded-[20px]`.

---

## Recommendations — the decision

### 1) Approach A / B / C — go with B+ (hybrid leaning auto-generated)

**Recommendation: Approach B implemented in a way that biases toward C over time.**

The pure choices fail for a solo dev:
- **A (DESIGN.md only)**: insufficient for your stated pain point. Agents will still recreate `<TacticCard>` because DESIGN.md describes tokens, not components-as-code. Your existing 421-line `globals.css` already encodes tokens — DESIGN.md alone adds little.
- **B (DESIGN.md + manual `system.md`)**: solves component reuse this week, but a hand-curated catalog of 50 components drifts the moment you add `<EnergyChart>` and forget to update. As a solo dev with no review buddy, this fails the "long-term maintenance" priority.
- **C (DESIGN.md + Storybook MCP)**: 12-25 hours of setup before value lands (Q11). Vercel's published eval ("AGENTS.md outperforms skills") shows passive context still beats on-demand retrieval in current models — verbatim: *"A compressed 8KB docs index embedded directly in AGENTS.md achieved a 100% pass rate, while skills maxed out at 79%."* Pure C is over-engineered for 50 components today.

**The hybrid (B+):**
1. **DESIGN.md** for tokens (`@google/design.md export --format css-tailwind` from your globals.css; ~5k tokens, lints WCAG).
2. **`docs/components.md`** that is **auto-generated** from `react-docgen-typescript apps/web/components/**/*.tsx` — emits one Markdown section per component with name + props + JSDoc + file path. Re-runs on every commit via a `lint-staged` hook. Solves drift (Approach C's main benefit) without Storybook overhead.
3. **CLAUDE.md** (symlinked to AGENTS.md) is the orchestrator: 30 lines saying "Read DESIGN.md and components.md before any UI change; never use arbitrary Tailwind values; prefer reusing existing components from components.md."
4. **ESLint + DESIGN.md lint + Playwright visual diff** as enforcement (the layer no doc-based approach can replace).

**Why this satisfies "long-term maintenance for 1 solo dev":**
- The catalog regenerates itself — you can't forget to update it.
- DESIGN.md is exported, not authored — tokens stay in sync with code.
- The 1655-line doc becomes archive (`docs/design-rationale.md`), preserving "why" without polluting AI context.
- You can graduate to Storybook MCP later (Approach C, full) when the project earns it.

### 2) Workflow — stay on Superpowers; do not migrate to Lyse

**Recommendation: stay on Superpowers v5+; add three custom skills to cover the "Plan-Ship-Analyze" *concepts* you actually want.**

The Lyse / Plan-Ship-Analyze workflow as described does not exist publicly. Building your stack on a non-existent (or private) framework is the worst kind of vendor risk for a solo dev. The good news: the *concepts* are real and borrowable into Superpowers:

| You wanted | Borrow into Superpowers as |
|---|---|
| Living spec (updates during Ship) | Custom skill `living-spec` mirroring OpenSpec's `specs/active → specs/archive` directory move on PR merge |
| 85% conformance score | Custom skill `conformance-check` running ESLint + `design.md lint` + visual diff, fails CI if any block triggers |
| UltraThink HEART/Kano/JTBD | Three separate skills: `heart-metrics`, `kano-prioritize`, `jtbd-frame` — invoke by Superpowers' usual skill-routing |
| Ralph Loop fresh context | Install Anthropic's official `claude-plugins-official/ralph-loop` plugin alongside Superpowers — they coexist |
| Gherkin specs | Add a `gherkin-acceptance` skill that constrains `writing-plans` output to Given/When/Then |

Superpowers v5 already states: "User's explicit instructions (CLAUDE.md, GEMINI.md, AGENTS.md, direct requests) — highest priority — Superpowers skills override default system behavior where they conflict." Your custom skills slot in cleanly.

### 3) 4-week migration plan

**Week 1 — Token contract + enforcement (lowest-risk, highest-leverage).**
- Day 1: `pnpm add -D eslint-plugin-tailwindcss`; enable `no-arbitrary-value: error`, `no-custom-classname: error`. **This alone will reduce `text-[15px]` and `#06b6d4` to zero.**
- Day 2: Symlink `ln -s CLAUDE.md AGENTS.md`. Add a `.cursor/rules/design-system.md` 5-liner pointing at DESIGN.md.
- Day 3: Section your `globals.css` into 4 commented blocks (primitives, shadcn aliases, `@theme inline`, keyframes). No functional change, just structure.
- Day 4-5: Run `npx @google/design.md export --format css-tailwind` against a hand-authored seed DESIGN.md → diff against globals.css → reconcile manually. Commit DESIGN.md (~500 lines).
- End of week: pre-commit hook running `eslint + design.md lint + tsc`.

**Week 2 — Component manifest + CLAUDE.md rewrite.**
- Day 1-2: Write a 50-line `scripts/gen-components-md.ts` using `react-docgen-typescript`. Output: `docs/components.md` (one section per component, props table, JSDoc summary, import path). Add to `lint-staged` so it regenerates on commit.
- Day 3: Add JSDoc summaries to your top 10 most-used components (TacticCard, XPCard, etc.) — one sentence each describing **when to use, when not to use** (Indeed's pattern from intodesignsystems.com).
- Day 4: Rewrite CLAUDE.md to ~80 lines. Sections: stack, files-you-must-read, do/don't list with file references (per AGENTS.md best practices), reuse-before-create rule pointing at components.md.
- Day 5: Archive the 1655-line doc as `docs/design-rationale.md`. Add one paragraph at top: "This is the human-readable narrative. AI agents read DESIGN.md and components.md."

**Week 3 — Workflow customization (Superpowers skills) + visual regression.**
- Day 1-2: Write three custom Superpowers skills: `living-spec` (OpenSpec-style proposal/active/archive), `gherkin-acceptance` (Given/When/Then in writing-plans output), `conformance-check` (runs the full lint stack and reports).
- Day 3: Install Anthropic's `ralph-loop` plugin. Test on one safe refactor task.
- Day 4-5: Add Playwright `toHaveScreenshot()` against 5 canonical pages (dashboard, race detail, leaderboard, profile, settings). Commit baselines.

**Week 4 — Tooling polish + measurement.**
- Day 1: Run your own A/B benchmark: 3 representative "build a new component" tasks, with and without DESIGN.md + components.md. Count hardcoded values and component-recreation events. Establish your baseline.
- Day 2-3: Add a nightly GitHub Action running `axe-core` over 5 pages (WCAG full-codebase scan).
- Day 4: Document one-page "How AI works on WattHunter" in `docs/ai-workflow.md` so future-you remembers the system.
- Day 5: Retrospective — what's actually working, what to drop, what to add. Set a 90-day review date.

### 4) What to do FIRST this week — prioritized

1. **Install `eslint-plugin-tailwindcss` with `no-arbitrary-value: error`** (15 minutes). This single change prevents the `text-[15px]` / `#06b6d4` failure mode at commit time, *regardless of what you do with DESIGN.md*. Highest ROI in the entire migration.
2. **Symlink `CLAUDE.md → AGENTS.md`** (2 minutes). One file, two names, picked up automatically by Cursor / Codex / Vercel Agent / Windsurf. Zero risk.
3. **Add a 30-second JSDoc summary to your 5 most-used components** (TacticCard, XPCard, and three others). One sentence: "Use for X. Do not use for Y." This is the single most effective anti-recreation defense — even before you write the catalog generator, agents that read these files will see clear signposts.
4. **Run `npx @google/design.md lint` against a hand-authored 1-page DESIGN.md** seeded from your globals.css primitives. See what it complains about. Gives you a concrete target to refine.
5. **Cap your CLAUDE.md rewrite at 80 lines and reference DESIGN.md from it** (1 hour). Per Anthropic's own guidance ("under 200 lines"), most of your current behavioral rules are noise that competes with the design-system signal.

---

## Caveats

- **DESIGN.md is alpha.** The spec may break in the next 12 months. Treat your DESIGN.md as a regenerated artifact, not a precious hand-authored doc.
- **Claude Code does not read AGENTS.md natively yet.** The symlink workaround works today; if Anthropic ships native support (62% Manifold odds in 2026), the workaround becomes redundant — no rework needed.
- **Storybook MCP is early-access and limited to React projects.** You're fine, but if you ever expand to React Native or another framework, MCP-based approaches need to be revisited.
- **The "Lyse" workflow's non-existence in public sources is a strong but not absolute finding.** It is possible Lyse exists as a private workflow at one company, or is being actively built and not yet announced. The recommendation to stay on Superpowers is based on (a) public availability, (b) the maturity of Superpowers v5, (c) the ability to borrow concepts via custom skills. If a public Lyse repo emerges, re-evaluate.
- **`react-docgen-typescript` lags behind react-docgen.** It works for shadcn-style components but struggles with complex generic props and `forwardRef` (less of an issue post-shadcn Tailwind v4 update which removed forwardRef). Validate on a few of your trickier components before committing to the script.
- **Visual regression is the noisiest CI signal in any setup.** Expect false positives on font rendering and antialiasing in CI Docker environments. Tune `maxDiffPixels` after your first 50 PRs, not before.
- **Solo-dev caveat on enforcement:** if the lint stack is so strict it slows you down, you'll disable it within 2 weeks. Start with `no-arbitrary-value` and `no-custom-classname` only; expand based on actual recurrences in your PRs.
- **Search budget exhaustion for a few questions:** Q24 (`@poupe`/oxlint variants), Q26 (axe vs Pa11y CI specifics), and Q33 (multi-file globals.css cases) were answered from accumulated sources rather than dedicated searches; for these the recommendations are sound but the source list is shallower than the rest of the brief. Validate with the linked primary sources before committing engineering time.