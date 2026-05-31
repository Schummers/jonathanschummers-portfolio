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

## How Jonathan works (apply throughout)

1. **Brain dump first, structure second.** Never write the narrative before
   Jonathan has dumped what he remembers and wants to highlight.
2. **Always offer at least two options.** For any wording choice (title,
   problem framing, bullet), propose two and let him pick or amend. Never a
   single take, never more than three.
3. **Generation order is fixed:** Context → How I solved → What we delivered →
   Headline last. A tight headline can only be written once the body exists.
4. **Short, self-carrying titles.** Each step title reads as a complete thought
   on its own, but stays short (aim ~6-10 words). Reading only the titles tells
   the whole story. Long titles are a failure.
5. **No emojis** anywhere in the output.
6. **Photos interleaved** under the step they illustrate, not in a trailing
   gallery. Not every step needs one.
7. **Compact.** Short paragraphs, no filler, no separation padding.

## Dual-file architecture

| File | Role |
|---|---|
| `content/missions/<slug>.md` | Working source: frontmatter (data atoms) + raw data (v0 + brain dump) + assets + the generated narrative. Single source of truth. |
| `content/case-studies/<slug>-v2.md` | Prod render: frontmatter + the narrative only. Read by `lib/case-studies.ts` for the live page. |

Note: the page **title** is driven by `lib/data.ts` (`project.title`), not the
markdown Headline. When the headline changes, update `lib/data.ts` too.

## Workflow

0. **Gather.** Read the working source. Find scattered material (old case-study
   files, `_archive/`, portfolio components, screenshots in `public/images/`).
   List what exists, flag gaps.
1. **Brain dump.** Ask Jonathan for his vision. Clean the speech-to-text into
   structured prose. Save it in the working source. Validate before moving on.
2. **Assets.** List every image. Describe each. Rename to
   `<slug>-<type>-<descriptor>.webp` (type = app / research / hero). Update code
   refs. Record old path to new path plus a description in the working source.
3. **Context.** Draft Problem, then Target audience, then Team, then Key
   results. Two options each. Lock before moving on.
4. **How I solved.** First lock the step outline (5-7 short self-carrying
   titles). Then deep-dive each step: one short paragraph + which photo goes
   under it. Two options on each title.
5. **What we delivered.** 4-6 bullets, artefacts and outcomes.
6. **Headline.** Generate last, from everything written. Two options, lock.
   Then update `lib/data.ts` title.
7. **Write both files.** Narrative into the working source and the prod file.
   Update frontmatter data atoms (CV bullets, metrics, tags) once locked.
8. **Verify.** Confirm the page renders (images load, no 404). Commit.

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

No Subtitle section. Lead Context with the Problem.

### Headline
One sentence, drives the page title and SEO. States what was built and the
transformation. No metric-stuffing, no emoji.
Example: `Designed an intuitive SaaS that bridges field workers to a complex ERP, replacing 3 legacy tools with one simple interface.`

### Context & Objectives
Four short blocks, no emojis, no deep nesting.

- **Problem** — one paragraph (~60-80 words). Open on the stakes, end on the
  real challenge. Example opener: "Spie was rolling out a new ERP... The real
  challenge was not the software. It was adoption."
- **Target audience** — one line: who they are + what they do daily.
  Example: `Construction site managers and foremen who log their crews' hours, equipment use and material orders every day.`
- **Team** — one line: `1 Lead UX/UI Designer (+10 yrs) + Me, inside a ~10-person ERP implementation team.`
- **Key results** — 2-4 bullets, **outcomes only** (never artefacts). This is
  where impact metrics live. Renders as a card.
  Example: `4 modules harmonised in one interface, all data centralised in a single ERP, replacing 3 legacy tools.`

### How I solved this problem
5-7 numbered steps, research to handoff. Each step:
- **Title:** short verb-led phrase, self-carrying, ~6-10 words. Past tense.
  Good: `Mapped the on-site ecosystem to find the key users`
  Bad (too long): `Mapped the on-site ecosystem to identify the stakeholders and the two key users who fill the report every day`
- **Body:** one short paragraph (~50-90 words). It continues the title, it
  never repeats it. Do not open the paragraph by restating the title's words
  (no "We ran 12 interviews..." under a title that already says "Ran 12
  interviews"). Start mid-thought.
- **Photo:** interleaved if one illustrates the step. Not mandatory.

### What we delivered
4-6 bullets. Artefacts plus quantified outcomes. Bold the lead noun.
Example: `**A new SaaS replacing 3 legacy tools** with one harmonised interface adapted to daily site usage.`
The visual recap (a grid of the project's screens and deliverables) renders
below this section.

## Re-read test before shipping

1. Reading only the step titles tells the whole story.
2. Titles are short (~6-10 words), not full sentences.
3. Key results are outcomes; What we delivered are artefacts. No overlap.
4. Every metric appears in at least two places.
5. No emoji, no em dash, no hard-banned word (run the writing-style audit).
6. Photos are interleaved, relevant to their step.
7. It sounds like Jonathan, not a consultant.
