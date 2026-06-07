<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Design system protocol

Before generating any UI code:

1. **Read `DESIGN.md`** at the repo root — tokens, role-based color naming,
   type scale, layout, do's and don'ts.
2. **Reuse existing components** from `components/`. Open the `.tsx` file to
   discover variants and props (`button.tsx`, `tag.tsx`, frames,
   `blueprint-shell.tsx`, `case-study-*.tsx`).
3. **Do not inline a raw `<button>`, `<a>`, or `<input>`** styled with Tailwind
   utilities. Always compose from the existing component, or ask the user
   before extending the catalog.

> **CV print artifact** (`docs/cv/`): the A4 CV is standalone and uses its own
> token canon — read **`docs/cv/DESIGN-CV.md`**, not `DESIGN.md` / `globals.css`.

## Anti-drift rules (hard)

1. **No raw hex codes** in `app/`, `components/`, `content/`. Use the semantic
   Tailwind utilities (`bg-text-primary`, `text-text-secondary`, etc.).
2. **No arbitrary bracket values** for spacing/sizing/radius (`px-[24px]`,
   `gap-[16px]`, `rounded-[8px]` are forbidden). Use token utilities (`px-md`,
   `gap-sm`, `rounded-md`).
3. **No bare `hover:`** on touch-reachable surfaces. Use the custom
   `hover-supported:` variant.
4. **One `brand` button per page maximum.**

## Verification

After producing UI code, run `npm run ds:check`. The script catches raw hex
codes and arbitrary brackets and reports them locally. The same check also
runs on every PR via the `design-check` GitHub Action — its result is
informational and never blocks a merge.

Source-of-truth note: `app/globals.css` is the operational truth for CSS
tokens; `DESIGN.md` is a declarative reflection updated as needed.
