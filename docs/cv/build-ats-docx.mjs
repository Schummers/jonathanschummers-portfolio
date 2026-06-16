// Build the ATS Word CV (.docx) from the frozen wording of ui/cv-classique-immo.html.
// Output: docs/cv/cv-jonathan-schummers-ats.docx
//
// Decisions (session 2026-06-15, with Jonathan) — v4:
//   - One column, no photo. Purpose: ATS portals. Text kept intact (trims TBD).
//   - Brand fonts: Space Grotesk (name / company), Manrope (body). Semi-bold via
//     the "Manrope SemiBold" family; bold reserved for the experience company name.
//     NOTE: these fonts must be installed (or embedded) to render correctly; without
//     them the viewer substitutes a default and semi-bold collapses.
//   - Exact CV-HTML palette. Terracotta ONLY on section labels; bullets/separators grey.
//   - No em dashes. Everything left-aligned. Header is the only 2-column block, done
//     with right tab stops (no table) so it stays ATS-parseable.
//   - Sizes: name 19, tagline/company 11, body 9.5, meta (labels/dates/role/skills) 9.
//     Margins 1.25cm. Line spacing 1.10. Dates and bottom-section years snap right.
//   - Combined labels: EDUCATION & CERTIFICATIONS, LANGUAGES & TOOLS. Grouped Skills
//     section removed; skills live under each experience. Teaching = label + 1 line.
//
// Usage: node docs/cv/build-ats-docx.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  Document, Packer, Paragraph, TextRun, ExternalHyperlink,
  AlignmentType, LevelFormat, TabStopType,
} from 'docx';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, 'cv-jonathan-schummers-ats.docx');

// ---- palette (exact CV-HTML canon) ---------------------------------------
const INK       = '18181B';
const SECONDARY = '66666F';
const TERTIARY  = '9F9FA7';
const ACCENT    = 'C2410C';

const BODY    = 'Manrope';
const SEMI    = 'Manrope SemiBold';
const DISPLAY = 'Space Grotesk';

// Type scale (half-points). name / tagline / company / body / meta.
const S = {
  name: 38, // 19pt  — name
  sub:  22, // 11pt  — tagline
  co:   22, // 11pt  — experience company name (Space Grotesk bold)
  body: 19, // 9.5pt — profile, summaries, bullets, education/cert/lang/tools content
  meta: 18, // 9pt   — section labels, dates, role line, per-job skills, header contact
};
const LINE = 264; // 1.10 line spacing (240 = single)

// A4 (twips) with 1.5cm margins -> content width for the right tab stop.
const MARGIN = 709;                 // 1.25 cm
const RIGHT_TAB = 11906 - MARGIN * 2; // right edge of the text area (dates snap here)

// ---- helpers -------------------------------------------------------------
const r  = (text, opts = {}) => new TextRun({ text, font: BODY, ...opts });
const sb = (text, opts = {}) => new TextRun({ text, font: SEMI, ...opts }); // semi-bold
const sep = () => r('  ·  ', { color: TERTIARY });

const label = (text) => new Paragraph({
  spacing: { before: 260, after: 70, line: LINE },
  children: [new TextRun({ text: text.toUpperCase(), font: SEMI, size: S.meta, color: ACCENT, characterSpacing: 12 })],
});

// Job header: line 1 = company (·context, same colour) left + dates right;
// line 2 = role left + location right. Right edge = the page right margin.
const jobHead = (company, context, dates, role, location, first) => [
  new Paragraph({
    spacing: { before: first ? 0 : 220, after: 0, line: LINE },
    tabStops: [{ type: TabStopType.RIGHT, position: RIGHT_TAB }],
    children: [
      new TextRun({ text: company, font: DISPLAY, bold: true, size: S.co, color: INK }),
      ...(context ? [sep(), new TextRun({ text: context, font: DISPLAY, bold: true, size: S.co, color: INK })] : []),
      r('\t' + dates, { size: S.meta, color: TERTIARY }),
    ],
  }),
  new Paragraph({
    spacing: { before: 30, after: 70, line: LINE },
    tabStops: [{ type: TabStopType.RIGHT, position: RIGHT_TAB }],
    children: [
      r(role, { size: S.meta, color: SECONDARY }),
      r('\t' + location, { size: S.meta, color: TERTIARY }),
    ],
  }),
];

const summary = (text) => new Paragraph({
  alignment: AlignmentType.JUSTIFIED,
  spacing: { after: 90, line: LINE },
  children: [sb(text, { size: S.body })],
});

const bullet = (children) => new Paragraph({
  numbering: { reference: 'bullets', level: 0 },
  alignment: AlignmentType.JUSTIFIED,
  spacing: { after: 60, line: LINE },
  children,
});
const m = (t) => sb(t, { size: S.body }); // metric emphasis inside a bullet

const skillsLine = (list) => new Paragraph({
  spacing: { before: 90, after: 0, line: LINE },
  children: [sb('Skills: ', { size: S.meta, color: SECONDARY }), r(list, { size: S.meta, color: SECONDARY })],
});

const eduEntry = (degree, institution, year) => new Paragraph({
  spacing: { before: 60, after: 0, line: LINE },
  tabStops: [{ type: TabStopType.RIGHT, position: RIGHT_TAB }],
  children: [
    sb(degree, { size: S.body }),
    r(' · ', { size: S.body, color: TERTIARY }),
    r(institution, { size: S.body, color: SECONDARY }),
    r('\t' + year, { size: S.meta, color: TERTIARY }),
  ],
});

const link = (anchor, url) => new ExternalHyperlink({
  link: url,
  children: [new TextRun({ text: anchor, font: BODY, size: S.meta, color: INK, underline: {} })],
});

// ---- document ------------------------------------------------------------
const doc = new Document({
  creator: 'Jonathan Schummers',
  title: 'Jonathan Schummers - CV',
  styles: { default: { document: { run: { font: BODY, size: S.body, color: INK } } } },
  numbering: {
    config: [{
      reference: 'bullets',
      levels: [{
        level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT,
        style: { run: { color: TERTIARY }, paragraph: { indent: { left: 290, hanging: 200 } } },
      }],
    }],
  },
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 },
        margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN },
      },
    },
    children: [
      // ===== Header (3 lines, two columns via right tab) =====
      new Paragraph({
        spacing: { after: 0, line: LINE },
        tabStops: [{ type: TabStopType.RIGHT, position: RIGHT_TAB }],
        children: [
          new TextRun({ text: 'Jonathan Schummers', font: DISPLAY, bold: true, size: S.name, color: INK }),
          r('\t', { size: S.meta }),
          link('LinkedIn', 'https://linkedin.com/in/jonathanschummers'),
          r('      ', { size: S.meta }),
          link('Portfolio', 'https://jonathanschummers.com'),
        ],
      }),
      new Paragraph({
        spacing: { before: 60, after: 0, line: LINE },
        tabStops: [{ type: TabStopType.RIGHT, position: RIGHT_TAB }],
        children: [
          sb('Senior Product Designer with PM skills (6y+)', { size: S.sub }),
          r('\tjonathan.schummers@gmail.com', { size: S.meta, color: SECONDARY }),
        ],
      }),
      new Paragraph({
        spacing: { before: 30, after: 0, line: LINE },
        tabStops: [{ type: TabStopType.RIGHT, position: RIGHT_TAB }],
        children: [
          r('Luxembourg', { size: S.meta, color: SECONDARY }),
          r('\t+33 6 95 25 40 82', { size: S.meta, color: SECONDARY }),
        ],
      }),

      // ===== Profile =====
      label('Profile'),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 0, line: LINE },
        children: [sb(
          "Six years building early-stage products taught me design isn’t usability "
          + "or chasing every user pain point. It’s about de-risking value and shipping fast "
          + "enough to see how people actually behave. Now I use AI to shorten that loop.",
          { size: S.body })],
      }),

      // ===== Experience =====
      label('Experience'),

      ...jobHead('Valoris', 'Proptech startup', 'Jul 2025 - Present',
        'Product Manager · Product Designer', 'Luxembourg', true),
      summary('I lead product discovery and design on Valoris, improving the value proposition and market fit of a property-management SaaS.'),
      bullet([r('Pivoted the main user flow from '), m('web forms to a chat assistant'),
        r(' turning inputs and documents into structured data.')]),
      bullet([r('Validated France as the primary market through Meta-ads campaigns, with a '),
        m('CTR 4% higher'), r(' than Luxembourg.')]),
      bullet([r('Built '), m('custom Claude Code skills'),
        r(' that turn research into TDD specs and enforce design-token compliance via linting.')]),
      bullet([r('Increased onboarding '), m('conversion 6%'), r(' using PostHog funnels and interviews.')]),
      skillsLine('Backlog management · Tracking plan · Data pipelines · Custom AI skills'),

      ...jobHead('TotalEnergies', 'Digital Factory', 'Jun 2022 - Jun 2025',
        'Product Designer · Proxy Product Owner', 'Paris'),
      summary('I led research, design and build on 4 industrial SaaS, shipping MVPs fast and iterating through continuous discovery and usage tracking.'),
      bullet([r('Scaled an ML predictive-maintenance SaaS to 4 refineries (500+ inspectors): '),
        m('82% daily active'), r(', '), m('−6% pipe leaks'), r('.')]),
      bullet([r('Redesigned the power-plant monitoring dashboard with ML kWh loss prediction: '),
        m('+23% kWh tracked per operator'), r('.')]),
      bullet([r('Led '), m('continuous discovery alongside delivery'),
        r(', shipping current features as polished UI and de-risking the next ones.')]),
      bullet([r('Ran product discovery at scale: '), m('70+ interviews'), r(' and '), m('80+ usability tests'), r('.')]),
      skillsLine('Story mapping · Adoption tracking · Data mapping · Design system'),

      ...jobHead('Avanade', 'Accenture-Microsoft JV', 'Jan 2020 - Jun 2022',
        'Product Designer', 'Paris'),
      summary('I delivered on the full design scope, from user research to ideation and UI design, for BforBank, Sodexo, Chanel and Schneider Electric.'),
      bullet([r('Designed BforBank’s mobile app onboarding flow (84 screens), winner of '),
        m('Google’s 2023 Finance UX Award'), r('.')]),
      bullet([r('Designed Spie Bat’ construction app, connecting field users’ input to a complex ERP and replacing '),
        m('3 legacy tools'), r('.')]),

      // ===== Teaching (label + single line) =====
      label('UX Research Lecturer'),
      new Paragraph({
        spacing: { after: 0, line: LINE },
        tabStops: [{ type: TabStopType.RIGHT, position: RIGHT_TAB }],
        children: [
          sb('Teach master’s students to deliver real insights with user research', { size: S.body }),
          r(' · Université Paris Cité', { size: S.body, color: SECONDARY }),
          r('\t2023-Present', { size: S.meta, color: TERTIARY }),
        ],
      }),

      // ===== Education & Certifications =====
      label('Education & Certifications'),
      eduEntry('Master, Human-Machine Interactions', 'Université Lumière Lyon 2', '2019-2020'),
      eduEntry('Master, Cognitive Psychology', 'Université Paris Descartes', '2017-2019'),
      eduEntry('Licensed Real Estate Professional', 'Luxembourg Chamber of Commerce', '2025'),
      new Paragraph({
        spacing: { before: 60, after: 0, line: LINE },
        tabStops: [{ type: TabStopType.RIGHT, position: RIGHT_TAB }],
        children: [
          sb('PSPO & PSU', { size: S.body }),
          r(' · ', { size: S.body, color: TERTIARY }),
          r('Professional Scrum Product Owner I · Professional Scrum with UX (Scrum.org)', { size: S.body, color: SECONDARY }),
          r('\t2024', { size: S.meta, color: TERTIARY }),
        ],
      }),

      // ===== Languages & Tools =====
      label('Languages & Tools'),
      new Paragraph({
        spacing: { before: 0, after: 0, line: LINE },
        children: [
          sb('Languages: ', { size: S.body }),
          r('French ', { size: S.body }), r('(native)', { size: S.body, color: SECONDARY }),
          r(' · ', { size: S.body, color: TERTIARY }),
          r('English ', { size: S.body }), r('(professional)', { size: S.body, color: SECONDARY }),
        ],
      }),
      new Paragraph({
        spacing: { before: 60, after: 0, line: LINE },
        children: [sb('Tools: ', { size: S.body }), r('Figma · Miro · Hotjar · PostHog · Jira · Linear · Notion · Cursor · Claude Code', { size: S.body })],
      }),
    ],
  }],
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(OUT, buf);
  console.log('DOCX ->', OUT, `(${(buf.length / 1024).toFixed(1)}K)`);
});
