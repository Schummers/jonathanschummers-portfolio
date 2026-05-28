---
# === IDENTIFICATION ===
slug: example-slug                       # used as filename; kebab-case
parent: avanade                          # OPTIONAL — slug of parent mission (e.g. avanade for sub-missions)
                                         # null/omit for standalone (Valoris, TotalEnergies parent, etc.)

# === COMPANY ===
company: Company Name
descriptor: "1-liner about the company"  # e.g. "Crédit Agricole's online bank"
sector:                                  # tags drawn from a controlled list
  - fintech                              # fintech | proptech | industry | construction | research | education
  - real-estate

# === ROLE ===
role: Senior Product Designer            # exact role title
mode: consulting-mission                 # founder | freelance | employee | consulting-mission | teaching | research-internship
tagline: "One-sentence scene-setter for this mission"

# === TIME & PLACE ===
startDate: 2021-12                       # YYYY-MM
endDate: 2024-11                         # YYYY-MM or 'present'
duration: "3 yrs"                        # human-readable (auto-computable, but explicit is safer)
location: Paris, France

# === CONTENT ATOMS ===
metrics:                                 # quantified achievements — referenced by id below
  - id: kwh-tracked
    value: "+23%"
    label: "kWh tracked per operator"
  - id: pipe-leaks
    value: "−6%"
    label: "refinery pipe leaks"

bullets:
  - text: "Designed the ML loss-prediction interface for the French wind & solar fleet, **+23% kWh tracked per operator**."
    pillars: [design, research]          # which pillars this bullet illustrates
    tags: [ml-interfaces, dark-mode]     # free-form, used for filtering presets later
  - text: "Co-designed data mapping unifying 4 industrial DBs feeding an ML corrosion model — **−6% pipe leaks**, 500 inspectors, 4 refineries."
    pillars: [design, product]
    tags: [data-mapping, ml-interfaces]

stack:                                   # tools used on this mission
  - Figma
  - Hotjar
  - CloudWatch
  - Miro
  - Notion

links:                                   # OPTIONAL — external references
  - label: Case study
    href: /work/total-nob
  - label: Live product
    href: https://...

# === STORYTELLING META ===
storyArc: 2                              # which step of Jonathan's career arc (0=studies, 1=Avanade, 2=Total, 3=Independent)
learnings:                               # what J. acquired here (used in About / story narrative)
  - "Product management craft alongside business POs"
  - "Data-driven product iteration"
  - "Agile/Scrum at scale"

# === VISIBILITY ===
visibility:
  cv: true                               # show on default CV
  portfolio: true                        # show as / link to portfolio case study
  linkedin: true                         # in LinkedIn experience
  malt: true                             # in Malt profile
---

# Storytelling long-form (used for portfolio case study, LinkedIn articles, REX)

## Context

What was the company, what was the team, what was the brief.

## Problem

What pain point was uncovered.

## Approach

How research / strategy / design were combined.

## Result

Quantified outcomes + qualitative impact.

## What I'd do differently

Honest retrospective.
