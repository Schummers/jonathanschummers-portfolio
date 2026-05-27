# Audit technique DESIGN.md & écosystème agent-first design system

**Contexte** : Audit pour Product Designer freelance solo (Luxembourg, FR/BE), portfolio Next.js 15 + TS + Supabase + Tailwind v4 + shadcn/ui, budget ~1 semaine. Date : 25 mai 2026.

---

## TL;DR (3 bullets décisionnels)

- **DESIGN.md existe vraiment** (Google Labs, Apache 2.0, github.com/google-labs-code/design.md), mais il est en **alpha depuis ~1 mois et non 6 mois** (open-source 21–23 avril 2026, pas mars 2026 — mars 2026 = introduction du *concept* dans Stitch). L'adoption hors sphère Google/Anthropic est **émergente mais pas standard** : aucun agent (Claude Code, Cursor) ne le charge automatiquement, et la skill `frontend-design` d'Anthropic ne le consomme **pas encore** (issue #1008, ouverte le 22 avril 2026, non mergée).
- **Pour un portfolio solo, l'overhead d'une stack à 3 fichiers (CLAUDE/AGENTS.md + DESIGN.md + COMPONENTS.md) n'est pas justifié.** Ta pile shadcn/ui + Tailwind v4 fait déjà 80 % du travail via `registry:base` + `cssVars.{theme,light,dark}` (dual-mode natif, spec-compliant). Un DESIGN.md court (≤200 lignes) + AGENTS.md léger suffit.
- **Plusieurs prémisses du brainstorm sont fausses ou non-vérifiables** : pas de "Workflow 2026 report" public identifiable, pas de "wiki Anthropic" publiant les conventions, Spec Kit n'est pas un projet Anthropic (c'est GitHub), pas de lien officiel établi entre DTCG Resolver Module et DESIGN.md. Voir Red Flags en fin de rapport.

---

## Réponses individuelles aux 47 questions

> Légende confiance : **V** = vérifié source primaire ; **P** = probable, source secondaire convergente ; **S** = spéculatif ; **N** = non-vérifiable depuis l'extérieur.

### CATÉGORIE A — DESIGN.md est-il vraiment la norme émergente ? *(haute priorité)*

**A1. Adoption réelle.** **V/P.** Le repo officiel `google-labs-code/design.md` est réel, Apache 2.0, ouvert le 21–23 avril 2026 (annonces convergentes : blog.google, creativeainews, mindwiredai, pasqualepillitteri.it). Le compagnon communautaire `VoltAgent/awesome-design-md` a été lancé le **31 mars 2026** (simplenews.ai : *« VoltAgent released the awesome-design-md repository on March 31, 2026, accumulating 4,385 GitHub stars within three days »*) et cumule désormais **83,3 k stars / 10 k forks** (GitHub et trendshift.io, mai 2026) — exceptionnel pour 2 mois. **Mais** : (a) ces fichiers sont des *snapshots extraits* de sites publics, pas des DESIGN.md committés à la racine du repo de Stripe, Linear, Vercel — c'est de la "vitrine virale" ; (b) une recherche GitHub `filename:DESIGN.md` retourne majoritairement des fichiers *design document* sans rapport (ex. `littlefs-project/littlefs/DESIGN.md` = doc d'architecture filesystem). **Conclusion : adoption "marketing virale" forte, adoption réelle en production très récente, non quantifiable hors démos.**

**A2. Concurrents.** **V.** Tous existent et sont matures :
- **Style Dictionary** (Amazon, v4 supporte DTCG nativement, 14 color spaces DTCG, plugin `sd-tailwindcss-transformer`).
- **DTCG tokens.json natif** : spec stable **v2025.10 sortie le 28 octobre 2025** (Penpot, Figma, Sketch, Framer, Knapsack, Supernova, zeroheight implémentent).
- **Tokens Studio for Figma** : export DTCG natif via toggle dans le plugin.
- **AGENTS.md enrichi** : **OpenAI a co-fondé l'Agentic AI Foundation (Linux Foundation) le 9 décembre 2025 avec AGENTS.md comme contribution fondatrice**. Communiqué LF : *« AGENTS.md has been adopted by more than 60,000 open source projects and agent frameworks including Amp, Codex, Cursor, Devin, Factory, Gemini CLI, Github Copilot, Jules and VS Code among others. »* (linuxfoundation.org/press, 9 déc. 2025). C'est de loin le standard le plus mature et adopté.
- **shadcn/ui registry:base + cssVars** : `registry-item.json` accepte `cssVars: { theme, light, dark }` nativement → c'est un format DESIGN.md-like JSON spécialisé Tailwind v4, déjà mature.

**A3. Overhead justifié pour un solo ?** **P (analyse).** Non, pas en V1. Le ROI d'un DESIGN.md formel se manifeste quand (a) plusieurs agents/contributeurs travaillent sur le projet ou (b) plusieurs projets partagent le système. Pour un portfolio solo de ~10-20 pages, un Markdown structuré + `app/globals.css` + composants typés couvrent le besoin. **Seuil de pertinence : si tu prévois de cloner ce DS sur ≥ 2 projets clients, alors DESIGN.md prend du sens.**

**A4. Alpha & support outillage.** **V.** Le repo affirme explicitement : *« The DESIGN.md format is at version alpha. The spec, token schema, and CLI are under active development. Expect changes to the format as it matures. »* (github.com/google-labs-code/design.md). **L'alpha n'a pas 6 mois mais ~1 mois** (depuis le 21 avril 2026). Stitch a introduit le concept en mars 2026 mais l'open-sourcing date d'avril.

Support effectif dans les outils :
- **Stitch** : support natif (lecture/écriture, exports).
- **Claude Code** : *« plain Markdown — any agent that reads project files can use it »* (designmd.app). **Pas de mécanisme automatique** ; il faut référencer le fichier dans CLAUDE.md ou prompt explicite.
- **Cursor** : pareil — Cursor lit `.cursor/rules/*.mdc` automatiquement, **pas DESIGN.md**. Le contenu doit être référencé par un rule pour être chargé.
- **Anthropic skills `frontend-design`** : ne le consomme **pas encore**. Issue #1008 (marcusjezweb, 22 avril 2026) est une *suggestion ouverte*, non mergée : *« Suggestion: extend the frontend-design skill to optionally consume or produce a DESIGN.md file following the format Google Labs just shipped as an open spec on 2026-04-22 »*.

**Verdict : déclaratif > fonctionnel pour l'instant.**

**A5. Signal business pour clients.** **P (jugement).** Invisible pour 99 % des prospects (PME, agences). Légèrement visible pour : (a) clients tech / lead designers / agences AI-native, (b) recruteurs d'équipes qui adoptent Claude Code / Cursor. Sur le marché BE/LU/FR, attendre **< 1 % de prospects qui en feraient un critère**. Néanmoins, **un README court décrivant la méthode** (« mon portfolio est construit avec un DESIGN.md agent-first, generated by Claude Code ») devient un mini case-study de modernité techno-design : effet de signal indirect non négligeable pour le positionnement.

---

### CATÉGORIE B — Dark mode *(haute priorité — la question la plus disputée)*

**B1. Pourquoi aucun exemple dual-mode dans awesome-design-md ?** **V (faits) / P (interprétation).** La collection (Apple, Stripe, Vercel, Linear, Figma…) capture *un mode dominant* parce que ce sont des *snapshots extraits* — le repo le dit explicitement : *« The extracted design tokens represent publicly visible CSS values »*. Vercel/Cursor/Raycast sont dark-only marketing ; Apple/Stripe sont light-only marketing. La raison principale est donc **(a) sites mono-mode par choix marketing**. Mais aussi : **(b) la spec DESIGN.md actuelle ne définit pas de mécanisme normatif pour les modes** — le YAML front matter prévoit `colors:` comme `map<string, Color>` plat. Aucun précédent canonique dans la spec → personne ne sait quelle convention choisir → tout le monde reste mono-mode. **(c)** correct : aucun cas public dual-mode documenté à ce jour.

**B2. Option H "modes.dark" inventée — précédent ?** **V/P.** **Aucun précédent dans la spec DESIGN.md officielle** (la spec n'a ni `modes:` ni `themes:`). Précédents dans d'autres écosystèmes : DTCG Resolver Module 2025.10 (`set`/`sources`/`reference`), shadcn `cssVars.light/dark`, Tokens Studio plugin theming. **Conseil : ne pas inventer une extension propriétaire qui pourrait entrer en collision avec la convention officielle quand elle sortira.** Soit (1) attendre l'officialisation, soit (2) suivre la convention shadcn v4 (déjà la convention de facto sur ta stack).

**B3. DTCG Resolver Module ↔ DESIGN.md.** **V (statut) / S (lien officiel).** Le Resolver Module existe et est publié comme **draft v2025.10** (designtokens.org/tr/drafts/resolver/), édité par Florian Rivoal et Elika Etemad (fantasai), avec mention *« This is a preview draft of in progress changes. Do not refer to this document directly, and do not implement anything in this document. »* La spec DTCG v1 elle-même est stable depuis le 28 octobre 2025 (annonce W3C Community : *« Design Tokens specification reaches first stable version »*). **Cependant** : je n'ai trouvé **aucune communication officielle** de Google Labs liant DESIGN.md au Resolver Module ou l'annonçant comme "the way forward". **Cette prémisse du brainstorm est non-vérifiée (S).**

**B4. DESIGN.md + DESIGN.dark.md + `diff`.** **P/S.** Le CLI `npx @google/design.md diff DESIGN.md DESIGN.dark.md` existe vraiment et émet un JSON de diff token-level. Mais il est conçu pour comparer des **versions temporelles**, pas des **modes**. Détourner pour la cohérence light/dark fonctionnerait mais reste un hack non-canonique : pas de précédent OSS. Risque d'invention propriétaire.

**B5. Primitives + sémantiques (style DTCG).** **V (faisabilité).** C'est l'architecture mainstream 2026 : zinc-900/blue-600 = primitives fixes, `--color-text-primary`/`--color-surface` = sémantiques redéfinies par mode. Cela mappe exactement sur la convention shadcn v4 (`cssVars.light` / `cssVars.dark`) et sur Tailwind v4 `@theme` + overrides dans `.dark`. **C'est la solution la plus mature et la moins risquée pour ta stack.**

**B6. ROI du dual-mode pour un portfolio ?** **P (jugement).** iCreationsLAB (*Dark Mode Web Design: A Complete 2026 Guide*) écrit : *« A rough benchmark from our project history: implementing a well-tested dark mode on an existing website of moderate complexity (30–50 pages, custom UI components) adds approximately 25–40% to the original front-end development budget. »* Ce benchmark concerne des sites **existants en retrofit** (30–50 pages). Sur ton portfolio neuf (10–20 pages) avec Tailwind v4 + shadcn cssVars, l'overhead est plutôt **5–10 %** si la fondation est posée dès le départ. **Recommandation : pour un portfolio *design*, le dark mode est un signal d'attention au détail. Implémente-le, mais en mode "system preference + toggle simple", sans inventer de format.**

---

### CATÉGORIE C — Architecture multi-fichiers *(haute priorité)*

**C1. Trio CLAUDE.md + DESIGN.md + system.md plus efficient qu'un seul ?** **P/S.** Pas d'étude publique comparative sur le taux de dérive d'agent avec 1 vs 3 fichiers. Le consensus communautaire (HumanLayer, Anthropic docs, deployhq, Cursor community) recommande **CLAUDE.md court (≤80–100 lignes), une instruction = une décision** : *« Your CLAUDE.md file should contain as few instructions as possible — ideally only ones which are universally applicable »* (HumanLayer). Multi-fichiers (`docs/`, `agent_docs/`) chargés à la demande > monolithe. **Pour solo : 1 AGENTS.md + 1 DESIGN.md (si adoption) + référence vers `docs/` pour le reste. Un fichier `system.md` ou `COMPONENTS.md` séparé est un overhead non-justifié.**

**C2. system.md vs COMPONENTS.md.** **S.** Aucune convention émergente claire en mai 2026. Anthropic publie `SKILL.md` (pattern propriétaire Claude Skills) et reconnaît AGENTS.md, mais **pas de convention "system.md" ni "COMPONENTS.md"** dans la doc officielle Claude Code (code.claude.com/docs/en/overview). La triade canonique en 2026 est plutôt **AGENTS.md (behavior) + SKILL.md (tâches) + DESIGN.md (visuel)** (cf article dev.to/aws-builders, *« AGENTS.md, SKILL.md, DESIGN.md: How AI Instructions Split into Three Layers »*).

**C3. Coût mensuel ~15k tokens × 50 sessions.** **V (prix).** Source primaire : *« Pricing for Sonnet 4.6 starts at $3 per million input tokens and $15 per million output tokens »* (anthropic.com/claude/sonnet, mai 2026, confirmé par CloudZero). 15 000 tokens × 50 sessions = 750 000 tokens input/mois → **≈ $2,25 / mois sans prompt caching**. Avec prompt caching activé (90 % de réduction sur les cache hits = $0,30/MTok), ça tombe à **~$0,30 / mois**. **Coût négligeable. Ce n'est pas un argument financier.**

**C4. Auto-loading par les agents ?** **V — point crucial.**
- **CLAUDE.md** : chargé **automatiquement** par Claude Code à chaque session si présent à la racine. *« CLAUDE.md is a markdown file you add to your project root that Claude Code reads at the start of every session »* (code.claude.com/docs/en/overview).
- **AGENTS.md** : reconnu et chargé automatiquement par Claude Code, Codex, Cursor, Gemini CLI, Windsurf, Copilot. Standard Linux Foundation depuis décembre 2025.
- **DESIGN.md** : **pas de chargement automatique**. Aucun outil ne le lit sans instruction explicite. Sa "magie" passe par une référence dans CLAUDE.md/AGENTS.md du type *« Always consult DESIGN.md before writing UI »*.

**→ Ton intuition "ça ruine l'argument agent-first" est partiellement juste.** Pour que DESIGN.md soit vraiment "agent-first" il faut soit (a) un support natif des outils (en discussion, issue #1008 Anthropic skills), soit (b) une déclaration dans AGENTS.md/CLAUDE.md. **Pour ta stack : ajouter une ligne dans AGENTS.md suffit.**

**C5. Atomic Design en 2026.** **V/P.** Brad Frost lui-même est cité (qt.io, *« Atomic Design Systems: Why the Labels Don't Matter »*) : *« The specific labels (atoms, molecules, organisms, templates, and pages) have never been the point, and we don't really use them in our work. But they're still useful as a mental model. »* Les DS matures 2026 (Material 3, Linear, Radix, shadcn) **n'utilisent pas la taxonomie atomique en surface** : Material 3 organise par tokens (ref/sys/comp), Radix par primitives, shadcn par registry types (`registry:ui`, `registry:component`, `registry:block`, `registry:hook`, `registry:theme`, `registry:base`). **Verdict : utilise la taxonomie shadcn par cohérence avec ta stack ; ne nomme pas tes dossiers `atoms/molecules/organisms` en 2026.**

---

### CATÉGORIE E — Cohérence globals.css ↔ DESIGN.md *(haute priorité)*

**E1. Générateurs automatiques.** **V.** Plusieurs voies opérationnelles :
1. **`npx @google/design.md export --format css-tailwind DESIGN.md > theme.css`** — émet un bloc `@theme { ... }` Tailwind v4 compatible (vérifié sur le README officiel : *« emits a CSS @theme { ... } block with CSS custom properties »*).
2. **`npx @google/design.md export --format dtcg DESIGN.md > tokens.json`** → injectable dans Style Dictionary v4 (support DTCG natif).
3. **Style Dictionary** + `sd-tailwindcss-transformer` (nado1001) — pipeline mature pour Tailwind v3, à adapter pour v4.
4. **MCP servers** (`yajihum/design-system-mcp`, `southleft/design-systems-mcp`) pour exposer les tokens à l'agent à la volée.

**E2. Tooling recommandé pour DESIGN.md → CSS variables → Tailwind v4.** **P (jugement).** Le chemin **le plus court et le moins fragile** : `DESIGN.md` → CLI `export --format css-tailwind` → import direct dans `app/globals.css` via `@import`. Pas de Style Dictionary nécessaire si tu restes mono-cible Tailwind. Style Dictionary devient pertinent si tu vises **plusieurs cibles** (web + iOS + Android) — pas ton cas.

**E3. Tailwind v4 ↔ DESIGN.md natif ?** **V.** Pas de plugin officiel Tailwind pour DESIGN.md. Mais Tailwind v4 expose `@theme { ... }` comme convention, et le CLI Google Labs **émet précisément du `@theme` v4**. **C'est une intégration de fait sans plugin nécessaire.** Issue #15 sur le repo Google Labs demande même un format `--format css-vars` pur (`:root { --ds-* }`) pour les consommateurs non-Tailwind.

---

### CATÉGORIE F — `lint:tokens` profondeur *(haute priorité)*

**F1. Linters matures (vs regex naïf).** **V.** Plusieurs alternatives matures :
- **`stylelint-plugin-carbon-tokens`** (IBM Carbon) — règles AST-based (`theme-use`, `motion-duration-use`, `type-use`, `layout-use`). Couplé à Carbon.
- **`@kong/design-tokens/stylelint-plugin`** — règle `use-proper-token` AST-based, configurable pour tes propres tokens.
- **`stylelint-design-tokens-plugin`** (LasaleFamine) — générique, lit ton tokens.json et vérifie.
- **`@semcore/stylelint-plugin`** (Intergalactic) — `design-tokens` rule extensible.
- **`stylelint-plugin-mozilla` no-base-design-tokens** — interdit les tokens primitifs au profit des sémantiques (très pertinent pour ton cas).

**F2. Faux positifs/négatifs regex vs AST.** **P (sans benchmark public formel).** Une regex `#[0-9a-f]{3,8}` génère des faux positifs (commentaires, strings, valeurs autorisées dans des contextes spécifiques) et passe à côté de `rgb()`, `hsl()`, `oklch()`, valeurs Tailwind utilities `bg-[#ff0000]`. Un linter AST connaît la propriété CSS et le contexte. **Pour un portfolio solo, un script regex *bien limité* (uniquement sur `.css` files, exclude commentaires) suffit ; la valeur ajoutée d'un linter AST devient nette si > 30 composants.**

**F3. MCP server pour tokens.** **V.** Plusieurs MCP servers existent :
- **`southleft/design-systems-mcp`** — search + recherche sémantique de connaissances DS.
- **`yajihum/design-system-mcp`** — expose component props + design tokens (Style Dictionary) à Claude/Cursor.
- **Pattern DIY** (learn.thedesignsystem.guide) — wrapper MCP autour de fichiers tokens locaux, permet à l'agent de demander *« What's the value of colors.primary.blue? »* sans deviner.
- **Figma Dev Mode MCP server** (beta juin 2025) — pour ceux qui ont une source Figma (pas ton cas).

**Pas de MCP officiel pour DESIGN.md spécifiquement.** Pour un solo, c'est **overkill en V1**.

---

### CATÉGORIE D — Langue (anglais vs français)

**D1. Agents pires en français pour génération UI ?** **N (pas de benchmark public spécifique UI-fr).** Les LLM actuels (Claude Sonnet 4.6, GPT-5.x) sont multilingues robustes mais leur corpus d'entraînement design-system est massivement anglophone. Conséquence empirique : les noms de tokens/variables/composants sont systématiquement attendus en anglais. **Recommandation : DESIGN.md en anglais (technique), copies marketing/portfolio en français.**

**D2. Friction de revue avec prospects francophones.** **P.** Tes prospects BE/LU/FR **ne liront pas ton DESIGN.md** (98 %+). Zero friction. Seul cas pertinent : un CTO/lead dev qui audit ton workflow — il s'attendra à de l'anglais.

**D3. Bilingue EN + FR.** **S (aucun précédent connu).** Pas trouvé d'exemple OSS d'un DESIGN.fr.md ou DESIGN.md + DESIGN.fr.md. **Inutile pour un solo, surcoût maintenance non-justifié.**

---

### CATÉGORIE G — Composants au-delà du catalogue

**G1. Code Connect Figma pour un solo sans Figma ?** **P (analyse).** Code Connect est conçu pour design+dev teams avec source Figma. **Ton cas (solo, code-first, no Figma source) est explicitement hors scope.** À ignorer.

**G2. JSDoc/TSDoc remplace COMPONENTS.md ?** **P.** Oui largement. Les agents Claude/Cursor lisent les types TS et JSDoc et en déduisent les props/comportements. Pour un solo avec ~20 composants typés, JSDoc + types > COMPONENTS.md séparé. Le COMPONENTS.md devient utile si tu as plus de 50 composants ou si tu publies une lib.

**G3. shadcn registry vs DESIGN.md — binaire ou complémentaire ?** **V — complémentaire.** shadcn `registry-item.json` capture **le quoi** (composants, files, dependencies, cssVars `light`/`dark`), DESIGN.md capture **le pourquoi** (philosophie, principes, do/don't). Ce sont des artefacts à des niveaux différents. **Sur ta stack, shadcn registry est plus mature et déjà spec-aligned ; DESIGN.md vient en couche de "rationale" prose au-dessus.**

---

### CATÉGORIE H — Cible des "~400 lignes"

**H1. Taille optimale DESIGN.md.** **S (pas d'étude formelle).** Pas de benchmark public sur la taille optimale. Convention empirique du repo `awesome-design-md` : fichiers ≈ 200-500 lignes. La spec Google n'impose pas de limite mais recommande explicitement : *« Brevity makes the file more useful, not less »* (mindstudio.ai).

**H2. ~10k tokens suffit-il ?** **P.** 10k tokens = ~7 500 mots = ~30 pages markdown. C'est **beaucoup pour un portfolio**. Linear DS public ≈ équivalent 6-8k tokens. **Réduire à 3-5k tokens (≈150-200 lignes)** suffira et économisera du contexte.

**H3. Chunking sections vs monolithe.** **V (faisable) / P (pertinent).** Faisable via MCP (yajihum/design-system-mcp) ou via découpage `docs/design/colors.md`, `docs/design/typography.md` + référencement. **Pour un solo : monolithe court > chunking MCP** (overhead infra > bénéfice).

---

### CATÉGORIE I — Lyse Plan→Ship→Analyze process

**I1. Lyse en production.** **V (existence) / N (cas externes).** getlyse.com est réel : plugin Figma + webapp connecté à Linear/Jira/GitHub/GitLab. Le framework Plan→Ship→Analyze est documenté sur leur blog (*« We Stopped Using Figma »*). **Aucun case study public sur des projets autres que Lyse lui-même** ; pas de témoignage SaaS tiers en mai 2026.

**I2. Spec Kit vs Lyse.** **V — correction importante.** Spec Kit est un projet **GitHub** (speckit.org, github.com/github/spec-kit), **pas Anthropic**. Le brainstorm de l'utilisateur attribue à tort Spec Kit à Anthropic (confusion possible avec le "Plan phase" de Claude Code, qui est un concept distinct). Spec Kit est plus mature que Lyse (v0.1.4 février 2026, templates pour Copilot/Claude Code/Gemini CLI/Cursor/Windsurf, communauté plus large, agent-agnostic).

**I3. Compatibilité DESIGN.md ↔ Plan→Ship→Analyze.** **P (analyse).** Indépendants. Plan→Ship→Analyze est un *processus*, DESIGN.md est un *artefact*. Tu peux adopter l'un sans l'autre. Si tu adoptes Plan→Ship→Analyze plus tard, DESIGN.md devient un input de la phase Plan.

---

### CATÉGORIE J — Migration mécanique

**J1. 808 lignes FR → 400 lignes EN.** **P (workflow).** Workflow recommandé : (1) prompt Claude Sonnet 4.6 *« traduis ce DS en anglais et compacte à ~200-400 lignes en respectant la spec DESIGN.md de Google Labs (docs/spec.md), maintain factual decisions, drop philosophical sections »*, (2) `npx @google/design.md lint` sur le résultat (validation structurelle + WCAG), (3) revue humaine pour critical decisions et ton intentionnel. **Temps réaliste : 1-2 jours.**

**J2. Decision log (18 items).** **P (jugement).** Trois options :
- (a) Section `## Decisions Log` dans DESIGN.md : pollue le contexte agent.
- (b) **`DECISIONS.md` séparé** + référence dans AGENTS.md (« consult DECISIONS.md for rationale ») : **recommandé**.
- (c) Git tags + commits structurés : trop friable.

**J3. Versioning DESIGN.md.** **P.** La spec officielle utilise `version: alpha` en YAML. Pour ton usage : **`version: 1.0.0` semver** dans le front matter + git log pour le grain fin. Le CLI `diff` détecte les régressions token-level si tu veux automatiser.

---

### CATÉGORIE K — Risques & compatibilité

**K1. Abandon DESIGN.md par Google (12 mois).** **P (jugement).** Probabilité réelle compte tenu de l'alpha status. **Mitigation** : (a) générer du DTCG en parallèle (`export --format dtcg`) — c'est la spec stable W3C ; (b) ton vrai source-of-truth doit être `app/globals.css` (Tailwind v4 `@theme`), DESIGN.md étant un sur-fichier déclaratif. Migration coût : **1-3 jours** (le DTCG export est trivial à transformer ou à intégrer dans Style Dictionary).

**K2. Fork communauté vs Google.** **S.** Pas de fork à ma connaissance. Risque réel mais non matérialisé. Watchlist : github.com/google-labs-code/design.md issues + designmd.app + getdesign.md + getlyse.com.

**K3. Migration extension `modes.dark`.** **P.** Si Google officialise une mécanique différente (`themes:` ou Resolver Module-style), ton extension privée doit être migrée. Coût : **2-4 heures** sur un fichier de 400 lignes. **Risque tolérable** mais argument supplémentaire pour ne pas inventer une extension propriétaire.

**K4. Bugs `npx @google/design.md lint`.** **N.** Pas de tracker public de bugs majeurs en mai 2026. L'outil est en alpha → s'attendre à des faux positifs sur WCAG (ratios calculés sans tenir compte des opacités composées) et règles structurelles qui évolueront. La note Windows du README est révélatrice : *« when invoking the CLI directly from a package.json script (rather than through npx), use the designmd alias instead of design.md »* — friction concrète.

---

### CATÉGORIE L — Long-terme stratégique

**L1. Texte vs MCP dans 2 ans.** **P (prospective).** Forte probabilité que les MCP servers (Figma MCP officiel beta juin 2025, MCP standard Anthropic 2025, donation Linux Foundation décembre 2025) **dominent les workflows en équipe** d'ici 2-3 ans. Pour un solo *code-first* sans Figma, le **format texte reste plus simple et durable** : versionnable git, lisible humain, portable cross-tool, zero infra.

**L2. Portfolio = DS exemplaire vs case studies polies vs les deux ?** **P (jugement business).** Pour un Product Designer freelance, **la priorité business est (b) case studies polies**, pas (a) DS infra. Tes prospects regardent : (1) screens des projets, (2) processus de pensée, (3) résultats clients. Le DS infra est invisible. **Recommandation : 70 % temps case studies, 30 % temps DS infra (juste assez pour que Claude Code génère du UI cohérent).**

**L3. Figma source à construire ?** **P.** Pour un portfolio *code-first* déjà en prod, **non**. Construire un Figma "miroir" du code = double maintenance sans valeur ajoutée pour un solo. Garde code-first ; si un client demande un livrable Figma, fais-le à la demande.

---

### CATÉGORIE M — Tokens spécifiques (audit méthodologie)

**M1. Dead tokens (accent-muted, accent-subtle).** **N (code privé).** Méthodologie d'audit en 3 commandes :
```bash
# Pour chaque token, grep récursif
grep -rE "(accent-muted|accent-subtle|--sem-radius-pill)" \
  --include="*.{ts,tsx,css,md,mdx}" .
# Si occurrences == 0 ou == 1 (déclaration seule) → token mort
```
Alternative automatique : **Tailwind v4 production build** ne génère QUE les utilities effectivement utilisées (avec `@theme { ... }` non-static). Tokens non-utilisés n'apparaissent pas dans le CSS bundle → dead-code automatique.

**M2. `--sem-radius-pill (3px)`.** **N (même méthodologie).** Remarque sur la valeur : 3px pour un radius "pill" est inhabituel — un vrai pill utilise `9999px` (capsule). Si l'intention est "subtle rounded", renomme en `--radius-subtle` ou `--radius-xs` pour clarté agent.

**M3. Motion 150/300/400 vs Material 3.** **V — bonne nouvelle.** Tes valeurs sont alignées Material 3. Source primaire (material-foundation/material-tokens/json/motion.json) :
- `short3 = 150ms` ✅ (ton "fast")
- `medium2 = 300ms` ✅ (ton "base")
- `medium4 = 400ms` ✅ (ton "slow")

Les courbes d'easing M3 officielles à adopter :
- `emphasized = cubic-bezier(0.2, 0, 0, 1)`
- `emphasized.accelerate = cubic-bezier(0.3, 0, 0.8, 0.15)`
- `emphasized.decelerate = cubic-bezier(0.05, 0.7, 0.1, 1)`
- `legacy.standard = cubic-bezier(0.4, 0, 0.2, 1)`

**Recommandation : adopte ces courbes Material 3 explicitement dans ton DESIGN.md.**

**M4. `--sem-*` vs `--color-*` (Tailwind v4 namespace).** **V — important.** Tailwind v4 **génère automatiquement** des utilities depuis certains namespaces : `--color-*` → `bg-*`/`text-*`, `--font-*`, `--text-*`, `--leading-*`, `--tracking-*`, `--font-weight-*`, `--radius-*`, `--spacing-*`. **Si tu nommes tes tokens `--sem-color-text-primary`, Tailwind ne génèrera PAS d'utility `text-text-primary`.**

Convention 2026 :
- Pour utilities Tailwind auto-générées : utilise `--color-*`, `--radius-*`, `--spacing-*` directement.
- Pour aliases sémantiques sans utility : `--sem-*` ou `--ds-*` OK, à utiliser via `var()` dans CSS custom ou dans `@theme inline`.

**→ La convention shadcn v4 est `--background`, `--foreground`, `--primary`, `--primary-foreground` sans namespace, mappés via `@theme inline { --color-background: var(--background); }` dans globals.css.** C'est la convention de facto sur ta stack et la plus durable.

---

### CATÉGORIE N — Méta : triage hallucinations

**N1. Triage du brainstorm.** Framework :
- **(V) Vérifiable et vérifié** : nom de produit, repo GitHub, prix API, valeur de spec citable.
- **(P) Plausible mais non-confirmé** : tendances, jugements, sans citation directe.
- **(S) Inventé / hallucination** : prémisses sans source identifiable.

Application au brainstorm :
- **V** : DESIGN.md, awesome-design-md, Lyse, DTCG v1 stable, Spec Kit (≠ Anthropic), Style Dictionary v4, Tailwind v4 `@theme`, Material 3 motion tokens, shadcn registry, AGENTS.md Linux Foundation, Claude Design (Anthropic Labs, lancé 17 avril 2026).
- **P** : adoption "norme émergente" (réelle mais surévaluée), conventions multi-fichiers, taille optimale ~400 lignes.
- **S** : "Workflow 2026 report", "Anthropic wiki des conventions", "alpha depuis 6 mois", Spec Kit attribué à Anthropic, "Resolver Module annoncé en octobre 2025 comme way forward pour DESIGN.md".

---

## Red Flags / Vérification des hallucinations

| Prémisse brainstorm | Status | Réalité vérifiée |
|---|---|---|
| « DESIGN.md alpha depuis mars 2026 (~6 mois) » | **Faux** | Concept introduit dans Stitch en mars 2026, **open-source 21–23 avril 2026** → ~1 mois en mai 2026 |
| « Workflow 2026 report » qui recommande trio CLAUDE+DESIGN+system.md | **Non-vérifiable** | Pas de rapport public identifiable. Probable invention ou article de blog non-canonique. |
| « Anthropic wiki des conventions » qui dirait que la convention est `system.md` | **Non-vérifiable** | Anthropic ne maintient pas de wiki public des conventions. Sources officielles = code.claude.com et github.com/anthropics/skills |
| « Spec Kit est un projet Anthropic » | **Faux** | Spec Kit = projet GitHub (speckit.org, github.com/github/spec-kit), agent-agnostic |
| « DTCG Resolver Module annoncé en octobre 2025 comme "the way forward" pour DESIGN.md » | **Non-vérifiable** | Resolver Module en draft v2025.10, oui. Aucune annonce officielle ne le lie à DESIGN.md |
| « Option H (modes.dark) a un précédent OSS » | **Faux** | Aucun précédent identifié dans la spec DESIGN.md ni les exemples OSS |
| « Aucun des 70+ exemples awesome-design-md n'a de dual-mode » | **Vrai** | Confirmé : snapshots mono-mode, le repo l'écrit explicitement |
| « `npx @google/design.md` CLI existe avec lint/diff/export » | **Vrai** | Vérifié : repo officiel, CLI `@google/design.md` publiée sur npm |
| « Code Connect Figma adapté à un solo sans Figma » | **Faux** | Code Connect est explicitement conçu pour teams design+dev avec source Figma |
| « Anthropic publie skill frontend-design qui consomme DESIGN.md » | **Faux** | Skill existe (github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md), **mais ne consomme PAS DESIGN.md**. Issue #1008 est une suggestion ouverte, non mergée |

---

## Scénarios à arbitrer (4 chemins distincts)

### Scénario 1 — "DESIGN.md complet, full adoption"
- DESIGN.md ~300-400 lignes EN, racine du repo, spec compliance maximale.
- AGENTS.md court (≤50 lignes) référençant DESIGN.md + DECISIONS.md.
- Pipeline : `npx @google/design.md export --format css-tailwind > app/theme.css` → import dans globals.css.
- Lint CI : `@google/design.md lint` + `stylelint-design-tokens-plugin`.
- Dual mode : extension custom `modes.dark` (risque K3 accepté).
- **Temps : 4–6 jours.** **Pour qui** : tu veux un cas d'étude technique fort à montrer dans tes case studies.
- **Risques** : alpha format, refactoring potentiel en cas d'évolution spec, extension propriétaire à migrer.

### Scénario 2 — "Minimal : AGENTS.md only + globals.css"
- AGENTS.md ≤80 lignes : stack, conventions, design principles, do/don't.
- Source-of-truth = `app/globals.css` (Tailwind v4 `@theme`) + shadcn `cssVars.{light,dark}`.
- Pas de DESIGN.md, pas de COMPONENTS.md séparé.
- **Temps : 1–2 jours.** **Pour qui** : tu veux ship rapide, ne pas dépendre d'un format alpha.
- **Risques** : si DESIGN.md devient un standard de facto fort, tu rates le wagon. Mitigation : `export --format dtcg` plus tard est trivial.

### Scénario 3 — "Hybride : shadcn registry + DESIGN.md léger" *(recommandé)*
- DESIGN.md ≤200 lignes EN : philosophy, color roles, type scale, motion (M3-aligned), do/don't. Prose intentionnelle > YAML overdose.
- AGENTS.md ≤60 lignes référençant DESIGN.md + shadcn registry.
- Source-of-truth = `registry.json` + `cssVars.{theme,light,dark}` (shadcn convention, déjà mature et spec-aligned).
- Pas de mécanisme custom `modes.dark` — délégué à shadcn cssVars.
- Lint : `stylelint-design-tokens-plugin` ciblé sur le shadcn theme.
- Motion tokens explicitement Material 3 (150/300/400 ms, easing emphasized).
- **Temps : 2–3 jours.** **Pour qui** : tu veux le meilleur des deux mondes — signal modernité + maturité technique.
- **Risques minimaux**, **upside réel.**

### Scénario 4 — "Attendisme : monitor + capitalize plus tard"
- Aucune adoption immédiate. AGENTS.md léger suffit.
- Watchlist 3 mois : (a) issue Anthropic skills #1008 mergée ? (b) Cursor support natif DESIGN.md ? (c) DTCG Resolver Module promu stable ? (d) Google Labs sort une v1 ou une beta DESIGN.md ?
- Revisite en août 2026.
- **Temps : 0 jour.** **Pour qui** : tu veux focus 100 % case studies maintenant.
- **Risques** : pas de signal "tech-forward" sur ton portfolio dans les 3 mois.

---

## Recommandations finales (BLUF)

1. **Adopte le Scénario 3 (Hybride).** Il maximise le ratio signal/coût pour un freelance solo : modernité DESIGN.md sans inventer d'extension propriétaire, en s'appuyant sur la convention shadcn (déjà spec-compliant pour le dual-mode et mature dans ta stack).
2. **N'invente pas `modes.dark`.** Utilise `cssVars.light` / `cssVars.dark` shadcn — c'est mainstream, spec-compliant DTCG-style, supporté nativement par Tailwind v4 + shadcn registry:base.
3. **Garde DESIGN.md court (≤ 200 lignes).** La prose intentionnelle vaut plus que des tokens exhaustifs : *« Brevity makes the file more useful, not less »* (Google Labs spec).
4. **Source-of-truth = `app/globals.css`.** DESIGN.md est un sur-fichier déclaratif ; en cas d'abandon Google ou de pivot spec, ton CSS reste intact.
5. **Aligne motion sur Material 3** (150/300/400 ms, courbes emphasized vérifiées source primaire). Coût zéro, signal qualité fort.
6. **Mesure de succès** : à fin de semaine, tu dois pouvoir prompter Claude Code *« add a new case study page using DESIGN.md »* et obtenir du UI cohérent du premier coup ≥ 80 % du temps. Si non, simplifie le DESIGN.md.
7. **Seuil de revisite (août 2026)** : si l'une de ces 3 conditions est vraie, passe au Scénario 1 :
   - Issue Anthropic skills #1008 mergée (frontend-design skill consomme DESIGN.md nativement).
   - Cursor ou Claude Code ajoutent un auto-load DESIGN.md à la racine.
   - DESIGN.md sort de l'alpha (v1.0 ou beta stable).

---

## Caveats

- **DESIGN.md est en alpha vraie (~1 mois en mai 2026).** N'investis pas plus de 1 semaine sur l'infra DESIGN.md.
- **Le brainstorm initial mélangeait des prémisses solides** (DESIGN.md, awesome-design-md, Tailwind v4, prix API) **et des hallucinations** (« Workflow 2026 report », « wiki Anthropic », Spec Kit attribué à Anthropic, alpha 6 mois, modes.dark précédent OSS). Cf section Red Flags.
- **Aucune étude formelle ne quantifie le gain de cohérence agent avec/sans DESIGN.md.** Le consensus est expérientiel (Divya Patel sur Medium, designproject.io, wavespeed.ai blog) et donc anecdotique.
- **Sur le marché BE/LU/FR** : signal modernité DESIGN.md = effet marginal pour 99 % des prospects. Investissement à justifier sur (a) ton plaisir technique, (b) ton positionnement long-terme, ou (c) un mini-case-study autonome à raconter — pas sur un ROI commercial direct.
- **AGENTS.md, pas DESIGN.md, est le vrai standard** établi en mai 2026 (Linux Foundation, 60 000+ projets). Si tu dois choisir UN seul fichier agent-first, c'est AGENTS.md.