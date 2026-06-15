// Build an ATS-friendly single-column CV (.docx) from the frozen wording of
// ui/cv-dubai-immo.html. Output: docs/cv/cv-jonathan-schummers-ats.docx
//
// ATS rules enforced (see docs/superpowers/specs/2026-06-08-cv-ats-parsing-plan.md):
//   one column, zero tables / text boxes / images / skill bars, system font
//   (Arial), standard section headings, plain-text contact line, reverse-chrono
//   experience, "Mon YYYY - Mon YYYY" dates, comma-separated skill keywords.
//
// Usage: node docs/cv/build-ats-docx.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  Document, Packer, Paragraph, TextRun, AlignmentType, LevelFormat,
  TabStopType, TabStopPosition, BorderStyle,
} from 'docx';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, 'cv-jonathan-schummers-ats.docx');

// ---- helpers -------------------------------------------------------------
const FONT = 'Arial';
const run = (text, opts = {}) => new TextRun({ text, font: FONT, ...opts });
const b = (text, opts = {}) => run(text, { bold: true, ...opts });

// Section heading: bold uppercase + bottom rule, standard ATS label.
const heading = (text) => new Paragraph({
  spacing: { before: 200, after: 80 },
  border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: '999999', space: 2 } },
  children: [run(text.toUpperCase(), { bold: true, size: 21, color: '18181B' })],
});

// Job header: company (bold) left, dates right via tab stop; role/location below.
const jobHeader = (company, dates, role) => [
  new Paragraph({
    spacing: { before: 140, after: 0 },
    tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
    children: [b(company, { size: 21 }), run('\t' + dates, { size: 20, color: '52525B' })],
  }),
  new Paragraph({
    spacing: { before: 10, after: 60 },
    children: [run(role, { size: 20, color: '3F3F46' })],
  }),
];

// Bullet built from an array of TextRuns.
const bullet = (children) => new Paragraph({
  numbering: { reference: 'bullets', level: 0 },
  spacing: { before: 0, after: 30 },
  children,
});

// One-line entry "Bold label, normal detail" for the short sections.
const entry = (strong, detail) => new Paragraph({
  spacing: { before: 40, after: 0 },
  children: [b(strong, { size: 20 }), run(detail ? '  ' + detail : '', { size: 20, color: '52525B' })],
});

// ---- document ------------------------------------------------------------
const doc = new Document({
  creator: 'Jonathan Schummers',
  title: 'Jonathan Schummers - CV',
  styles: { default: { document: { run: { font: FONT, size: 20, color: '18181B' } } } },
  numbering: {
    config: [{
      reference: 'bullets',
      levels: [{
        level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 260, hanging: 180 } } },
      }],
    }],
  },
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 },                 // A4
        margin: { top: 680, right: 720, bottom: 680, left: 720 }, // ~0.5in
      },
    },
    children: [
      // ----- Header (plain text, no image/table) -----
      new Paragraph({
        spacing: { after: 20 },
        children: [run('Jonathan Schummers', { bold: true, size: 32 })],
      }),
      new Paragraph({
        spacing: { after: 20 },
        children: [run('Senior Product Designer with PM skills (6y+)', { size: 22, color: '3F3F46' })],
      }),
      new Paragraph({
        spacing: { after: 20 },
        children: [run(
          'jonathan.schummers@gmail.com  ·  +33 6 95 25 40 82  ·  '
          + 'Luxembourgish (EU), visa sponsorship required',
          { size: 18, color: '52525B' })],
      }),
      new Paragraph({
        spacing: { after: 40 },
        children: [run(
          'linkedin.com/in/jonathanschummers  ·  jonathanschummers.com',
          { size: 18, color: '52525B' })],
      }),

      // ----- Professional Summary -----
      heading('Professional Summary'),
      new Paragraph({
        spacing: { after: 40 },
        alignment: AlignmentType.JUSTIFIED,
        children: [run(
          "Six years building early-stage products taught me that design isn’t usability "
          + "or chasing every user pain point. It’s about de-risking value and shipping fast "
          + "enough to see how people actually behave. Now I use AI to shorten that loop.",
          { size: 20 })],
      }),

      // ----- Work Experience -----
      heading('Work Experience'),

      ...jobHeader('Valoris · Proptech startup', 'Jul 2025 - Present',
        'Product Manager · Product Designer — Luxembourg'),
      new Paragraph({
        spacing: { after: 40 }, alignment: AlignmentType.JUSTIFIED,
        children: [run(
          'I lead product discovery and design on Valoris, improving the value proposition '
          + 'and market fit of a property-management SaaS.', { size: 20 })],
      }),
      bullet([run('Pivoted the core flow from '), b('web forms to chat interactions'),
        run(': a Telegram AI assistant that turns user inputs and documents into structured data.')]),
      bullet([run('Validated France as the primary market through Meta-ads campaigns, with a '),
        b('CTR 4% higher'), run(' than Luxembourg.')]),
      bullet([run('Built '), b('custom Claude Code skills'),
        run(' that turn research insights into TDD specs and enforce design-system token compliance through linting.')]),
      bullet([run('Increased onboarding '), b('conversion 6%'), run(' using PostHog funnels and interviews.')]),

      ...jobHeader('TotalEnergies · Digital Factory', 'Jun 2022 - Jun 2025',
        'Product Designer · Proxy Product Owner — Paris'),
      new Paragraph({
        spacing: { after: 40 }, alignment: AlignmentType.JUSTIFIED,
        children: [run(
          'I led research, design and build on 4 industrial SaaS, shipping MVPs fast and '
          + 'iterating through continuous discovery and usage tracking.', { size: 20 })],
      }),
      bullet([run('Scaled an ML predictive-maintenance SaaS across 4 refineries (500+ inspectors): '),
        b('82% daily active inspectors'), run(', '), b('−6% pipe leaks'), run('.')]),
      bullet([run('Redesigned the power-plant monitoring dashboard with ML-based kWh loss prediction: '),
        b('+23% kWh tracked per operator'), run('.')]),
      bullet([run('Ran a '), b('dual-track loop'),
        run(' in a small agile squad, discovering the next features while steering the build of the current ones into polished, shipped UI.')]),
      bullet([run('Ran product discovery at scale: '), b('70+ interviews'), run(' and '),
        b('80+ usability tests'), run('.')]),

      ...jobHeader('Avanade · Accenture-Microsoft JV', 'Jan 2020 - Jun 2022',
        'Product Designer — Paris'),
      new Paragraph({
        spacing: { after: 40 }, alignment: AlignmentType.JUSTIFIED,
        children: [run(
          'I delivered on the full design scope, from user research to ideation and UI design, '
          + 'for BforBank, Sodexo, Chanel and Schneider Electric.', { size: 20 })],
      }),
      bullet([run('Designed BforBank’s mobile app onboarding flow (84 screens), winner of '),
        b('Google’s 2023 Finance UX Award'), run(' (first of 51 banks).')]),
      bullet([run('Co-designed Spie Batignolles’ construction app (60 screens), connecting site crews to a complex ERP and replacing '),
        b('3 legacy tools'), run('.')]),

      // ----- Real Estate Expertise -----
      heading('Real Estate Expertise'),
      entry('Licensed Real Estate Professional', '— House of Training, Luxembourg'),
      entry('11-property family rental portfolio', '— managed in France & Luxembourg'),

      // ----- Skills (comma-separated keywords for ATS matching) -----
      heading('Skills'),
      new Paragraph({
        spacing: { after: 40 },
        children: [run(
          'Product discovery, Continuous discovery, Dual-track agile, User research, '
          + 'Usability testing, Story mapping, Backlog management, Product strategy, '
          + 'Tracking plan, Adoption tracking, Data mapping, Data pipelines, Design system, '
          + 'Custom AI skills, Figma, Miro, Hotjar, PostHog, Jira, Linear, Notion, Cursor, Claude Code',
          { size: 20 })],
      }),

      // ----- UX Research Lecturer -----
      heading('Teaching'),
      entry('UX Research Lecturer, Université Paris Cité', '— 2023 - 2026'),
      new Paragraph({
        spacing: { before: 10, after: 0 },
        children: [run("Teach master’s students to deliver real insights with user research.", { size: 20, color: '52525B' })],
      }),

      // ----- Certifications -----
      heading('Certifications'),
      entry('Professional Scrum Product Owner I', '— Scrum.org'),
      entry('Professional Scrum with UX', '— Scrum.org'),
      entry('AI for Designers', '— Interaction Design Foundation'),

      // ----- Education -----
      heading('Education'),
      entry('Master, Human-Machine Interactions', '— Université Lumière Lyon 2, 2019 - 2020'),
      entry('Master, Cognitive Psychology', '— Université Paris Descartes, 2017 - 2019'),
      entry('Bachelor, Psychology', '— Université Paris Descartes, 2014 - 2017'),

      // ----- Languages -----
      heading('Languages'),
      new Paragraph({
        spacing: { after: 0 },
        children: [run('French (native), English (professional)', { size: 20 })],
      }),
    ],
  }],
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(OUT, buf);
  console.log('DOCX ->', OUT, `(${(buf.length / 1024).toFixed(1)}K)`);
});
