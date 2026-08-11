# Conformité design-system en dev agent-first

> **Template portable.** Ce document décrit un workflow complet pour garder du code UI
> conforme à un design system quand ce sont des agents IA qui écrivent le code. Il est
> volontairement product-agnostic : copie-le dans n'importe quel repo produit, garde les
> sections utiles, adapte les chemins d'exemple (clairement étiquetés `exemple :`).
>
> Maison du master : `docs/workflows/` du portfolio. Tu peux aussi en garder une copie
> canonique dans ton brain / dotfiles et la dupliquer par produit.

---

## TL;DR

Le problème : un agent qui code de l'UI **hardcode des valeurs** (couleurs, espacements) et
**recrée des composants qui existent déjà**. Un fichier de règles seul ne suffit pas, l'agent
ne le suit pas de façon fiable.

La solution : **defense-in-depth**, plusieurs couches qui se rattrapent.

- **Minimum (solo / petit produit), 3 couches :**
  1. Un **contrat machine-readable** (tokens source unique + composants typés + une surface agent : AGENTS.md/skill).
  2. Une **prévention à l'écriture** (MCP `ds-pilot` : l'agent réutilise composants et tokens avant d'écrire).
  3. Une **gate CI bloquante** (le seul mécanisme qui maintient la conformité dans le temps).
- **Complet (équipe / produit critique), 6 couches :** on ajoute la boucle locale rapide
  (pre-commit), la review sémantique, et le monitoring de drift.

Règle d'or transverse : **une seule source de vérité pour les tokens.** Tout le reste en découle.

---

## Le problème

Les agents génèrent du code plausible, pas du code conforme. Sans garde-fou, ils :

- écrivent `#0A4CF0`, `px-[24px]`, `text-[15px]` au lieu d'utiliser les tokens ;
- créent un `NewCard` alors qu'un `ProjectCard` existe déjà ;
- s'écartent des variants/props prévus parce qu'ils ne les ont pas lus.

C'est le même problème diagnostiqué publiquement par Spotify (Encore), GitHub et Indeed en
2026, et le consensus est clair : **trois types de défense qui se superposent**, pas un seul
fichier. Règles toujours actives (contrat), récupération à la demande (MCP/manifest),
application en CI (lint + a11y + diff visuel).

---

## Principe : le DS est une API, pas un PDF

Un DS écrit pour des humains (un beau fichier de specs) ne contraint pas un agent. Il faut une
**surface lisible par machine** :

- **Tokens** dans un format structuré (CSS custom properties ou DTCG JSON).
- **Composants typés** que l'agent peut interroger (props, variants, defaults).
- **Une surface agent** : `AGENTS.md` / `CLAUDE.md` (règles toujours chargées) + un skill
  (instructions déclenchées au bon moment) + optionnel `llms.txt`.

Chaque couche ci-dessous transforme une partie de ce contrat en garde-fou actif.

---

## Le modèle

| # | Couche | Rôle | Mécanisme concret | Levier |
|---|---|---|---|---|
| 0 | Contrat machine-readable | le DS est une API | tokens (DTCG/CSS) + composants typés + surface agent (`llms.txt` / `AGENTS.md` / skill) | fondation, prérequis du reste |
| 1 | Prévention (authoring) | l'agent compose au lieu d'inventer | MCP `ds-pilot` (`search_components`, `get_token`) + skill déclenché avant tout dev UI | **très haut** (le meilleur fix est celui jamais écrit) |
| 2 | Boucle locale rapide | feedback avant commit | lint rapide (et/ou `lyse audit`) en pre-commit hook | moyen |
| 3 | Gate CI | bloque la régression, non contournable | `lyse add ci-gate` (échoue si score baisse / nouveau hardcode) | **maximal** (le seul qui MAINTIENT dans le temps) |
| 4 | Review sémantique | attrape ce que le statique rate | sous-agent code-review avec lentille DS ("réutilise `<X>` au lieu d'un nouveau composant") | haut sur le subjectif |
| 5 | Monitoring drift | voir la dérive s'accumuler | score `lyse` tracké dans le temps | faible mais évite le prochain big-bang |

### Modèle léger recommandé (solo / petit produit)

Ne fais pas les 6 d'un coup : trop strict = tu débranches en deux semaines. Commence par
**0 + 1 + 3** :

- **0** tu l'as probablement déjà en partie (tokens + composants + un AGENTS.md).
- **1** (`ds-pilot`) est le meilleur rapport effort/impact : le code non-conforme jamais écrit
  est gratuit à corriger.
- **3** (gate CI) est ce qui empêche la dérive de revenir.

Ajoute 2, 4, 5 seulement quand le produit le mérite (équipe, fréquence de changement élevée).

---

## Source unique des tokens (la règle anti-drift)

C'est le point le plus important. **Les tokens doivent vivre à un seul endroit édité à la main.**

- Choisis **une source opérationnelle** : soit tes CSS custom properties (`globals.css` ou un
  `tokens.css`), soit un `tokens.json` DTCG (W3C design tokens).
- Tout le reste est **dérivé** de cette source, jamais maintenu en parallèle :
  - le `DESIGN.md` (la narration lisible) est un **reflet** de la source, regénéré ou
    resynchronisé quand la source change ;
  - l'outil de prévention (`ds-pilot`) **lit directement la source**, pas une copie.

Anti-pattern classique : tokens dans `DESIGN.md` ET dans le CSS ET dans un `tokens.json`, tenus
à la main. Ils divergent en quelques jours (typiquement une couleur d'accent qui n'est plus la
même partout). Si tu vois deux fichiers de tokens édités à la main, tu as déjà un bug latent.

Pratique : la source = ton CSS (c'est ce que le runtime applique vraiment, donc la vérité). Si
tu veux un `DESIGN.md` propre, génère-le depuis le CSS (export), ne le réécris pas à la main.

---

## Couche 0 — Contrat machine-readable

**Quoi.** La fondation lisible par l'agent : tokens (source unique), composants typés, et la
surface agent (`AGENTS.md`/`CLAUDE.md` + skill + optionnel `llms.txt`).

**Pourquoi.** Sans ça, aucune des couches suivantes n'a de référence stable à enforcer.

**Comment.**
- Tokens : voir la règle source unique ci-dessus. Format CSS custom properties ou DTCG JSON.
- Composants : TypeScript typé (props, variants), c'est ce que `ds-pilot` scanne.
- `AGENTS.md` (et symlink `CLAUDE.md` → `AGENTS.md` pour que Claude Code, Cursor, Codex,
  Vercel Agent voient les mêmes règles) : règles anti-drift dures, "réutilise avant de créer".
- `llms.txt` optionnel : index pour agents. `lyse fix --scaffold` peut le générer.

**Réfs.** Google `design.md` (`github.com/google-labs-code/design.md`, `designmd.app`) ;
standard `agents.md` ; blog Vercel "AGENTS.md outperforms skills in our agent evals" (un index
docs compressé dans AGENTS.md a battu des skills à la demande dans leurs évals).

---

## Couche 1 — Prévention à l'écriture (`ds-pilot`)

**Quoi.** `@lyse-labs/ds-pilot` : un serveur MCP qui expose tes composants et tokens à l'agent,
plus un skill `using-ds-pilot` qui dit à l'agent de les consulter avant d'écrire de l'UI.

**Pourquoi.** C'est de la **prévention** : l'agent réutilise `Button` au lieu d'en recréer un,
et trouve `--accent` au lieu de hardcoder une couleur. Le code non-conforme n'est jamais écrit.

**Comment ça compose avec ton workflow de code.** Orthogonal. Que tu utilises Superpowers, les
skills mattpocock, ou du chat brut avec Claude Code, ds-pilot s'ajoute **par-dessus** :

- `npx @lyse-labs/ds-pilot init` ajoute le serveur `ds-pilot` dans `.mcp.json` et installe
  `.claude/skills/using-ds-pilot/SKILL.md`.
- Tu ne modifies **aucun** autre skill. Le skill `using-ds-pilot` a une description
  ("Use when creating or modifying UI components") qui le fait se déclencher tout seul quand
  tu touches de l'UI.

**À quel point c'est automatique.** Le MCP est toujours chargé (outils toujours dispos). Le
skill est un déclenchement **soft** : le modèle l'invoque parce que sa description matche la
tâche, ce n'est pas un hook mécanique garanti à 100%. La garantie dure ne vient pas d'ici, elle
vient de la couche 3.

**Outils MCP exposés :** `search_components`, `get_component_props`, `list_tokens`, `get_token`.

**Caveat tokens (important).** L'auto-détection ne cherche que `tokens.json` / `tokens.css`. Si
tes tokens sont ailleurs (ex : `app/globals.css`), édite `.mcp.json` pour passer
`--tokens ./app/globals.css`. Le scanner CSS de ds-pilot lit **n'importe quel** fichier `.css`
et en extrait tous les `--var: value`. Caveat secondaire : un `globals.css` avec light + dark +
alias `@theme inline` produit des doublons dans `list_tokens`, bruité mais exploitable.

**Install.**
```bash
npx @lyse-labs/ds-pilot init
# puis, si besoin, éditer .mcp.json pour ajouter : --tokens ./chemin/vers/tokens.css
# redémarrer l'agent pour charger le MCP
```

**Réfs.** `github.com/lyse-labs/ds-pilot` (MIT). Alternative plus lourde : Storybook MCP
(`@storybook/addon-mcp`) si tu as déjà des stories.

---

## Couche 2 — Boucle locale rapide (pre-commit)

**Quoi.** Un hook git (husky + lint-staged) qui lance un check rapide avant chaque commit.

**Pourquoi.** Feedback immédiat, avant même de pousser. Rattrape ce que la prévention a laissé
passer.

**Comment.**
- Check rapide maison (hex brut, brackets arbitraires) : un script Node de quelques lignes, ou
  `eslint-plugin-tailwindcss` avec `no-arbitrary-value: error`.
- Ou `lyse audit` (plus large, voir couche 3) si la vitesse reste acceptable.

```bash
# .husky/pre-commit (exemple)
npm run ds:check        # ton lint rapide
# ou: npx @lyse-labs/lyse audit
```

**Note vitesse.** `lyse audit` complet à chaque commit peut ralentir. Préfère le lint rapide en
pre-commit, et garde l'audit complet pour le CI / le périodique.

---

## Couche 3 — Gate CI bloquante

**Quoi.** Un job CI qui **échoue** (bloque le merge) si la conformité régresse.

**Pourquoi.** C'est la seule couche non contournable, donc la seule qui **maintient** la
conformité dans le temps. Une CI "informative" (croix rouge mais merge autorisé) ne tient pas.

**Comment.**
- `lyse add ci-gate` installe un workflow GitHub qui échoue si le Health Score baisse ou si un
  nouveau hardcode apparaît.
- Sinon, ton propre script en `continue-on-error: false` **et** ajouté aux branch protection
  rules (sinon ça reste informatif).

```bash
npx @lyse-labs/lyse add ci-gate
```

**Réfs.** `lyse` sort du SARIF (format lint standard pour le code scanning CI).

---

## Couche 4 — Review sémantique

**Quoi.** Un sous-agent de code-review avec une lentille design system.

**Pourquoi.** Le statique attrape les valeurs hardcodées, pas le jugement ("ce nouveau composant
aurait dû réutiliser `<ProjectCard>`"). C'est du subjectif que seul un reviewer (humain ou agent
avec contexte) attrape.

**Comment.** Dans ta review (PR ou skill `code-review`), passer une consigne DS : "vérifie la
réutilisation des composants existants et la conformité aux tokens, signale toute recréation".

---

## Couche 5 — Monitoring de drift

**Quoi.** Suivre le Health Score dans le temps.

**Pourquoi.** Voir la dérive s'accumuler avant qu'elle ne devienne un gros chantier de
remise à niveau.

**Comment.** `lyse audit` régulièrement (ou en CI nightly), garder l'historique du score.

```bash
npx @lyse-labs/lyse audit   # 0-100 sur 6 axes : tokens, a11y, components, stories, ai-surface, ai-governance
```

---

## À quel point chaque pièce est automatique

| Pièce | Déclenchement | Garantie |
|---|---|---|
| MCP `ds-pilot` | toujours chargé (`.mcp.json`) | outils dispos en permanence |
| skill `using-ds-pilot` | auto, par description, quand tu touches de l'UI | **soft** (le modèle décide), pas 100% |
| lint / `ds:check` | manuel (`npm run`) ou CI | déterministe quand il tourne |
| pre-commit hook | à chaque commit (si installé) | déterministe local |
| gate CI | à chaque PR/push | **dure** (bloque le merge) |

Conclusion : l'authoring (couche 1) réduit le volume de non-conformité, mais c'est la **gate
CI** (couche 3) qui garantit. Ne compte pas sur le skill seul.

---

## Adoption par phases

- **Phase 1 — contrat + prévention.** Source unique de tokens propre, AGENTS.md/skill,
  `ds-pilot` installé et pointé sur la bonne source. Gros impact, peu d'effort.
- **Phase 2 — gate bloquante.** `lyse add ci-gate` (ou ton lint en branch protection). C'est ce
  qui empêche le retour de la dérive.
- **Phase 3 — review + monitoring.** Lentille DS en review, audit périodique avec historique.

---

## Quickstart install

```bash
# 1. Prévention (couche 1)
npx @lyse-labs/ds-pilot init
#    si tokens hors tokens.json/css : éditer .mcp.json -> --tokens ./app/globals.css
#    redémarrer l'agent

# 2. Audit / gate (couches 3 et 5)
npx @lyse-labs/lyse init        # détecte le framework, écrit .lyse.yaml, premier Health Score
npx @lyse-labs/lyse audit       # rejouer l'audit (texte / JSON / SARIF)
npx @lyse-labs/lyse add ci-gate # gate de régression bloquante en CI
npx @lyse-labs/lyse fix         # auto-fix des findings haute confiance (arbre git propre requis)
```

---

## Licences

- `@lyse-labs/ds-pilot` : **MIT**, aucune contrainte.
- `@lyse-labs/lyse` : **dual AGPLv3 / commercial**. Utiliser le CLI comme outil pour auditer ton
  repo (même privé) ne contamine pas ton code livré (c'est un outil, pas une dépendance linkée
  dans le build). À valider selon ton contexte si tu redistribues l'outil lui-même.

---

## Références

**Outils (Lyse Labs)**
- `github.com/lyse-labs/lyse` — audit DS, Health Score 6 axes, fix, ci-gate (AGPL/commercial).
- `github.com/lyse-labs/ds-pilot` — MCP + skill de prévention à l'écriture (MIT).
- `github.com/lyse-labs/lyse-registry` — registry de composants React (shadcn-compatible).
- `github.com/lyse-labs/lyse-bench` — corpus public et reports de calibration.
- `getlyse.com` — produit Lyse.

**Skills / workflow (bntvllnt)**
- `github.com/bntvllnt/agent-skills` — collection de skills via `skills.sh`, dont un skill
  `workflow` (spec-first, quality-gated : plan, spike, ship, fix, review, done).
- `github.com/bntvllnt/claude-plugins` + `codebase-intelligence` — MCP d'analyse de code.

**Contrat machine-readable**
- `github.com/google-labs-code/design.md`, `designmd.app` — format DESIGN.md (Google).
- `agents.md` — standard AGENTS.md.
- Blog Vercel "AGENTS.md outperforms skills in our agent evals".
- W3C Design Tokens (DTCG) ; SARIF (format de findings CI).

**Workflow de code (compatibles, orthogonaux)**
- `github.com/obra/superpowers` — Superpowers.
- Skills mattpocock (TypeScript / dev).

**Enforcement / a11y / visuel**
- `eslint-plugin-tailwindcss` (`no-arbitrary-value`, `no-custom-classname`).
- `axe-core` / Pa11y — a11y runtime.
- Storybook MCP (`@storybook/addon-mcp`) — alternative plus lourde à ds-pilot.
- Spotify Encore "AI-ready design system" (intodesignsystems) — étude de cas.

**Réfs locales (ce repo)**
- [docs/research/portfolio/workflow-analyse.md](../research/portfolio/workflow-analyse.md) — l'article "We Stopped Using Figma".
- [docs/research/portfolio/design-system.md](../research/portfolio/design-system.md) — le brief de décision DS.
