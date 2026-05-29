---
description: Audit-only mode of the writing-style skill. Lists every AI-writing red flag found in the text WITHOUT rewriting. Use to diagnose before deciding what to keep.
---

# /audit — Writing-style audit (no rewrite)

Load the `writing-style` skill from `.claude/skills/writing-style/SKILL.md`, then run **only Pass 2 (audit)** of its workflow on the text that follows. Do not rewrite.

## How to use

The text to audit comes immediately after `/audit` in the same message. Example:

```
/audit
At its core, AI-assisted coding serves as an enduring testament to the
transformative potential of large language models, marking a pivotal moment
in the evolution of software development.
```

## What you do

1. Read the skill at `.claude/skills/writing-style/SKILL.md` to load the 22 red-flag patterns.
2. Scan the input text against every red flag. Quote the offending sentence verbatim and tag it with the pattern number and name.
3. For each finding, give one short suggestion in 5-10 words. Do not produce a rewrite of the full text.
4. End with a one-line verdict: severity (clean / light cleanup / heavy AI-slop) and the count of distinct patterns triggered.

## Output format

```
## Audit findings

1. **#1 Significance inflation** — "marking a pivotal moment in the evolution of software development"
   Suggestion: cut the phrase, state the timeline plainly.

2. **#5 AI vocabulary (testament, pivotal)** — "an enduring testament to the transformative potential"
   Suggestion: replace with a fact about adoption or measured impact.

3. **#21 Persuasive authority trope** — "At its core, ..."
   Suggestion: state the point directly.

## Verdict

Heavy AI-slop — 3 distinct patterns in a single sentence. Recommend full rewrite via `/style`.
```

No preamble, no rewrite, no advice beyond the per-finding suggestion line.
