---
name: case-study
description: |
  Generate or refine a portfolio case study for Jonathan Schummers from a
  mission's raw data. Use whenever Jonathan wants to write, regenerate, or
  improve a case study, project write-up, or portfolio project page, or when
  consolidating a mission's scattered material (old portfolio text, screenshots,
  brain dump) into one clean narrative. Drives an ordered question-and-answer
  workflow (brain dump first, then Context, then How I solved, then What we
  delivered, then Headline and Subtitle last), produces the compact
  emoji-anchored format with photos interleaved per step, and calls the
  writing-style skill for voice. Owns the dual-file architecture: working
  source in content/missions/<slug>.md, prod render in
  content/case-studies/<slug>-v2.md.
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

## What this skill does

Turns a mission's raw material into a published portfolio case study, through a
structured conversation. It does NOT invent content. Jonathan supplies the
substance (brain dump + raw data); this skill structures, sequences, and
polishes it.

For voice, banned vocabulary, and AI-slop avoidance, this skill **defers to the
`writing-style` skill** (the AI-writing red flags and the hard banned list).

## Dual-file architecture

Each mission has two files:

| File | Role |
|---|---|
| `content/missions/<slug>.md` | **Working source.** Frontmatter (data atoms for CV/LinkedIn/Malt) + body in sections: raw data (v0 + brain dump), assets (photos with descriptions), generated narrative. The single source of truth. |
| `content/case-studies/<slug>-v2.md` | **Prod render.** Frontmatter (title, slug, duration, tags, thumbnail, heroImage, order) + the generated narrative only. Read by `lib/case-studies.ts` for the live portfolio page. |

The case study in the prod file is generated from the working source. When the
source changes, regenerate the prod file. Keep them in sync manually until a
loader migration removes the duplication.

## Jonathan's working rules (do not skip)

Learned from the Spie Batignolles build. These are non-negotiable:

1. **Brain dump first, structure second.** Start by asking Jonathan to dump
   everything he remembers and wants to highlight (voice, raw, unstructured).
   Clean it into structured prose. Store it in the working source under the raw
   data section. Never write the narrative before the brain dump exists.
2. **Generation order is fixed:** Context → How I solved → What we delivered →
   **Headline + Subtitle last**. A tight headline can only be written once the
   body exists. Never generate the headline first.
3. **One option at a time, not three.** Propose one strong draft per field (two
   max when genuinely split). Jonathan validates or amends, then move on.
   Do not flood with A/B/C/D choices.
4. **Self-carrying titles.** Each step title must read as a complete thought.
   Test: reading only the H3 titles tells the whole story (method + outcome).
   Titles can be long if they stay legible.
5. **Photos interleaved per step.** Place the relevant image directly under the
   step it illustrates, not in a trailing gallery. Not every step needs one.
6. **Compact emoji-anchored Context.** Use the format below, not deep nesting.
7. **Surface key results up front AND in the recap.** Metrics appear in Key
   results (Context) and again in What we delivered. Outcomes in Key results,
   artefacts in What we delivered. Keep the distinction clean.

## Output format (locked contract)

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

### Body sections (in order)

```
## Headline                  (~15-25 words, written LAST; method + outcome + transformation)
## Subtitle                  (~35-45 words, more context: method + adoption risk + scope)

## Context & Objectives
### ⁉️ Problem               (one paragraph ~60-80 words, opens on the stakes, ends on the real challenge)
### 🎯 Target audience       (1 line: who they are + what they do)
### 👯 Team                  (1 line: "1 X + Me (Y), inside a Z")
### 🔑 Key results           (2-4 outcome bullets, never artefacts)

## How I solved this problem
### 1. <self-carrying title> (verb-led, past tense)
   ![alt](path)             (interleaved photo if relevant)
   <one paragraph ~50-100 words>
### 2. ...                   (5-7 steps total, research → align → co-design → design → test → handoff)

## What we delivered         (4-6 bullets: artefacts + quantified outcomes, bold the lead noun)
```

See `reference-examples.md` (same folder) for worked examples of the compact
format (PayFit, AB Tasty, banking loan flow).

## Workflow

### Phase 0. Gather raw material
Read the mission's working source. Find scattered material: old case-study
files (current and `_archive/`), portfolio components, screenshots in
`public/images/`. List what exists, flag gaps.

### Phase 1. Brain dump
Ask Jonathan to dump his vision: why this project matters now, the stakes, the
method, what to highlight, which photos illustrate which step. Clean the
speech-to-text into structured French prose. Save under the raw data section of
the working source. Validate with Jonathan before proceeding.

### Phase 2. Assets
List every image for the project. OCR / describe each one. Rename to
`<slug>-<type>-<descriptor>.webp` (type = app / research / hero). Update all
code references. Write an assets section in the working source: old path → new
path + a description per image.

### Phase 3. Context block
Propose Problem, then Target audience, then Team, then Key results. One draft
each. Lock before moving on. (Key results may be deferred to Phase 5 if metrics
depend on later phases.)

### Phase 4. How I solved this problem
First lock the step outline (5-7 self-carrying titles). Then deep-dive each
step: one paragraph + which photo goes under it. One step at a time.

### Phase 5. What we delivered + Key results
4-6 bullets, artefacts and outcomes. Finalise Key results in the Context block.

### Phase 6. Headline + Subtitle
Generate last, from everything written. Propose one or two, lock.

### Phase 7. Write both files
Write the narrative into the working source (generated narrative section) and
into the prod file. Update frontmatter data atoms (CV bullets, metrics, tags)
once the narrative is locked.

### Phase 8. Verify
Run `ds:check` if it touches UI. Confirm the portfolio page renders (images
load, no 404). Commit.

## Re-read test before shipping

1. Reading only the H3 step titles tells the whole story.
2. Key results are outcomes; What we delivered are artefacts. No overlap.
3. Every metric appears in at least two places (Key results + body).
4. No hard-banned word anywhere (run the `writing-style` audit).
5. Photos are interleaved, not dumped in a trailing gallery.
6. It sounds like Jonathan, not a consultant.
