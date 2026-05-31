---
name: case-study
description: |
  Generate or refine a portfolio case study for Jonathan Schummers from a
  mission's raw data. Use whenever Jonathan wants to write, regenerate, or
  improve a case study, project write-up, or portfolio project page, or when
  consolidating a mission's scattered material (old portfolio text, screenshots,
  brain dump) into one clean narrative. Runs an ordered question-and-answer
  workflow, produces a compact format with short self-carrying step titles and
  photos interleaved per step, and calls the writing-style skill for voice.
  Owns the dual-file architecture: working source in content/missions/<slug>.md,
  prod render in content/case-studies/<slug>-v2.md.
allowed-tools:
  - Read
  - Edit
  - Write
  - Grep
  - Glob
  - Bash
  - AskUserQuestion
---

# Case Study generation — Jonathan Schummers

Turns a mission's raw material into a published portfolio case study, through a
structured conversation. It does NOT invent content. Jonathan supplies the
substance (brain dump + raw data); this skill structures, sequences, and
polishes it. For voice and banned vocabulary, defer to the `writing-style`
skill.

**Two rules that hold at every step:** always offer at least two options for any
wording choice (never one, never more than three), and never invent facts.

## Dual-file architecture

| File | Role |
|---|---|
| `content/missions/<slug>.md` | Working source: frontmatter (data atoms) + raw data (v0 + brain dump) + assets. Holds the material the narrative is built from. |
| `content/case-studies/<slug>-v2.md` | Prod render: frontmatter + the narrative. Read by `lib/case-studies.ts` for the live page. This is the single edit surface for the narrative. |

The page **title** is driven by `lib/data.ts` (`project.title`), not the
markdown Headline. When the headline changes, update `lib/data.ts` too.

## Workflow

0. **Gather.** Read the working source. Find scattered material (old case-study
   files, `_archive/`, portfolio components, screenshots in `public/images/`).
   List what exists, flag gaps.
1. **Brain dump.** Ask Jonathan for his vision before writing anything. Clean
   the speech-to-text into structured prose. Save it in the working source.
   Validate before moving on.
2. **Assets.** List every image. Describe each. Rename to
   `<slug>-<type>-<descriptor>.webp` (type = app / research / hero). Update code
   refs. Record old path to new path plus a description in the working source.
3. **Context.** Draft Problem, then Target audience, then Team, then Key
   results. Lock before moving on.
4. **How I solved.** First lock the step outline (5-7 short self-carrying
   titles). Then deep-dive each step: one short paragraph + which photo goes
   under it.
5. **What we delivered.** 4-6 bullets, artefacts and outcomes.
6. **Headline.** Generate last, from everything written. Then update
   `lib/data.ts` title.
7. **Write both files.** Narrative into the prod file; data atoms (CV bullets,
   metrics, tags) into the working-source frontmatter.
8. **Verify.** Audit against the writing-style hard-ban list and em dashes.
   Confirm the page renders (images load, no 404). Commit.

## Output spec (the locked contract)

### Frontmatter (prod file)

```yaml
---
title: "<Client or product>"
slug: "<kebab-case>"
duration: "<N months>"
tags: ["<Domain>", "<Method>", "<Scope>"]   # 3-5
thumbnail: "/images/Experiences/<Folder>/<file>.webp"
heroImage: "/images/Hero/<file>.webp"
order: <int>
---
```

### Body order

```
## Headline
## Context & Objectives   (Problem, Target audience, Team, Key results)
## How I solved this problem   (5-7 numbered steps)
## What we delivered
```

No Subtitle section. No emojis anywhere. Lead Context with the Problem.

### Headline
One sentence, drives the page title and SEO. States what was built and the
transformation. No metric-stuffing.
Example: `Designed a construction app connecting site crews' real workflows to a complex ERP, replacing 3 legacy tools with a single interface to manage personnel, equipment and procurement.`

### Context & Objectives
Four short blocks, no deep nesting.

- **Problem** — one paragraph (~60-80 words). Open on the stakes, end on the
  real challenge. Example: "...The real challenge was not the software. It was adoption."
- **Target audience** — one line: who they are + what they do daily.
- **Team** — one line: `1 Lead UX/UI Designer (+10 yrs) + Me, inside a ~10-person ERP implementation team.`
- **Key results** — 2-4 bullets, **outcomes only** (never artefacts). Impact
  metrics live here. Renders as a card.

### How I solved this problem
5-7 numbered steps, research to handoff. Each step:
- **Title:** short verb-led phrase, self-carrying, ~50-90 characters (one to two
  lines). Past tense. Reading only the titles tells the whole story.
  Good: `Helped real users, the product team and stakeholders align on the problems to solve`
  Bad (too long): `Ran 4 alignment workshops with stakeholders and business reps to prioritize the problems worth solving: cut manual entry, accelerate procurement...`
- **Body:** one short paragraph (~50-90 words). It continues the title, it
  never repeats it. Do not open by restating the title's words (no "We ran 12
  interviews..." under a title that already says "Ran 12 interviews"). Start
  mid-thought.
- **Bullets:** when a step lists items (problems, features), put them as bold-led
  bullets under the paragraph, separated by a blank line so they render as a list.
- **Photo:** interleaved if one illustrates the step. Not mandatory.

### What we delivered
4-6 bullets. Artefacts plus quantified outcomes. Bold the lead noun.
A visual recap grid of the project's screens renders below this section.

## Re-read test before shipping

1. Reading only the step titles tells the whole story.
2. Titles are short (~50-90 chars), not full sentences.
3. Bodies continue their title, never restate it.
4. Key results are outcomes; What we delivered are artefacts. No overlap.
5. Every metric appears in at least two places.
6. No emoji, no em dash, no hard-banned word (run the writing-style audit).
7. Photos are interleaved, relevant to their step.
8. It sounds like Jonathan, not a consultant.
