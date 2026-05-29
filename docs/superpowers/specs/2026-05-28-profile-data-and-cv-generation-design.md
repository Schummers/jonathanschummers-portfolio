# Profile Data & CV Generation — Design Spec

> Date: 2026-05-28
> Branch: `feature/cv-generation`
> Status: Brainstorm consolidated, awaiting implementation plan

## 1. Vision

Build a single source of truth for Jonathan Schummers' professional profile data, used to render:

1. The CV (PDF + HTML section embedded in portfolio homepage)
2. The LinkedIn profile copy
3. The Malt profile copy
4. The portfolio (hero, About, Services section, case studies)
5. Future artefacts: REX presentations, LinkedIn articles

Scope V1 is the **CV generator** (default preset visible on portfolio home, other presets generated to disk but not linked publicly). Channels C1-C3 follow.

## 2. Architecture overview

```
portfolio/
├── content/
│   ├── missions/                    ← knowledge base, 1 MD per mission
│   │   ├── _template.md
│   │   ├── avanade.md               parent: null
│   │   ├── bforbank.md              parent: avanade
│   │   ├── spie-batignolles.md      parent: avanade
│   │   ├── totalenergies.md         parent: null         (deferred)
│   │   ├── total-nob.md             parent: totalenergies (deferred)
│   │   ├── total-smart-integrity.md parent: totalenergies (deferred)
│   │   ├── valoris.md               parent: null         (deferred)
│   │   └── universite-paris-cite.md (deferred, sidebar Teaching)
│   ├── case-studies/                ← existing portfolio long-form
│   └── cv/
│       ├── types.ts                 ← typed schema (to create)
│       └── data.ts                  ← Identity, Pillars, Sidebar
├── app/
│   ├── page.tsx                     ← homepage + CVSection before Footer
│   └── cv/print/[preset]/page.tsx   ← print-only route per preset
├── components/cv/                   ← rendering layer
├── scripts/generate-cv-pdfs.mjs     ← Puppeteer postbuild
└── public/
    ├── profile/photo.jpg            ← /images/profile/Profil.close.jpg actually
    └── cv/                          ← generated PDFs per preset
```

**Build flow**: `next build` then Puppeteer opens `localhost:3000/cv/print/<preset>` for each preset, exports `public/cv/<preset>.pdf`. The Download CV button on home links to the default preset.

## 3. Data model

### 3.1 ProfileData root

```ts
type ProfileData = {
  identity: Identity;
  pillars: Pillar[];           // exactly 3: research / product / design
  modifiers: Modifiers;        // transverse signals (ai-native, data-driven)
  experiences: Experience[];   // derived from content/missions/*.md
  sidebar: Sidebar;
};
```

### 3.2 Identity

```ts
type Identity = {
  fullName: 'Jonathan Schummers';
  headline: 'Data-driven designer with PM skills';     // positioning (sells)
  role: 'Senior Product Designer';                      // formal title (ATS)
  sectors: ['fintech', 'proptech'];
  summary: string;                                      // DEFERRED — rewritten post-experiences
  email: 'jonathan.schummers@gmail.com';
  phone: '+33 6 95 25 40 82';
  city: 'Luxembourg';
  country: 'Luxembourg';
  photoSrc: '/images/profile/Profil.close.jpg';
  availability: 'open-for-freelance';                  // assumed default
  links: {
    linkedin:  'https://linkedin.com/in/jonathanschummers',
    portfolio: 'https://jonathanschummers.vercel.app',
    malt:      'https://www.malt.fr/profile/jonathanschummers',
    github:    'https://github.com/Schummers',
    calendly:  'https://calendly.com/jonathan-schummers/discovery-call',
  };

  // optional regional fields, undefined unless preset activates them
  nationality?: string;
  dateOfBirth?: string;
  visaStatus?: string;
  maritalStatus?: string;
  nameLocalised?: { ar?: string };
};
```

**Channel rendering rules**:
- CV displays `role` (ATS-friendly).
- Hero portfolio / LinkedIn / Malt display `headline` (positioning).

### 3.3 Pillars

Three pillars, transverse signals (AI-native + data-driven) sit alongside not inside.

```ts
pillars: [
  {
    id: 'research',
    label: 'Research',
    tagline: 'Find what users need before you build',
    description: 'Discovery the way it should be: interviews, diary studies, contextual inquiry. Real estate taught me that domain fluency beats generic methods.',
    skills: [
      'User interviews', 'Diary studies', 'Contextual inquiry',
      'Heuristic evaluation', 'Usability testing (Maze, Hotjar)',
      'AI-augmented research synthesis'
    ],
  },
  {
    id: 'product',
    label: 'Product',
    tagline: 'Decide what to build first and why',
    description: '6 years at 0 to 1 SaaS as proxy-PO alongside business POs: roadmaps, OKRs, backlog, slicing, KPI tracking. I learned what priority means when budgets are real.',
    skills: [
      'Product roadmap', 'OKRs', 'RICE prioritization', 'User stories',
      'Product slicing', 'Stakeholder alignment', 'KPI tracking',
      'Go-to-market'
    ],
  },
  {
    id: 'design',
    label: 'Design',
    tagline: 'Turn user needs into shippable interfaces',
    description: 'Design systems, dark mode, accessibility, pixel-perfect craft. AI-native: designs ship as machine-readable specs so agents extend them from day one.',
    skills: [
      'Design systems', 'Design tokens', 'Figma (variables, components)',
      'Dark mode', 'Accessibility WCAG 2.1 AA', 'Responsive design',
      'Interaction design', 'AI-augmented prototyping'
    ],
  },
]
```

### 3.4 Modifiers

```ts
modifiers: { aiNative: true, dataDriven: true }
```

Used in rendering to surface "AI-native" or "Data-driven" labels where relevant.

### 3.5 Missions (knowledge base)

Each mission lives in `content/missions/<slug>.md` as YAML frontmatter (data atoms) + markdown body (storytelling long-form).

**Frontmatter schema** (see `content/missions/_template.md` for canonical reference):

- `slug` (kebab-case, equals filename)
- `parent` (slug of parent mission, or `null` for top-level)
- `company`, `descriptor`, `sector[]`
- `role`, `mode`, `tagline` (2 lines max)
- `startDate` (YYYY-MM), `endDate` (YYYY-MM or `present`), `duration`, `location`
- `metrics[]` (each: `id`, `value`, `label`)
- `bullets[]` (each: `text`, `pillars[]`, `tags[]`)
- `clientMentions[]` (clients touched but without dedicated sub-mission file)
- `stack[]`
- `links[]`
- `storyArc` (0=studies, 1=Avanade, 2=TotalEnergies, 3=Independent)
- `learnings[]`
- `visibility` (`{ cv, portfolio, linkedin, malt }` booleans)

**Body**: long-form markdown for case studies, LinkedIn articles, REX. Optional in V1, fills as needed.

### 3.6 Story arc

4 conceptual steps, used to drive About narrative:

| Step | Period | Theme |
|---|---|---|
| 0 | Studies | Cognitive psychology + HMI Master, research methodology |
| 1 | Avanade (2020-2022) | Became Product Designer, consulting craft |
| 2 | TotalEnergies (2022-2025) | Added Product Management + data-driven + agile at scale |
| 3 | Independent (2025-present) | Added AI-native workflows, building Valoris |

Each mission's `storyArc` field links it to a step.

### 3.7 Visibility flags

Replaces the earlier `clientShowcase` flag idea. Each mission decides where it appears:

```yaml
visibility:
  cv: true              # show on default CV
  portfolio: true       # show as / link to portfolio case study
  linkedin: true        # in LinkedIn experience
  malt: true            # in Malt profile
```

Renderers consume these per channel.

## 4. Timeline canonique

| # | Block | Role | Dates | Duration | Location |
|---|---|---|---|---|---|
| 1 | Avanade (parent) | Product Designer | Jan 2020 to Jun 2022 | 2 yrs 6 mo | Paris |
| 1a | Spie Batignolles | UX Designer | Jul 2020 to May 2021 | 11 mo | Paris |
| 1b | BforBank | UX/UI Designer | Jun 2021 to Oct 2021 | 5 mo | Paris |
| 1c | Other clients (Sodexo, Schneider Electric, Chanel) | Various | within Avanade | ~14 mo cumulated | Paris |
| 2 | TotalEnergies / Total Digital Factory | Product Designer | Jul 2022 to Jun 2025 | 3 yrs | Paris |
| 3 | Independent (Valoris + freelance) | Founder & Product Designer | Jul 2025 to present | ongoing | Luxembourg |
| + | Université Paris Cité (parallel) | UX Research Lecturer | Oct 2023 to present | parallel | Paris (remote) |

**Note**: TotalEnergies dates have shifted relative to LinkedIn and old CV (was Dec 2021 to Nov 2024). LinkedIn must be updated to match.

## 5. Multi-channel rendering principles

Same data, channel-specific framing:

- **CV (HTML + PDF)**: `role`, dense, ATS-friendly token matches, no banned vocab, one-column, monochrome.
- **LinkedIn**: `headline`, includes social proof (testimonials cut from CV), free-form prose, more context per role.
- **Malt**: `headline`, `availability`, sectors, pillars as service offers, hourly/daily rates.
- **Portfolio home**: `headline`, 3 pillars as services section (mini, not standalone page), CV section embedded above footer (tablet/desktop only).

## 6. CV PDF generation

- Each preset has a route `/cv/print/<preset>`.
- `scripts/generate-cv-pdfs.mjs` runs after `next build`, launches Puppeteer, exports one PDF per preset under `public/cv/<preset>.pdf`.
- The default preset is linked from the Download CV button on home. Other presets exist at deterministic URLs but are not linked publicly (used for targeted applications).

V1 presets:
- `default` (general)
- (others added on demand: `damac`, `gargash`, `dubai-real-estate`, `cdi-tech`, etc.)

## 7. Implementation plan (narrative, 3 phases)

### Phase A: Foundation (content + style)

A1. Update `docs/writing-style/style.md`: translate to English, synthesise, anti-AI-slop rules, integrate `docs/research/cv-market/` findings (banned/preferred vocab, formulas).

A2. Apply style to existing missions: Avanade, BforBank, Spie Batignolles. Rewrite bullets/taglines. Remove em dashes.

A3. Create and fill missions: TotalEnergies (parent), Nob (sub), Smart Integrity (sub).

A4. Create and fill missions: Independent (parent), Valoris (sub or standalone), other freelance projects.

A5. Fill sidebar data: languages, certifications, education, real-estate highlight.

A6. Rewrite Identity `summary` using consolidated experience data.

### Phase B: CV (code)

B1. Create `content/cv/types.ts` (TypeScript types from this spec).

B2. Create `content/cv/data.ts` (Identity, Pillars, Modifiers, Sidebar).

B3. Implement mission loader (`gray-matter` based, validates frontmatter against types).

B4. Build `<CVSection />` component for homepage (tablet/desktop only).

B5. Build `/cv/print/[preset]` route with A4 print layout, using existing design tokens.

B6. Build `scripts/generate-cv-pdfs.mjs` (Puppeteer postbuild).

B7. Wire Download CV button on home, pointing to default preset PDF.

### Phase C: Other channels

C1. Update LinkedIn (dates, headline, summary, bullets) to match canonical data.

C2. Update Malt profile to match canonical data.

C3. Rework portfolio home: hero with `headline` and tagline, 3-pillars services section, About narrative aligned with story arc.

## 8. Anti-drift rules (style)

From cv-market research (to be consolidated in `docs/writing-style/style.md`):

- **No em dashes** anywhere.
- **Banned words**: passionate, spearheaded, data-driven (in summary), agile (as adjective), lean, results-focused, remarkable, innovative, impactful, proven track record, crafted, drove, owned (without metric), delve, realm, intricate, showcasing, pivotal.
- **Preferred verbs**: Designed, Analyzed, Led, Built, Shipped, Initiated and launched, Deployed, Reduced, Increased, Scaled, Migrated, Consolidated, Validated, Audited, Redesigned, Automated, Orchestrated, Moderated, Navigated.
- **Tagline format**: 2 lines max per mission, factual not aspirational.
- **Bullets**: action verb + scope + metric. No metric, no bullet (or move to learnings).
- **AI tools allowed**: Cursor, Claude Code, GitHub Copilot, MCP servers. Not ChatGPT.

## 9. Decisions log (consolidated)

| # | Decision | Rationale |
|---|---|---|
| 1 | Single repo (portfolio + CV) | DRY design system, single deploy |
| 2 | Same design system, A4-adapted layout | Tokens reused, no separate DS |
| 3 | CV section above footer on home, tablet/desktop only | User choice |
| 4 | Puppeteer postbuild generates static PDFs | Reliable rendering, fast serve |
| 5 | Knowledge base = `content/missions/*.md` | Multi-usage, gray-matter compatible |
| 6 | Mission frontmatter schema (typed) | Source of truth for all channels |
| 7 | Renamed `CVData` to `ProfileData` | Multi-usage scope |
| 8 | 3 pillars (Research / Product / Design), not 4 | Delivery captured in Avanade learnings instead |
| 9 | AI-native + Data-driven = transverse modifiers, not pillars | Avoid overlap |
| 10 | Avanade and TotalEnergies = 2 separate experiences | Cleaner storytelling, dates shifted |
| 11 | `parent` field replaces nested `subExperiences` | Flat YAML easier to author |
| 12 | `visibility` flags replace `clientShowcase` | Per-channel decision per mission |
| 13 | No `_TIMELINE.md`, dates per mission YAML | Single source per atom |
| 14 | Em dashes banned | AI-slop red flag |
| 15 | Style guide moves out of `cv/` (now `docs/writing-style/`) | Global, multi-usage |
| 16 | Research centralized in `docs/research/{portfolio,cv-market}/` | No duplication |
| 17 | Photo at `/images/profile/Profil.close.jpg` | User provided |
| 18 | Calendly link: `discovery-call` event | User confirmed |

## 10. Open items / deferred

- Summary text (Identity) — to be rewritten in Phase A6.
- Bullets and taglines V2 for Avanade, BforBank, Spie — Phase A2.
- TotalEnergies mission files — Phase A3.
- Valoris mission file — Phase A4.
- Sidebar content — Phase A5.
- Regional preset fields (nationality, DOB, visaStatus) — filled only when a GCC preset is activated.
- Per-preset overrides for `headline`, `summary` — schema TBD in Phase B1.

## 11. Next session entry point

Open new conversation with:

> "We are continuing the Profile/CV project. The design spec is at `docs/superpowers/specs/2026-05-28-profile-data-and-cv-generation-design.md`. Start with Phase A1: update the writing style guide. Read `docs/writing-style/style.md`, `docs/research/cv-market/*`, then propose a rewritten English version aligned with the cv-market research."

Branch: `feature/cv-generation`.

---

End of spec.
