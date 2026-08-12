#!/usr/bin/env node
/**
 * Banner export — Puppeteer-based, PNG output.
 *
 * Generalised from docs/cv/export-pdf.mjs. Same robustness pattern (local HTTP
 * server + networkidle0 + document.fonts.ready), but:
 *   - serves the whole repo root, so templates can reference /public/images/...
 *   - renders a fixed-size viewport and page.screenshot() to PNG (not page.pdf()).
 *
 * Formats live in FORMATS below — add one entry to support a new banner size.
 * Output is rendered at deviceScaleFactor 2 (so a 1584x396 banner exports as a
 * crisp 3168x792 PNG, well under LinkedIn's 4 MB limit).
 *
 * Usage:  node docs/banners/render.mjs <template-rel-path> <format>
 * Example: node docs/banners/render.mjs ui/linkedin-banner.html linkedin
 */

import puppeteer from 'puppeteer';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, '..', '..');
const OUT_DIR = path.join(__dirname, 'out');

// Banner format registry. Add a line to support a new destination/size.
const FORMATS = {
  linkedin: { w: 1584, h: 396 }, // LinkedIn personal profile cover (4:1)
  // 'portfolio-onepager': { w: 1200, h: 1600 }, // à venir
};

const TEMPLATE = process.argv[2] || 'ui/linkedin-banner.html';
const FORMAT_KEY = process.argv[3] || 'linkedin';
const format = FORMATS[FORMAT_KEY];
if (!format) {
  console.error(`Format inconnu: "${FORMAT_KEY}". Disponibles: ${Object.keys(FORMATS).join(', ')}`);
  process.exit(1);
}

const TEMPLATE_URL_PATH = '/' + path.relative(REPO_ROOT, path.resolve(__dirname, TEMPLATE)).split(path.sep).join('/');
const OUT = path.join(OUT_DIR, `${path.basename(TEMPLATE, '.html')}.png`);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
};

function startServer() {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const pathname = decodeURIComponent(new URL(req.url, 'http://x').pathname);
      const filePath = path.join(REPO_ROOT, pathname);
      if (!filePath.startsWith(REPO_ROOT) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        res.writeHead(404);
        res.end();
        return;
      }
      const ext = path.extname(filePath);
      res.writeHead(200, { 'Content-Type': MIME[ext] ?? 'application/octet-stream' });
      fs.createReadStream(filePath).pipe(res);
    });
    server.listen(0, '127.0.0.1', () => resolve(server));
    server.on('error', reject);
  });
}

fs.mkdirSync(OUT_DIR, { recursive: true });

const server = await startServer();
const port = server.address().port;
const url = `http://127.0.0.1:${port}${TEMPLATE_URL_PATH}`;

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
try {
  const page = await browser.newPage();
  await page.setViewport({ width: format.w, height: format.h, deviceScaleFactor: 2 });
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 30_000 });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: OUT, type: 'png', clip: { x: 0, y: 0, width: format.w, height: format.h } });

  const kb = Math.round(fs.statSync(OUT).size / 1024);
  console.log(`PNG -> ${OUT}  (${format.w}x${format.h} @2x = ${format.w * 2}x${format.h * 2}, ${kb}K)`);
} finally {
  await browser.close();
  server.close();
}
