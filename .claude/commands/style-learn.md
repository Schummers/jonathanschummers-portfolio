---
description: Learn from validated samples of Jonathan's actual writing and propose updates to the writing-style skill. Use after Jonathan has shipped a real-world piece (CV bullet, cover letter, LinkedIn post) to refine the rules and grow the voice corpus.
---

# /style-learn — Iterative calibration of writing-style

Calibrate the `writing-style` skill against Jonathan's actual validated writing. Identify rule drift, propose targeted SKILL.md updates, and append the sample to the voice corpus.

## How to use

The input is whatever Jonathan provides after `/style-learn`. Accept any of these formats:

```
/style-learn
Here is the final version I shipped:
[final text]
```

```
/style-learn
Before (Claude's proposal):
[draft]

After (what I actually sent):
[final text]
```

```
/style-learn
Voice sample (not a CV rewrite, just my writing):
[text]
```

If Jonathan provides only a final text without context, ask one question: is this a fresh sample for the corpus, or an edited version of something Claude drafted?

## Workflow

### Step 1. Load the current state
Read:
- `.claude/skills/writing-style/SKILL.md` (current rules)
- `.claude/skills/writing-style/voice-corpus.md` (existing validated samples)

### Step 2. Analyze the input
Compare the input text against the SKILL.md rules. Tag every observation as one of four delta types:

- **Unban candidate.** A word currently in the banned list that Jonathan used and kept. Examples: he used "passionate" intentionally in a cover letter and shipped it.
- **Preferred-list candidate.** A verb or phrase used repeatedly across samples that is not in the preferred list. Examples: "ranked #1 on X", "shipped 0→1".
- **New rule candidate.** A structural pattern Jonathan uses consistently that is not codified. Examples: always opens cover letter with a fact about the company, never starts a paragraph with "I".
- **Voice note.** Cadence, paragraph length, connector style, register. Goes into the Voice section, not as a hard rule.

If a before/after pair is provided, also tag:
- **Override.** A rule Claude applied that Jonathan reverted. Treat as a strong signal — propose to relax or remove the rule.

### Step 3. Propose deltas
Present every delta to Jonathan as a numbered list with the proposed SKILL.md edit. Use `AskUserQuestion` to batch up to 4 deltas per question round.

Example output:

```
## Proposed updates

1. **Unban "passionate"** in a deliberate context.
   Current rule: "passionate" is in Banned Boasting list (hard cut).
   Suggested change: keep banned, but add a note that intentional emotional
   words are allowed in cover letter intros if backed by a fact.

2. **Add to Preferred verbs: "ranked"**.
   You used "ranked #1 on Google UX Benchmark" 3 times across samples.
   Suggested edit: append to the Preferred verbs list in SKILL.md.

3. **New rule: cover letters open with a fact about the company.**
   Pattern: all 3 of your cover letters start with "I've used [product]
   because..." or "Your recent [event] caught my attention".
   Suggested addition: new section "Cover letter openings" with this rule.

4. **Voice note: French outreach uses "ça doit" / "ça pourrait" frequently.**
   Suggested edit: extend the Voice section's French paragraph.
```

### Step 4. Apply approved deltas
For each delta Jonathan approves:
- Use `Edit` on `.claude/skills/writing-style/SKILL.md` to apply the change.
- Show a one-line confirmation of what was changed.

### Step 5. Append to voice corpus
Add the sample to `.claude/skills/writing-style/voice-corpus.md` under the
appropriate section (CV bullets / Cover letters / LinkedIn / Outreach / Other),
with a one-line context header (date, channel, target if relevant).

Format:

```markdown
### YYYY-MM-DD · [Channel] · [Target or note]

[validated text]
```

### Step 6. Recap
End the session with a 3-line summary:
- Deltas applied to SKILL.md (count)
- Sample appended to voice-corpus.md (yes/no, section)
- One observation about Jonathan's voice that emerged

No commit. Jonathan decides when to commit the updated skill.

## Guardrails

- Never silently edit SKILL.md. Every change goes through user approval.
- Do not propose deltas based on a single occurrence in a single sample. A pattern needs at least 2 occurrences OR be a deliberate stylistic choice Jonathan can confirm.
- Prefer adding voice notes over hard rules. Rules constrain, voice notes guide.
- If a proposed delta would contradict a core anti-AI-slop rule (em dashes, "pivotal", "showcasing"), flag it as "potentially regression" and require an explicit confirmation.
