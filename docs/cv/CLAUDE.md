# CV print artifact — instructions

Standalone A4 CV (Phase A-bis). **Not** the portfolio app — own token canon, own export.

## Export to PDF

Run the script. Do **not** craft Chrome flags by hand each time:

```bash
./docs/cv/export-pdf.sh
```

It exports `ui/cv-v7-design-md.html` → `cv-jonathan-schummers.pdf` (1-page A4).
The flags matter and each fixes a real bug — see the header comment in
`export-pdf.sh`. Key one: `--virtual-time-budget` waits for the Google Fonts to
load before printing, otherwise the fallback fonts inflate the layout and crush
the bottom margin.

The script is throwaway: Phase B replaces it with `scripts/generate-cv-pdfs.mjs`
(Puppeteer postbuild) once the `/cv/print/[preset]` Next route exists.

## Design tokens

Read `docs/cv/DESIGN-CV.md` — **not** the repo-root `DESIGN.md` / `globals.css`.
The CV has its own print-tuned token canon (4-step text scale, accent, A4 sizing).

## Hard constraints (don't break the export)

- `@page { size: 794px 1123px; margin: 0 }` — exact A4 canvas, no fit-to-page scaling.
- `@media print { body { padding: 0 } }` — the body padding is screen-preview only.
- Must stay **1 page**. The script warns if it spills to 2.
- Photo lives next to the HTML (`ui/Profil.close.png`) so `file://` export resolves it.
