---
description: Apply Jonathan's writing style (skill writing-style) to the text that follows. Drafts, edits or rewrites CV bullets, summaries, cover letters, LinkedIn copy, case studies.
---

# /style — Apply writing-style skill

Load the `writing-style` skill from `.claude/skills/writing-style/SKILL.md` and apply it to the text or task that follows this command.

## How to use

The text to process comes immediately after `/style` in the same message. Examples:

```
/style
Rewrite this bullet:
Spearheaded the redesign of the BforBank mobile onboarding flow, leveraging
data-driven insights to craft a seamless user journey that showcases best
practices in fintech UX.
```

```
/style
Draft a 3-line summary for Jonathan's CV positioned as Senior Product Designer
pivoting to AI Product / PropTech.
```

```
/style
Audit this cover letter intro for AI-slop and rewrite it:
[paste text]
```

## What you do

1. Read the skill at `.claude/skills/writing-style/SKILL.md` to load the rules.
2. Run the three-pass workflow (draft → audit → final) defined in the skill.
3. Hand back the result ready to paste, following the skill's output format (no preamble, optional 1-2 bullet change note if the rewrite was substantial).

If the user did not provide text after `/style`, ask one clarifying question: what do they want to draft or rewrite, and for which channel (CV / LinkedIn / Malt / cover letter / case study).
