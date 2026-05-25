# Portfolio — Jonathan Schummers

Portfolio web freelance de Jonathan Schummers, Product Designer.

**Live** : https://jonathanschummers.vercel.app

## Stack

Next.js 16 (App Router) · React 19 · Tailwind v4 · TypeScript · case studies en markdown.
Design system documenté dans [`docs/archive/2026-05-25-design-system-original.md`](docs/archive/2026-05-25-design-system-original.md).

## Développement

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # build prod
npm start            # serve build prod
```

## Structure

- `app/` — routes App Router (homepage + `/work/[slug]`)
- `components/` — composants UI (server par défaut, `"use client"` minimal)
- `content/case-studies/` — case studies en markdown
- `lib/` — data layer + parsing markdown
- `docs/` — design system + roadmap
