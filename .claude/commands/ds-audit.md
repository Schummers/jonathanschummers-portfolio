---
description: Audite chaque page du portfolio contre DESIGN.md via des sub-agents en parallèle. Écrit un rapport par page dans docs/audits/.
---

# /ds-audit — Audit DS multi-agents par page

Tu vas auditer le portfolio contre son design system en dispatchant un sub-agent `Explore` par page route. Le checker déterministe `npm run ds:check` (raw hex, brackets arbitraires) tourne déjà en CI — toi tu fais l'audit **qualitatif** (typography tokens, hiérarchie heading, composants du catalogue, dark mode, duplications…).

**Architecture importante :** les sub-agents `Explore` sont read-only. Chaque sub-agent **retourne son rapport markdown en réponse finale** — c'est toi (l'orchestrateur) qui écris les fichiers dans `docs/audits/`. Ça garantit aussi qu'aucun sub-agent ne modifie le code source par erreur.

## Étapes

### 1. Découverte des routes

Utilise `Glob` sur `app/**/page.tsx` pour lister toutes les routes du App Router. Pour `/work/[slug]/page.tsx`, énumère les slugs via `Glob` sur `content/case-studies/*.md` (en excluant `_archive/`). Ne hardcode rien — re-découvre à chaque exécution.

### 2. Chargement du contexte (lecture en parallèle)

Lis dans un même message :
- `DESIGN.md`
- `AGENTS.md`
- `app/globals.css` (tokens source-of-truth)
- `docs/audits/_template.md`

### 3. Cross-check déterministe

Lance `npm run ds:check` (peut sortir en code 1 — c'est attendu). Capture la sortie. Tu passeras à chaque sub-agent la sous-liste de findings qui concerne les fichiers de sa page (pour qu'il les *référence* sans les re-détecter).

### 4. Dispatch des sub-agents (TOUS EN PARALLÈLE — un seul message, plusieurs `Agent` tool calls)

Pour chaque route découverte, lance un sub-agent `Explore` avec ce prompt (substitue les `<…>`) :

```
Tu audites la page <ROUTE> du portfolio contre son design system. Tu es read-only — tu n'écris aucun fichier. Tu retournes UNIQUEMENT le markdown du rapport comme réponse finale, prêt à être copié-collé tel quel dans docs/audits/<SLUG>.md.

CONTEXTE (intègre-le, c'est ta seule référence — ne re-lis pas ces fichiers depuis le disque) :

=== DESIGN.md ===
<CONTENU INTÉGRAL DE DESIGN.md>

=== AGENTS.md ===
<CONTENU INTÉGRAL DE AGENTS.md>

=== Template à suivre exactement (docs/audits/_template.md) ===
<CONTENU INTÉGRAL DU TEMPLATE>

PAGE À AUDITER : <ROUTE>
- Fichier entry : <PATH page.tsx>
- Composants composés (résous récursivement les imports relatifs depuis ce page.tsx, profondeur max 2) : <LISTE>

FINDINGS DÉTERMINISTES DÉJÀ DÉTECTÉS PAR ds:check (à référencer, pas re-détecter) :
<EXTRAIT FILTRÉ POUR CES FICHIERS — ou "aucun" si vide>

MÉTHODE :
1. Lis le page.tsx + chaque composant composé (Read tool).
2. Pour chaque finding tu confirmes la ligne exacte en relisant le fichier — file:line doit être précis.
3. Coche les 10 axes de la checklist (ci-dessous) systématiquement, même si certains n'ont aucun finding.

CHECKLIST (10 axes, chaque finding avec file:line précis) :

1. Typography tokens — chaque morceau de texte utilise text-h* / text-body* / text-label / text-tag / text-caption ? Hiérarchie correcte (1 h1 par page, h2 pour sections) ?
2. Spacing grid — paddings/gaps/margins via tokens (px-md, gap-sm, py-section…) et alignés sur 4px ?
3. Colors sémantiques — toutes les couleurs via utilities tokens (bg-bg, text-text-primary, border-border, text-text-on-accent sur bg-accent) ?
4. Composants du catalogue — chaque élément interactif passe par Button, Tag, Link, BlueprintShell, frames ? Pas de <button>/<a>/<input> brut Tailwind-stylé ?
5. Composants dupliqués — patterns quasi-identiques implémentés à deux endroits ?
6. Hardcoded values — brackets arbitraires (px-[24px], rounded-[8px]) qui devraient être des tokens ?
7. Hover & motion — hover-supported: partout ? Pas de bare hover: ? Durations via duration-fast/base/slow ?
8. Dark mode parity — couleurs/borders/surfaces qui ne basculent pas en dark ?
9. Règle "1 brand button max par page" — combien de variant="brand" sur cette page ?
10. Responsive — breakpoints cohérents (max-md:, md:max-lg:, lg:) ? Pas de [clamp(…)] ad-hoc non justifié ?

SÉVÉRITÉ :
- high — règle hard d'AGENTS.md violée (hex inline, brackets arbitraires, bare hover, >1 brand button, élément raw stylé)
- medium — token disponible mais pas utilisé
- low — suggestion qualitative (duplication potentielle, hiérarchie ambiguë)

RÈGLES :
- Findings only — aucun fix, aucun diff suggéré
- Classement high → medium → low
- file:line réel et précis (relis le fichier pour confirmer)
- Suis EXACTEMENT le format du template (titres, sections, bullets)
- Date à utiliser dans l'en-tête : <YYYY-MM-DD du jour>

LIVRABLE :
Ta réponse finale doit être UNIQUEMENT le markdown du rapport, commençant par "# DS Audit — <ROUTE>" et se terminant par la section Notes. Aucun préambule, aucun commentaire post-rapport. Je vais copier-coller ta sortie directement dans docs/audits/<SLUG>.md.
```

**Substitutions à faire avant l'envoi :**
- `<SLUG>` = `home` pour `/`, `work-<slug>` pour `/work/<slug>`
- `<ROUTE>` = chemin URL (ex: `/`, `/work/bforbank`)
- `<PATH page.tsx>` = chemin réel du fichier
- `<LISTE>` = composants importés (résolution récursive profondeur 2)
- Colle DESIGN.md, AGENTS.md et le template *intégralement* — gain de tool calls côté sub-agent.
- Date du jour au format ISO

### 5. Écriture des rapports

Quand les sub-agents terminent (tu reçois leurs réponses en parallèle), pour chacun :
1. Vérifie que la réponse commence bien par `# DS Audit —` (sinon, retourne demander à ce sub-agent de re-formater).
2. Écris la réponse telle quelle dans `docs/audits/<SLUG>.md` avec le `Write` tool.

### 6. Agrégation

Une fois tous les rapports écrits :
- Relis les N fichiers que tu viens d'écrire
- Écris `docs/audits/SUMMARY.md` avec :
  - Date du run
  - Tableau : page × counts par sévérité (high / medium / low / total)
  - Top 5 violations transverses (règle qui apparaît sur le plus de pages)
  - Pages les plus saines (0 high)
  - Lien markdown vers chaque rapport individuel

### 7. Résumé final à l'utilisateur

Réponds en français, ton direct sans fioritures :
- Nombre total de findings par sévérité
- Page la plus problématique
- Top 3 actions concrètes recommandées (sans les exécuter — il décide)
- Lien vers `docs/audits/SUMMARY.md`

## Règles dures

- **Ne corrige rien** dans le code source. Findings only. L'utilisateur décide quoi fixer.
- **Pas de Write hors `docs/audits/`.** Aucun edit dans `app/`, `components/`, `content/`.
- **Pas de modification de `scripts/check-design.mjs`** ni de `DESIGN.md`.
- **Tous les sub-agents en parallèle** dans un seul message (gain de temps massif).
- **Les sub-agents ne touchent à rien** — ils retournent du markdown, c'est toi qui écris.
