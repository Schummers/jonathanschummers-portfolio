#!/usr/bin/env bash
# Export the standalone CV HTML to a clean 1-page A4 PDF.
#
# Delegates to export-pdf.mjs (Puppeteer).
#
# Why Puppeteer instead of Chrome CLI --print-to-pdf:
#   Chrome CLI splits web-font glyphs across font subsets and produces
#   broken ToUnicode maps → ATS parsers and PDF readers see "Luxem b ourg",
#   "on b oarding", etc.  Puppeteer's page.pdf() embeds fonts cleanly.
#
# Usage:  ./docs/cv/export-pdf.sh
set -euo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
node "$HERE/export-pdf.mjs"
