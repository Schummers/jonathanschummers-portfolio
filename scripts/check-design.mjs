#!/usr/bin/env node
// scripts/check-design.mjs
//
// Indicative anti-drift lint for the design system.
// Catches:
//   - raw hex color codes (#abc, #abcdef, #abcdef00) in JSX/TSX/MDX
//   - arbitrary bracket values for spacing/sizing/radius
//     (px-[24px], gap-[16px], rounded-[8px], etc.)
//
// Exits 1 on any finding so a GitHub Action shows a red check, but the
// workflow is intentionally NOT added to branch protection: the result is
// informational. Run locally via `npm run ds:check`.

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const ROOTS = ['app', 'components', 'content'];
const EXTS = new Set(['.tsx', '.ts', '.mdx']);
const SKIP_DIRS = new Set(['node_modules', '.next', '.git', 'dist', 'build']);

// Raw hex: #abc / #abcd / #aabbcc / #aabbccdd, NOT inside backticks
// (so markdown code fences in MDX don't trip the check).
const RE_HEX = /(?<![\w`])#[0-9a-fA-F]{3,8}\b(?!`)/g;

// Arbitrary Tailwind bracket values for spacing / sizing / radius.
// Examples caught:  px-[24px], py-[1rem], gap-[16px], m-[8px], rounded-[8px], w-[300px], h-[2.5em]
// Examples NOT caught: max-w-[1400px]  (intentionally — `max-w` isn't in the prefix list yet;
// add it if you want it caught.)
const RE_BRACKET = /\b(?:p[xytblr]?|m[xytblr]?|gap|w|h|rounded)-\[\d+(?:\.\d+)?(?:px|rem|em)\]/g;

function* walk(dir) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return;
  }
  for (const name of entries) {
    if (SKIP_DIRS.has(name)) continue;
    const full = join(dir, name);
    let st;
    try {
      st = statSync(full);
    } catch {
      continue;
    }
    if (st.isDirectory()) {
      yield* walk(full);
    } else if (EXTS.has(extname(name))) {
      yield full;
    }
  }
}

const findings = [];
for (const root of ROOTS) {
  for (const file of walk(root)) {
    let src;
    try {
      src = readFileSync(file, 'utf8');
    } catch (e) {
      console.warn(`⚠ Could not read ${file}: ${e.message}`);
      continue;
    }
    const lines = src.split('\n');
    lines.forEach((line, i) => {
      const lineNo = i + 1;
      for (const match of line.matchAll(RE_HEX)) {
        findings.push({ file, lineNo, kind: 'raw-hex', match: match[0] });
      }
      for (const match of line.matchAll(RE_BRACKET)) {
        findings.push({ file, lineNo, kind: 'arbitrary-bracket', match: match[0] });
      }
    });
  }
}

if (findings.length === 0) {
  console.log('✓ ds:check — no raw hex or arbitrary brackets found.');
  process.exit(0);
}

// Sort for deterministic CI output.
findings.sort((a, b) => a.file.localeCompare(b.file) || a.lineNo - b.lineNo);

console.log(`✗ ds:check — ${findings.length} finding(s):\n`);
for (const f of findings) {
  console.log(`  ${f.file}:${f.lineNo}  ${f.kind.padEnd(18)} ${f.match}`);
}
console.log('\nThis check is informational; PRs are not blocked.');
console.log('Use Tailwind utilities backed by tokens (bg-text-primary, px-md, rounded-md).');
process.exit(1);
