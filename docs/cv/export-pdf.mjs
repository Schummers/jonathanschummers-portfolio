#!/usr/bin/env node
/**
 * CV export — Puppeteer-based.
 *
 * Why Puppeteer instead of Chrome CLI --print-to-pdf:
 *   Chrome CLI splits web-font glyphs across multiple font subsets, producing
 *   incorrect ToUnicode maps → broken copy-paste and ATS parsing (the "b" bug).
 *   Puppeteer's page.pdf() uses a different code path that embeds fonts
 *   correctly and produces clean text extraction.
 *
 * Usage:  node docs/cv/export-pdf.mjs
 */

import puppeteer from 'puppeteer';
import http      from 'http';
import fs        from 'fs';
import path      from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UI_DIR    = path.join(__dirname, 'ui');

// Usage: node export-pdf.mjs [src-basename-without-ext]
// Examples:
//   node export-pdf.mjs                     → cv-template → cv-jonathan-schummers.pdf
//   node export-pdf.mjs cv-dubai-immo       → JonathanSchummers_CV.pdf
//   node export-pdf.mjs cover-letter-damac  → JonathanSchummers_CoverLetter.pdf
const arg  = process.argv[2];
const SRC  = arg ? `${arg}.html` : 'cv-template.html';
const OUT  = arg
  ? path.join(__dirname, arg.startsWith('cover-letter') ? 'JonathanSchummers_CoverLetter.pdf' : 'JonathanSchummers_CV.pdf')
  : path.join(__dirname, 'cv-jonathan-schummers.pdf');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.svg':  'image/svg+xml',
  '.woff2':'font/woff2',
  '.woff': 'font/woff',
};

function startServer() {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const pathname = new URL(req.url, 'http://x').pathname;
      const filePath = path.join(UI_DIR, pathname === '/' ? SRC : pathname);
      if (!fs.existsSync(filePath)) { res.writeHead(404); res.end(); return; }
      const ext  = path.extname(filePath);
      res.writeHead(200, { 'Content-Type': MIME[ext] ?? 'application/octet-stream' });
      fs.createReadStream(filePath).pipe(res);
    });
    server.listen(0, '127.0.0.1', () => resolve(server));
    server.on('error', reject);
  });
}

const server = await startServer();
const port   = server.address().port;
const url    = `http://127.0.0.1:${port}/`;

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
try {
  const page = await browser.newPage();

  // networkidle0 waits for all resources (Google Fonts CDN) to finish loading.
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 30_000 });

  // document.fonts.ready confirms every @font-face has been loaded and is
  // available for layout — needed before printing or glyphs fall back.
  await page.evaluate(() => document.fonts.ready);

  await page.pdf({
    path: OUT,
    preferCSSPageSize: true,   // honours @page { size: 794px 1123px }
    printBackground:   true,
  });

  const raw    = fs.readFileSync(OUT, 'latin1');
  const pages  = (raw.match(/\/Count (\d+)/) ?? [, '?'])[1];
  const kb     = Math.round(fs.statSync(OUT).size / 1024);
  console.log(`PDF -> ${OUT}  (${pages} page(s), ${kb}K)`);
  if (pages !== '1') process.stderr.write(`ATTENTION: ${pages} pages — dépasse 1 page.\n`);
} finally {
  await browser.close();
  server.close();
}
