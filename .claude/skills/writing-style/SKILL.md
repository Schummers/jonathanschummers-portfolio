---
name: writing-style
description: |
  Writing Jonathan Schummers' professional copy for job applications and
  recruiter-facing documents: CV bullets, summaries, taglines, cover letters,
  LinkedIn experience entries, Malt service descriptions, portfolio case
  studies. Use this skill whenever drafting OR editing OR reviewing any text
  that will appear under Jonathan's name in front of a recruiter, hiring
  manager, family-office contact, or freelance buyer, even if the user does
  not explicitly ask for "style review". Enforces ~22 AI-writing patterns
  from Wikipedia's "Signs of AI writing" (no em dashes, no "pivotal" or
  "showcasing", no copula avoidance, no rule of three, no persuasive tropes,
  no filler phrases), a two-tier banned-vocabulary list (hard banned vs soft
  banned) with per-channel calibration, preferred action verbs, the bullet
  formula (action + scope + tool + metric, max ~200 characters), and STAR for
  cover letters and questionnaires. Two-pass draft, audit, final loop. For
  portfolio case studies, the case-study skill owns the workflow and calls
  this skill for voice.
allowed-tools:
  - Read
  - Edit
  - Write
  - Grep
  - AskUserQuestion
---

# Writing Style — Jonathan Schummers

## When this skill applies

CV bullets, summaries, taglines. Cover letters (FR and EN). LinkedIn
"Experience" entries and headline. Malt profile copy. Portfolio case studies.
Application questionnaires. Any text recruiters, hiring managers, or buyers
will read.

Does NOT apply to: code, internal docs, brainstorm notes, casual chat.

## Workflow: draft, audit, final

### Pass 1. Draft
Write following the core rules below. Aim for a first version that already
respects the formula. Do not edit while writing.

### Pass 2. Audit
Scan the draft against the 22 AI-writing red flags below. Rewrite any
sentence that trips a flag.

### Pass 3. Final
Read out loud (mentally is fine). If it sounds like a consultant or a
LinkedIn ghostwriter, rewrite. If it sounds like Jonathan talking, ship.

## Audit checklist (22 AI-writing red flags)

### Content red flags
1. **Significance inflation.** "pivotal moment", "stands as testament", "marking a turning point", "shaping the landscape". Cut or replace with a fact.
2. **Notability name-dropping.** Listing media outlets or brand names without context. Replace with one specific anecdote.
3. **-ing analyses with no substance.** "showcasing", "highlighting", "reflecting", "symbolizing", "underscoring", "contributing to". Remove or expand with a real source.
4. **Promotional language.** "nestled", "vibrant", "boasts", "renowned", "breathtaking", "in the heart of". Replace with a fact.

### Language red flags
5. **AI vocabulary.** delve, realm, intricate, pivotal, showcase, testament, landscape (abstract), tapestry, underscore, garner, vibrant, interplay, enduring, foster, enhance, align with, key (adjective), crucial.
6. **Copula avoidance.** "serves as", "stands as", "features", "boasts", "represents". Use is or has.
7. **Negative parallelisms.** "It is not just X, it is Y". "No guessing, no waiting" tailing fragments. State the point directly.
8. **Rule of three.** "innovation, inspiration, and insights" forced triplets. Use the natural number of items.
9. **False ranges.** "from startups to enterprises", "from X to Y". List directly.
10. **Passive voice / subjectless fragments.** "Was responsible for X". "No configuration needed". Name the actor.

### Style red flags
11. **Em dashes (—).** Never. Replace with period, line break, comma, or colon.
12. **Boldface overuse.** Bold only the 3-5 keywords that drive the scan, not every term.
13. **Inline-header lists.** "**Performance:** Performance improved". Convert to prose.
14. **Title Case Headings.** "Strategic Negotiations And Partnerships". Use sentence case.
15. **Emojis.** None in CV, cover letter, or business email. LinkedIn DM tolerates one if natural.
16. **Hyphenated word pairs.** "cross-functional, data-driven, client-facing, results-oriented". Drop the hyphens, or rewrite as a verb.

### Communication red flags
17. **Chatbot artifacts.** "I hope this helps", "Let me know if you'd like". Remove entirely.
18. **Filler phrases.** "In order to" → "To". "Due to the fact that" → "Because".
19. **Excessive hedging.** "could potentially possibly". Use may.
20. **Generic conclusions.** "The future looks bright", "Exciting times ahead". Replace with a specific plan or fact.
21. **Persuasive authority tropes.** "At its core, what matters is". "It is important to note that". State the point directly.
22. **Signposting announcements.** "Let's dive in", "Here is what you need to know". Start with the content.

## Core rules

### Voice
First person. Specific over general. Every claim tied to an impact (finish
the sentence "...which means that..."). Strategic humility. No filler.

For French outreach, match Jonathan's spoken cadence: invisible connectors
("D'habitude...", "D'autant que...", "Côté immobilier..."), compliments
without flattery, soft open-ended closes ("ne serait-ce que pour parler de...").
Never use: "je me permets de", "n'hésitez pas à me recontacter", "nous
pourrions envisager".

**Voice corpus.** Validated samples of Jonathan's actual writing accumulate in
`voice-corpus.md` (same folder). Before any non-trivial rewrite, read the
section matching the target channel and match the cadence, recurring phrases,
and register observed there. Recent samples reflect current voice.

### Banned vocabulary (two tiers, channel-calibrated)

The point is to never sound like AI, not to ban logical words. Two tiers.

**🔴 HARD BANNED — never, in any channel.** These are the AI-slop tells a
recruiter spots in 20 seconds:

spearheaded, leverage, robust, cutting-edge, world-class, seamlessly,
synergies, game-changer, disruptive, passionate, impactful, proven track
record, delve, realm, intricate, pivotal, showcase, showcasing, testament,
tapestry, underscore, foster, garner, nestled, boasts, renowned,
in the heart of.

**🟡 SOFT BANNED — avoid by default, allowed when factually justified in a
narrative.** Filler verbs and tired adjectives that read junior when used as a
crutch, but are fine when they state a real fact:

crafted, drove, owned (without a metric right after), facilitated,
participated in, contributed to, helped, assisted, supported, data-driven,
innovative, agile (as adjective), lean, results-focused, remarkable.

**✅ NOT banned (common false positives).** These are plain factual verbs. Use
freely: shaped, handed off, harmonised, shipped, designed, mapped, built,
ran, validated, iterated.

**Channel calibration.**
- **CV, Malt, cover letter:** hard + soft both banned. Dense, ATS-tokenised,
  zero filler.
- **Case study, LinkedIn experience, portfolio:** only hard banned. Soft words
  allowed when they carry a real fact in the narrative (e.g. "facilitated 16
  workshops" is fine; "facilitated synergies" is not).

### Preferred verbs
Designed, Analyzed, Led, Built, Shipped, Deployed, Reduced, Increased, Scaled,
Migrated, Consolidated, Validated, Audited, Redesigned, Automated,
Orchestrated, Moderated, Navigated. "Initiated and launched" beats "Launched".

### Bullet formula (CV, LinkedIn experience, Malt)
`Action verb + Scope + Tool or method + Metric`. No metric, no bullet.

Hard cap: **~200 characters per bullet** (≈ 2 lines on a standard CV
layout). If a bullet exceeds 200 chars, split or cut.

### Longer narratives (cover letters, questionnaires)

For any narrative longer than a CV bullet, structure with STAR (Situation /
Task / Action / Result). Allocation: Situation 10-15%, Task 10-15%, Action
50-60%, Result 15-20%. If Action is under 50%, the story is underdeveloped:
cut Situation, expand Action.

- Cover letter: micro-STAR, 3-4 lines per example, 2-3 examples in a 1-page letter.
- LinkedIn experience bullet: mini-STAR collapsed into one sentence.
- Application questionnaire: full STAR, 200-300 words.

**Portfolio case studies use a dedicated process.** See the `case-study`
skill, which owns the full generation workflow (brain dump, ordered Q&A,
compact format, photo placement). This skill (`writing-style`) only governs
the voice once the case-study skill calls it.

## Output format

Hand the text back ready to paste. No preamble, no "Here is your text:", no
explanation unless asked.

If the rewrite was substantial, append one short note (1-2 bullets max)
listing key changes. Example:

> Cut "pivotal moment" (AI vocab #1). Replaced "spearheaded the redesign"
> with "led the redesign of 84 screens". Tightened bullet to 180 chars.

That is the entire output.
