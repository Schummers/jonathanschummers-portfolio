// Build the cover letter (.docx) from the wording of ui/cover-letter-damac.html.
// Output: docs/cv/cover-letter-damac.docx
//
// Same approach as build-ats-docx.mjs: brand fonts (Space Grotesk / Manrope),
// CV-HTML palette, no em dashes, two-column header via right tab stops (no table).
// Letter-tuned scale and generous line spacing. To re-target another company,
// edit the LETTER content block below (subject, hook, the 3 bullets, closing).
//
// Usage: node docs/cv/build-cover-letter-docx.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  Document, Packer, Paragraph, TextRun, ExternalHyperlink,
  AlignmentType, LevelFormat, TabStopType, BorderStyle,
} from 'docx';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, 'cover-letter-damac.docx');

// ---- palette (exact CV-HTML canon) ---------------------------------------
const INK       = '18181B';
const SECONDARY = '66666F';
const TERTIARY  = '9F9FA7';

const BODY    = 'Manrope';
const SEMI    = 'Manrope SemiBold';
const DISPLAY = 'Space Grotesk';

// Type scale (half-points).
const S = {
  name:  36, // 18pt — name
  sub:   22, // 11pt — title, subject, signature
  body:  21, // 10.5pt — letter body
  meta:  18, // 9pt — eligibility, contact, date
};
const LETTER_LINE = 312; // 1.30 line spacing for the body (generous, readable)

// A4 (twips), 2cm margins.
const MARGIN = 1134;
const RIGHT_TAB = 11906 - MARGIN * 2;

// ---- helpers -------------------------------------------------------------
const r  = (text, opts = {}) => new TextRun({ text, font: BODY, ...opts });
const sb = (text, opts = {}) => new TextRun({ text, font: SEMI, ...opts });
const b  = (t) => sb(t, { size: S.body }); // inline emphasis in the body

const link = (anchor, url) => new ExternalHyperlink({
  link: url,
  children: [new TextRun({ text: anchor, font: BODY, size: S.meta, color: SECONDARY, underline: {} })],
});

// A body paragraph from an array of runs.
const para = (children, opts = {}) => new Paragraph({
  alignment: AlignmentType.JUSTIFIED,
  spacing: { after: 200, line: LETTER_LINE, ...(opts.spacing || {}) },
  children,
});

const letterBullet = (children) => new Paragraph({
  numbering: { reference: 'cl-bullets', level: 0 },
  alignment: AlignmentType.JUSTIFIED,
  spacing: { after: 160, line: LETTER_LINE },
  children,
});

// ---- document ------------------------------------------------------------
const doc = new Document({
  creator: 'Jonathan Schummers',
  title: 'Jonathan Schummers - Cover Letter',
  styles: { default: { document: { run: { font: BODY, size: S.body, color: INK } } } },
  numbering: {
    config: [{
      reference: 'cl-bullets',
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
      // ===== Header (two columns, rule underneath) =====
      new Paragraph({
        spacing: { after: 0, line: 240 },
        tabStops: [{ type: TabStopType.RIGHT, position: RIGHT_TAB }],
        children: [
          new TextRun({ text: 'Jonathan Schummers', font: DISPLAY, bold: true, size: S.name, color: INK }),
          r('\t', { size: S.meta }),
          link('jonathanschummers.com', 'https://jonathanschummers.com'),
        ],
      }),
      new Paragraph({
        spacing: { before: 40, after: 0, line: 240 },
        tabStops: [{ type: TabStopType.RIGHT, position: RIGHT_TAB }],
        children: [
          r('Senior Product Designer with PM skills', { size: S.sub, color: SECONDARY }),
          r('\t', { size: S.meta }),
          link('linkedin.com/in/jonathanschummers', 'https://linkedin.com/in/jonathanschummers'),
        ],
      }),
      new Paragraph({
        spacing: { before: 60, after: 0, line: 240 },
        tabStops: [{ type: TabStopType.RIGHT, position: RIGHT_TAB }],
        children: [
          r('\tjonathan.schummers@gmail.com', { size: S.meta, color: SECONDARY }),
        ],
      }),
      new Paragraph({
        spacing: { before: 60, after: 200, line: 240 },
        tabStops: [{ type: TabStopType.RIGHT, position: RIGHT_TAB }],
        border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: 'E4E4E7', space: 8 } },
        children: [
          r('Luxembourgish national', { size: S.meta, color: SECONDARY }),
          r('  ·  ', { size: S.meta, color: TERTIARY }),
          r('Visa sponsorship required', { size: S.meta, color: SECONDARY }),
          r('  ·  ', { size: S.meta, color: TERTIARY }),
          r('Available immediately', { size: S.meta, color: SECONDARY }),
          r('\t+33 6 95 25 40 82', { size: S.meta, color: SECONDARY }),
        ],
      }),

      // ===== Subject + date =====
      new Paragraph({
        spacing: { before: 220, after: 200, line: 240 },
        tabStops: [{ type: TabStopType.RIGHT, position: RIGHT_TAB }],
        children: [
          sb('Open application: Senior Product Designer', { size: S.sub }),
          r('\t10 June 2026', { size: S.meta, color: SECONDARY }),
        ],
      }),

      // ===== Letter body =====
      para([sb('Dear Hiring Manager,', { size: S.body })], { spacing: { after: 220 } }),

      para([r(
        'What drew me to DAMAC is the digital ecosystem you built across the entire customer journey. '
        + 'That maturity, investing in proprietary tools and treating digital as a growth driver rather than '
        + 'a cost centre, is rare among developers. This is the kind of environment where I can contribute the most.')]),

      para([r('Where I would have impact:')], { spacing: { after: 160 } }),

      letterBullet([r('On '), b('damacproperties.com'),
        r(', my user research skills can help your analytics team understand funnel drop-offs and iterate on the design to increase reservations. The same method raised onboarding '),
        b('conversion 6%'), r(' at Valoris, and I also designed the onboarding flow of the BforBank app, which ranked '),
        b('first of 51 banks'), r(' in Google’s 2023 UX benchmark.')]),

      letterBullet([r('On '), b('DAMAC 360'),
        r(', three years on data-heavy B2B products at TotalEnergies taught me to de-risk new features and iterate after shipping: I designed an ML-powered maintenance product that helped inspectors reduce '),
        b('corrosion leaks 6%'), r(' on the pilot refinery. My real estate licence also gives me a deeper understanding of the users’ perspective and their work.')]),

      letterBullet([r('On '), b('DAMAC Living'),
        r(', I understand property management first-hand: I manage an '),
        b('11-property family portfolio'), r(' daily and know how AI can improve service and experience while automating as much as possible. That problem is what pushed me to found Valoris, an agentic SaaS that turns user inputs and documents into structured data for tax returns and yield tracking.')]),

      para([r(
        'Furthermore, despite the current market turbulence, I hold a deep conviction in Dubai luxury real estate: '
        + 'the city will keep attracting the world’s wealth and the families that come with it. From my understanding, '
        + 'that is DAMAC’s vision too, with branded residences and the largest family-home pipeline in Dubai. '
        + 'I want to grow with the company that leads that market.')], { spacing: { before: 60, after: 260 } }),

      // ===== Sign-off =====
      para([r('I would be pleased to take this further over a call, whenever it suits you.')], { spacing: { after: 220 } }),
      para([r('Yours sincerely,')], { spacing: { after: 260 } }),
      new Paragraph({
        spacing: { after: 0, line: 240 },
        children: [new TextRun({ text: 'Jonathan Schummers', font: DISPLAY, bold: true, size: S.sub, color: INK })],
      }),
    ],
  }],
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(OUT, buf);
  console.log('DOCX ->', OUT, `(${(buf.length / 1024).toFixed(1)}K)`);
});
