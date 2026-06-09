# CV print artifact — instructions

Standalone A4 CV (Phase A-bis). **Not** the portfolio app — own token canon, own export.

## Export to PDF

```bash
./docs/cv/export-pdf.sh
# or directly:
node docs/cv/export-pdf.mjs
```

Exports `ui/cv-template.html` → `cv-jonathan-schummers.pdf` (1-page A4).
Variants : `cv-classique-immo.html`, `cv-dubai-immo.html` → `JonathanSchummers_CV.pdf`.

**Why Puppeteer, not Chrome CLI `--print-to-pdf`:**
Chrome CLI splits web-font glyphs across multiple font subsets and generates
broken ToUnicode maps. PDF readers and ATS parsers then see isolated characters
mid-word ("Luxem b ourg", "on b oarding"). Puppeteer's `page.pdf()` uses a
different code path that embeds fonts with correct Unicode mapping.
`--virtual-time-budget` is gone — replaced by `waitUntil: 'networkidle0'`
+ `document.fonts.ready` in the Node script, which is more reliable.

Phase B (`scripts/generate-cv-pdfs.mjs` + `/cv/print/[preset]` route): reuse
`export-pdf.mjs` as the reference implementation — the pattern is identical.

## Design tokens

Read `docs/cv/DESIGN-CV.md` — **not** the repo-root `DESIGN.md` / `globals.css`.
The CV has its own print-tuned token canon (4-step text scale, accent, A4 sizing).

## Hard constraints (don't break the export)

- `@page { size: 794px 1123px; margin: 0 }` — exact A4 canvas, no fit-to-page scaling.
- `@media print { body { padding: 0 } }` — the body padding is screen-preview only.
- Must stay **1 page**. The script warns if it spills to 2.
- Photo lives next to the HTML (`ui/Profil.close.png`) so `file://` export resolves it.

## ATS font rules (do not regress)

**Root cause (fixed):** Chrome CLI `--print-to-pdf` splits web-font glyphs
across font subsets with incorrect ToUnicode maps → PDF readers and ATS see
broken words. Fixed by switching to Puppeteer `page.pdf()`.

**CSS rules to keep anyway** (defence-in-depth):
- Static weight notation only: `Manrope:wght@400;500;600;700` not `wght@400..700`
- `font-feature-settings: "liga" 0, "calt" 0` on `body`

**Do NOT verify with `pdftotext`** — it reconstructs text intelligently and
masks encoding bugs that ATS and PDF viewers still see. Use a real PDF reader
(Preview.app) to copy-paste a word containing "b" and confirm it reads cleanly.
