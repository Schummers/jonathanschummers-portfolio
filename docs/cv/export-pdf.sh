#!/usr/bin/env bash
# Export the standalone v7 CV (HTML) to a clean 1-page A4 PDF.
#
# This is the Phase A-bis hand-export helper. It is intentionally a throwaway:
# Phase B replaces it with scripts/generate-cv-pdfs.mjs (Puppeteer postbuild)
# once the /cv/print/[preset] Next route exists.
#
# Why these exact flags (each fixes a bug we actually hit):
#   --virtual-time-budget=10000   wait for the Google Fonts (display=swap) to
#                                 load BEFORE printing — otherwise Chrome captures
#                                 the fallback fonts, the sidebar grows taller and
#                                 the bottom margin gets crushed.
#   --print-to-pdf-no-header      no browser-added header/footer.
#   --no-pdf-header-footer        idem, belt and suspenders across Chrome versions.
# Page size comes from the HTML's `@page { size: 794px 1123px; margin: 0 }`
# (exact canvas = A4 @96dpi), so no fit-to-page scaling.
#
# Usage:  ./docs/cv/export-pdf.sh
#         CHROME=/path/to/chrome ./docs/cv/export-pdf.sh   # override binary
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SRC="$HERE/ui/cv-v7-design-md.html"
OUT="$HERE/cv-jonathan-schummers.pdf"

CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
if [[ ! -x "$CHROME" ]]; then
  echo "Chrome introuvable: $CHROME" >&2
  echo "Passe le binaire via CHROME=... ./docs/cv/export-pdf.sh" >&2
  exit 1
fi
[[ -f "$SRC" ]] || { echo "Source HTML introuvable: $SRC" >&2; exit 1; }

"$CHROME" \
  --headless=new \
  --print-to-pdf="$OUT" \
  --no-pdf-header-footer \
  --print-to-pdf-no-header \
  --virtual-time-budget=10000 \
  "file://$SRC" 2>/dev/null

# Sanity: must be exactly 1 page.
pages="$(grep -a -o '/Count [0-9]*' "$OUT" | head -1 | awk '{print $2}')"
echo "PDF -> $OUT  (${pages:-?} page(s), $(du -h "$OUT" | cut -f1))"
[[ "${pages:-0}" == "1" ]] || echo "ATTENTION: le PDF ne tient pas sur 1 page (${pages})." >&2
