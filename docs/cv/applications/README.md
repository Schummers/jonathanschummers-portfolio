# Cover letters — index & tag system

One folder per company (`<company>/`). Each cover letter is a Markdown file with
YAML frontmatter. Tags make blocks and angles reusable across future
applications: search the frontmatter to find a letter that already solved a
similar pitch.

## Letters

| Company | Role | Location | Status | Date | Key tags |
|---|---|---|---|---|---|
| [Google — Gemini in Chrome](google-gemini-chrome/cover-letter.md) | UX Designer | Mountain View (US, visa) | final | 2026-06-16 | ai-product-design, agentic, ml-trust, human-in-the-loop |
| [Google — Cloud AI](google-cloud-ai/cover-letter.md) | Senior UX Designer | Sunnyvale (US, visa) | final | 2026-06-16 | ai-product-design, agentic, human-in-the-loop, enterprise-saas |
| [Google — Cloud (Warsaw)](google-cloud-warsaw/cover-letter.md) | UX Designer | Warsaw (EU, no visa) | final | 2026-06-16 | stakeholder-communication, enterprise-saas, design-with-ai |
| [DAMAC Properties](damac/cover-letter-v2-simple.md) | Senior Product Designer | Dubai (visa) | final | 2026-06-08 | proptech, real-estate-domain, b2c-craft |
| [DAMAC Properties (v1)](damac/cover-letter-v1.md) | Senior Product Designer | Dubai (visa) | superseded | 2026-06-08 | proptech, real-estate-domain, b2c-craft |
| Gargash | — | Dubai | notes only | 2026-06-09 | proptech, real-estate-domain |

## Frontmatter schema

```yaml
company:        # employer
team:           # optional, sub-org / product team
role:           # advertised title
seniority:      # Early / Mid / Senior, if stated
location:       # city, country (+ "visa" if sponsorship needed)
job_url:        # canonical posting URL
date:           # YYYY-MM-DD
status:         # draft | final | sent | superseded
variant:        # optional label when several versions coexist
language:       # en | fr
channel:        # direct-apply | warm-intro | referral
word_count:     # approx
visa:           # sponsorship note
salary_band:    # if published
tags:           # theme tags, see legend below
proof_points:   # which experiences are cited
reusable_blocks:# named paragraphs reusable elsewhere
rendered_pdf:   # path to the exported PDF/DOCX, if any
```

## Tag legend

**Theme tags** (the angle / reusable argument):

| Tag | Meaning |
|---|---|
| `ai-product-design` | designing AI/ML-facing products |
| `design-with-ai` | using AI to do the design work (custom skills, faster loop) |
| `agentic` | agentic workflows, agents that act |
| `ml-trust` | confidence intervals, explainability, human-AI trust UI |
| `human-in-the-loop` | confirm-before-act, staging, scoped permissions, undo |
| `enterprise-saas` | B2B / enterprise / technical software |
| `b2c-craft` | consumer-grade visual craft (e.g. BforBank, Google UX award) |
| `proptech` | property tech |
| `real-estate-domain` | first-hand real estate / landlord credibility |
| `discovery-research` | qual + quant research driving the design |
| `stakeholder-communication` | articulating, presenting, and defending design decisions; driving consensus |

**Proof points** (experiences cited): `totalenergies`, `bforbank`, `valoris`,
`portfolio-real-estate`.

**Reusable blocks** are named in each letter's frontmatter and described in its
own "Reuse notes" section. To draft a new letter, scan this index for the
closest tag set, then graft the relevant `reusable_blocks` and re-angle.
