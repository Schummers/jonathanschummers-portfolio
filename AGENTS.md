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

> **CV print artifact**: the A4 CV left this repo on 2026-08-12. It lives in
> `~/AI OS/agency/cv/`, with its own token canon (`DESIGN-CV.md`) and its own
> package.json. Nothing about it belongs here any more.

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

## Analytics

Deux outils, deux usages, ils ne font pas doublon :

- **Vercel Analytics** (`<Analytics />` dans `app/layout.tsx`) : trafic brut,
  zero config, garde-le.
- **PostHog EU** (`instrumentation-client.ts`) : parcours, temps passe, funnels,
  session replay. C'est lui qui repond a « qu'est-ce qu'un recruteur a
  reellement regarde ».

Trois choses a savoir avant d'y toucher :

1. **L'ingestion passe par `/ingest`**, proxyfiee par les `rewrites` de
   `next.config.ts`. Sans ce proxy, les bloqueurs de pub et les VPN d'entreprise
   coupent une partie des events. Ne supprime pas ces rewrites.
2. **`?src=<cible>`** est le seul lien entre une session anonyme et une
   candidature. Le param est colle en `localStorage` puis enregistre en super
   property PostHog, donc il tague tous les events suivants du visiteur. Le lien
   envoye dans une lettre ou un DM doit donc etre
   `https://jonathanschummers.com/?src=nom-de-la-cible`, la meme valeur que dans
   `pipeline/tracker.csv`. **Pas le `.vercel.app`** : ce domaine est derriere
   l'authentification Vercel, un recruteur y tombe sur un ecran de login.
3. **`?internal=1`** exclut definitivement le navigateur courant (flag en
   `localStorage`). A faire une fois par navigateur, sinon mes propres visites
   polluent tout.

Le token vit dans `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` (`.env.local` en local,
env var Vercel en prod). Il est public par construction (prefixe
`NEXT_PUBLIC_`) : ce n'est pas un secret. La **personal API key** (Keychain,
lue par `~/AI OS/system/scripts/phog.sh`) en est un, et ne doit jamais entrer
dans ce repo.

### Verifier que ca marche

```bash
~/AI\ OS/system/scripts/phog.sh sql 210321 \
  "select event, count() from events where timestamp > now() - interval 1 day group by 1"
```

Piege de debug : posthog **differe le `$pageview` d'atterrissage tant que
`document.visibilityState` n'est pas `visible`**. Un onglet pilote par
Playwright ou par un agent est `hidden`, donc il produit des `$pageleave` et
zero `$pageview`. Zero pageview dans un test automatise ne veut pas dire que le
tracking est casse : ouvrir le site a la main dans un vrai onglet avant de
conclure.
