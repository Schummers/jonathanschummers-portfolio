# Notes — Contenu expériences (design v7 verrouillé)

> Source de contenu pour le profil + les 3 blocs expérience du CV.
> Layout arbitré et figé : `docs/cv/ui/cv-v7-design-md.html` (A4 strict, 1 page, 2 colonnes).
> Dernière mise à jour : 2026-06-01 — alignement sur la structure v7 + challenge contre les research (`docs/research/cv-market/`).

## Structure v7 (référence)

- **Header** : photo · nom · titre `Senior Product Designer with PM skills (6y+)` · Luxembourg · portfolio + LinkedIn + email.
- **Profile** : bloc pleine largeur, 1 paragraphe `.lead` (~3 lignes, ~330 caractères max).
- **Expérience** (colonne principale, 3 blocs) : Valoris · TotalEnergies — Digital Factory · Avanade.
- **Sidebar** : Real Estate Expertise (card) → Certifications → Teaching → Education → Languages. **Plus de section Tools** : les outils s'embarquent dans les bullets (cf. challenge §7).

Structure d'un bloc XP en v7 :

```
[Société]              [Période]
[Rôle · ]              [Ville]
[Phrase summary — primary, em autorisé]
• bullet 1 … • bullet 4
```

✅ **Descriptif société = pas de ligne dédiée.** Décision : le descriptif est porté par la **ligne société elle-même** (`TotalEnergies · Digital Factory`, `Avanade · Accenture-Microsoft JV`). Suffisant pour la lisibilité internationale, pas de ligne contexte en plus.

---

## 0. Méta-règles (capturées en session, à appliquer partout)

### Règle de hiérarchie visuelle (rappel des priorités du user)

Ordre d'importance visuelle souhaité dans un bloc expérience :
1. **Nom de la société** ← ressort le plus
2. **Phrase d'explication de la société** ← ressort, et **doit être visuellement proche du nom de la société** (proximité = clé)
3. Tagline du rôle ("l'explication ultra" — selon ses mots)
4. **Rôle** ← ressort moins
5. **Bullet points** ← ressortent moins aussi

→ Le user a explicitement dit que **rôle ET bullets** doivent être plus discrets. Pas seulement le rôle. À tester sur la prochaine itération de layout.

### Règle de structure des bullets (capturée en session)

Pour chaque expérience importante (TotalEnergies notamment), structurer les bullets en 2 temps :

1. **Contexte projet** (ce qu'est le produit, le défi, la dimension data/AI/ML)
2. **Contribution Jonathan via design + product management** (le ROI personnel)

> Citation : *"il faut dire comment moi à l'aide du design et du product management j'ai inspiré ça, j'ai aidé ça."*

→ Ne pas mélanger les deux angles dans un même bullet — séparer.

### Règle de spécificité du descriptif société

> Citation : *"il faut que ce soit à leur spécifique, il faut que ce soit proche du nom de la société."*

→ Le descriptif société doit être **spécifique** (pas générique) et **visuellement proche** du nom (pas relégué après plusieurs autres lignes).

→ Implication layout : tests 02, 04, 05, 07, 10 respectent ce principe. Tests 01, 03, 06, 08, 09 le respectent moins bien.

### Règle de recalibrage du Profile (résumé du CV)

> Citation : *"je crois que le résumé la réorientation sur un property management saa for individual landlord."*

→ **Le bloc PROFILE (résumé) en haut du CV doit être réorienté autour de "property management SaaS for individual landlords"**. C'est une instruction sur le top-of-CV, pas seulement sur le bullet Valoris.

**⚠️ Ancien draft (périmé — mots bannis + redondances v7) :**
> "Senior Product Designer with 6 years on 0→1 SaaS in industry, finance and now proptech — building Valoris... **Data-driven and AI-native**... Licensed real estate professional... Past clients **via Avanade: TotalEnergies**, BforBank, Spie Batignolles."

Problèmes (cf. challenge §7) : `data-driven` + `AI-native` sont bannis par la research ; le header v7 affiche déjà le titre et la sidebar le statut RE (redondance) ; « TotalEnergies via Avanade » est faux (bloc XP séparé).

**Draft base ✅ VALIDÉ (research-clean, ~330 car., 3 needles tech / impact / forward) :**
> "Product designer and founder building Valoris, an AI assistant for landlords managing their own property. Six years on 0→1 software in energy, heavy industry, and finance: a refinery tool used by 500 inspectors, a bank onboarding ranked first of 51 in Google's 2023 benchmark. Now I research, design, and code with Cursor and Claude Code."

**Variante Dubai (remonte le combo real estate — cf. playbook §7) :**
> "Licensed real estate professional and product designer building Valoris, an AI assistant for landlords managing their own property. Six years shipping 0→1 software, now applied to proptech, plus a 15-property family rental portfolio I run in Luxembourg. I research, design, and code with Cursor and Claude Code."

### TBD — éléments à compléter après cette session

- **Smart Integrity** : la partie spécifique "ce que J. a fait en UX/PM" (le user a dit "Tout ça je vais te le dire encore après")
- **Nob** : idem, à confirmer si on a la même séparation contexte/contribution
- **Pivot marché Valoris** : ambiguïté à lever (cf. §1 ci-dessous)
- **Liste exacte des 4 databases** Smart Integrity (PIA + lesquelles ?)

---

## 1. Valoris

### Title et positionnement

- **Title role :** `Founder` (honnête, pas "Product Builder" — trop niche).
- **Sub-position à caser quelque part :** Product Designer & Product Manager. *Pas en avant, mais doit transparaître que c'est sa création — pas un poste salarié.*
- **Idée :** Founder en role-name, et la nature design+PM se voit dans les bullets et la tagline (incarnée plutôt que listée).

### Tagline — angle "OpenAI of property management"

L'angle narratif souhaité :
> Un personal AI assistant pour les particuliers qui gèrent leur immobilier — l'équivalent ChatGPT/OpenAI flow, mais appliqué à la gestion locative.

**Drafts de tagline (à arbitrer) :**

- **Drafted A — direct :**
  > "AI-native property management assistant for individual landlords — agent-first workflow, solo build (research, design, code)."

- **Drafted B — analogie :**
  > "Building the personal AI assistant for individual landlords — chat-first, agent-first, document-aware."

- **Drafted C — sobre :**
  > "An AI-native property management SaaS for individual landlords — research, design and frontend coded solo."

→ Préférence personnelle : **A** (clair, sans analogie risquée). Mais B a plus de punch si on assume l'angle "ChatGPT for landlords".

### Histoire / pivot à raconter dans les bullets

Deux pivots récents à valoriser :
1. **Marché :** ⚠️ **AMBIGUÏTÉ À LEVER** — le user a dit deux choses contradictoires en session :
   - *"je suis passé de luxembourg au marché français la cible"* → Luxembourg → France
   - *"passer de la France à Luxembourg à la France"* → France → Luxembourg → France
   → Probablement la 2e (parcours réel : a essayé France au démarrage, replié sur Luxembourg car réseau local + portfolio familial, puis recentré sur France après research = marché plus gros). À confirmer en 1 ligne avec lui.
2. **Produit :** documentation/data extraction tool → **AI agent-first workflow** (chat-first, conversation-led, "OpenAI of property management" angle)

**Méthode utilisée pour valider ces pivots :**
- Interviews qualitatives avec landlords FR + LU
- Campagne **Meta ads** pour tester les positionnements / capter signal de demande
- Itération sur la value proposition à partir des taux de clic / leads

**Bullets candidats (à raffiner) :**

- "Pivoted from a documentation tool to an **agent-first AI workflow** after research surfaced that landlords want guidance, not just storage — validated through user interviews + Meta ads campaigns."
- "Repositioned target market from **Luxembourg → France** based on research-led signal of demand."
- "Solo build: discovery, product strategy, design system, frontend coded with Cursor + Claude Code."
- "Insider perspective via 15-property family rental portfolio — turning real-world rental ops pain points into shipped features."

### Stack Valoris

`Figma · Cursor · Claude Code · Notion · Obsidian · Meta Ads Manager`

---

## 2. TotalEnergies — Smart Integrity (the corrosion risk tool)

### Contexte projet (à expliquer en tagline)

Smart Integrity = un produit data + ML pour la **maintenance préventive corrosion** sur les pipes de raffineries TotalEnergies.

**Le défi technique :**
- **4 databases industrielles** à connecter (PIA + 3 autres outils industriels)
- Travail de **data mapping** pour unifier les schémas et qu'on puisse alimenter le ML
- L'objectif business : prédire le niveau de corrosion → prioriser les inspections et la maintenance préventive

**Le rôle Jonathan — TBD :**
- ⚠️ **À COMPLÉTER** — le user a dit en session : *"Après il y a toujours ce que moi j'ai fait et la partie UX et tout. Tout ça je vais te le dire encore après."*
- Donc la séparation **(a) contexte projet → (b) contribution UX/PM Jonathan** doit être finalisée quand le user m'aura donné ses bullets précis sur ce qu'il a fait.
- Acquis pour l'instant : participation au **data mapping** (pas juste design — vraie compréhension des schémas industriels), design produit du tool d'inspection, discovery avec inspecteurs terrain.

**Bullets candidats (provisoires, à enrichir avec le contenu UX que le user fournira) :**

- *(Contexte)* "**Smart Integrity** — corrosion-prevention SaaS powered by **machine learning** on data unified from 4 industrial databases (PIA + 3 others), deployed to **500 inspectors across 4 refineries**."
- *(Contribution J.)* "Co-designed the **data mapping** layer that fed the ML corrosion model — turning siloed industrial data into a single inspection priority list."
- *(Contribution J.)* "Discovery with field inspectors → translated industrial domain knowledge into a UX surfacing preventive maintenance opportunities first."
- *(KPI)* "**−6% refinery pipe leaks** post-rollout."

### Stack Smart Integrity (côté projet)

`Figma · Hotjar · CloudWatch · Miro · ML/data pipelines (data mapping context)`

---

## 3. TotalEnergies — Nob (the power plant monitoring SaaS)

### Contexte projet

Nob = monitoring SaaS pour les centrales **éoliennes et solaires de France** (TotalEnergies renouvelables).

**Scope technique :**
- Connecter **toutes les centrales éoliennes + solaires de France** — angle **scalabilité** explicite (un seul outil pour la flotte renouvelable nationale entière)
- Connecter les équipements de chaque centrale (capteurs, automates)
- Servir une **petite équipe d'inspection / monitoring** centrale → ratio "users / scale du parc géré" très favorable

**La couche AI/ML :**
- **Prédiction de pertes** (perte de production en kWh) en fonction de :
  - Statut des équipements
  - Données météo (vent, irradiation, etc.)
  - Production précédente (historique)
- **Connexion aux prix de l'électricité en temps réel** → calcul de la **perte en € prédite**
- → Aide à **prioriser les interventions sur site** par valeur économique

**Le rôle Jonathan — TBD :**
- ⚠️ **À COMPLÉTER** — comme pour Smart Integrity, la partie UX/PM précise ("ce que moi j'ai fait") sera détaillée par le user dans une prochaine session.
- Acquis pour l'instant : Senior PD sur le produit + participation à la définition de comment afficher la prédiction → ROI inspection.

**Bullets candidats (provisoires) :**

- "**+23% kWh tracked per operator** — revamped Nob, the power-plant monitoring SaaS for **all French wind & solar plants**, in dark mode."
- "Designed the **ML loss-prediction interface**: equipment status × weather × production history → predicted kWh loss × live electricity prices → predicted **€ loss** ranking inspection priorities."
- "Single source of truth for a small inspection team monitoring assets across the entire French renewable fleet."

### Stack Nob

`Figma · Hotjar · CloudWatch · Miro · ML loss-prediction context`

---

## 4. Total Digital Factory — angle Product Management (transverse)

### Le contexte d'organisation

- **Product Owners venaient du métier** (operators, ingénieurs maintenance, etc.) — experts domaine mais **sans compétences PM/PO**
- Jonathan jouait le rôle de **proxy PO** en plus de Senior Product Designer
- Donc apport PM réel et structurant dans tous les projets

### Skills PM à valoriser

Les "core skills" PM/PO que Jonathan portait sur ces projets :
- **Roadmap definition** (trimestrielle, MVP → multi-country scale)
- **User mapping** / journey mapping
- **User story writing** + acceptance criteria
- **Backlog management** + grooming
- **Product slicing** (découpage produit en lots livrables)
- **Tracking adoption** des outils (KPIs métier)
- **Tracking valeurs business** (kWh, leak rate, etc. — les KPIs portfolio)

### Bullets candidats (transverse Total Digital Factory)

À placer dans le tagline ou en bullet "ownership" :

- "Acted as **proxy Product Owner** alongside business-expert POs — owning roadmap definition, user story writing, backlog management and product slicing."
- "Tracked **business value adoption** post-launch (kWh, leak rate, operator adoption) to feed back into the next roadmap cycle."
- "Bridged business expertise (industrial PO) and product execution — defining what to ship, when, and what to measure."

→ **Note de cadrage :** le proxy PO est l'angle qui prouve la séniorité PM **sans avoir le titre PM**. C'est exactement ce que Gargash voudra entendre. Pour DAMAC, c'est moins critique mais ça reste un edge.

---

## 5. Hiérarchie nouvelles infos pour la tagline TotalEnergies

**Hypothèse de tagline TotalEnergies refondue :**

> "Senior Product Designer + proxy Product Owner on **4 industrial SaaS** for 500+ field operators — discovery, design system, ML interfaces (corrosion risk + renewable loss prediction) and data-driven iteration in a 20-person studio."

→ Plus dense mais raconte tout : seniorité, PM, scale users, projets ML concrets, méthode.

Alternative plus courte :

> "Senior PD + proxy PO on 4 industrial SaaS — including **Nob** (ML loss prediction across all French wind & solar plants) and **Smart Integrity** (corrosion risk ML on unified industrial data)."

---

## 6. Synthèse — ce qu'il reste à arbitrer

### Forme

1. ~~**Layout de bloc expérience**~~ → ✅ **résolu** : v7 verrouillée (`cv-v7-design-md.html`).
   Reste ouvert : ligne descriptif société (cf. §7.3) + accent `#0E86AF` vs décision monochrome Gulf (cf. §7.2).

### Contenu

2. **Title Valoris** : `Founder` seul, ou `Founder · Product Designer & Product Manager` ? → v7 affiche `Founder · Product Designer`.
3. **Tagline Valoris** : drafted A / B / C ?
4. **Tagline TotalEnergies** : version dense (proxy PO + ML projects) ou version courte (juste les 2 projets phares Nob + Smart Integrity) ?
5. **Niveau de détail ML** : on assume "machine learning" en clair dans les bullets (~~ou "data-driven"~~ — banni, cf. §7.1).
6. **Pivot Valoris** : on raconte explicitement le pivot Luxembourg → France + documentation → agent-first, ou on garde implicite ?
7. **Méthode Meta ads pour validation** : on le sort en bullet (signal d'autonomie research + GTM) ou trop niche ?

---

## 7. Challenge research (2026-06-01) — confronté à `docs/research/cv-market/`

> Les research (`ats-2026`, `senior-pd-pm-playbook`, `dubai-real-estate-freelance`) confirment certains choix et en contredisent d'autres. Verdicts :

### 7.1 Vocabulaire banni — à corriger dans tous les drafts
Bannis explicitement (coupés en <20 s par les recruteurs, poids ATS nul) : **data-driven, AI-native, spearheaded, passionate, agile, lean, results-focused, proven track record**, + le « AI slop » (delve, pivotal, showcasing, intricate, realm).
→ Les 3 drafts de profil existants (notes §0.4, playbook §3.2, context-handoff §5.1) utilisent tous `data-driven` et/ou `AI-native`. Bannis. Profil base réécrit en §0.4.

### 7.2 v7 = version « direct human / Gulf », PAS version ATS
`ats-2026` est catégorique : 2 colonnes + photo + couleur + labels créatifs = score parsing effondré (cas réel : 35/100 sur Greenhouse). La v7 est parfaite pour **transmission directe** (Marco → Gargash/DAMAC, marché Gulf où la photo est attendue). Pour toute candidature via plateforme/ATS → **2e version single-colonne, texte brut, sans photo, sans couleur** (même contenu, deux skins).
→ ✅ **2 colonnes conservées** + accent `#0E86AF` **conservé** (la décision « monochrome pour Gulf » du context-handoff §6 est annulée).
→ TODO : produire la variante ATS single-col quand on candidate hors-réseau.

### 7.3 Descriptif société — ✅ résolu
Hustle Badger : « hirers didn't recognise any of the companies » → contexte employeur nécessaire à l'international. **Décision : porté par la ligne société** (`TotalEnergies · Digital Factory`, `Avanade · Accenture-Microsoft JV`), pas de ligne contexte séparée. Suffisant.

### 7.4 Formule de bullet — confirmée
Verbe d'action + scope (users/sites/pays) + outil/méthode nommé + métrique. Pas de liste de responsabilités, pas de bullet sans chiffre, 2 lignes max, 2-5 bullets/rôle. Aligné avec le skill `writing-style`. La structure « contexte projet / contribution J. » (§0) reste valable, MAIS le bullet « contexte » doit aussi porter une métrique ou migrer dans le descriptif société (sinon c'est de la description, pas un achievement).

### 7.5 IA : nommer les outils, montrer la boucle, jamais « ChatGPT »
La research valide l'angle Valoris : Cursor + Claude Code + MCP, avec une boucle métier fermée + métrique (ex. « X transcripts/itération, discovery passée d'une semaine à une demi-journée »). Ne jamais écrire « ChatGPT » ni « prompt engineering » seul. → Taglines Valoris (§1) bien orientées ; ajouter une métrique de gain.

### 7.6 Certifications PSPO — nuance
Hustle Badger coupe le PSPO sur un CV PM stratégique (lit « delivery-focused »). Ici le PSPO sert l'angle « PM skills / proxy PO » (titre v7). → Garder pour les cibles design+PM / proxy-PO ; reconsidérer pour un poste purement stratégie produit.

### 7.7 Real estate dans le profil (cibles Gulf)
playbook §7 : citer la licence RE + le portefeuille familial **dans le summary**, pas en certif perdue, pour les cibles immobilier/family office. → Justifie la **variante Dubai du profil** (§0.4).

### 7.8 Tailoring obligatoire
Règle d'or des 3 sources : jamais de CV neutre. Une variante header + profil + ordre des bullets par cible (Gargash fractional / DAMAC CDI interne / freelance proptech EU). Le profil base sert de tronc commun.

---

## 8. Arc narratif + compétences transverses (brain dump 2026-06-01)

### Principe directeur
- **Clarté > exhaustivité.** Moins énumérer de projets, plus faire ressortir les **points communs** (les compétences récurrentes).
- **Densité sémantique ATS.** Chaque compétence transverse = un keyword qui doit apparaître **littéralement** quelque part : `user research`, `workshop facilitation`, `UX/UI design`, `Scrum`, `design system`, `data pipeline`, `data mapping`, `product management`, `roadmap`, `backlog`.
- **Outils embarqués dans le texte**, jamais en liste flottante (pas de section Tools — cf. §7.5).

### Arc en 3 temps
| Bloc | Ce que ça raconte |
|---|---|
| **Avanade** | *J'ai appris le métier* : product design = user research + design UX/UI + Scrum, sur des clients enterprise multiples. La fondation craft. |
| **TotalEnergies — Digital Factory** | *Vibe startup 0→1 dans une major* : sole designer + **proxy PO**, produits **très data / ML** (pipelines, data mapping), impact business mesuré. |
| **Valoris** | *Full ownership PM + PD* : workflow **100% data + IA** (Cursor, Claude Code), research → strategy → design → frontend, solo. |

→ Progression lisible : apprendre le craft → l'étendre + prendre l'ownership produit sur du data/ML complexe → tout porter de bout en bout avec l'IA.

### Compétences transverses à couvrir (et où)
| Compétence (keyword) | Avanade | Total | Valoris |
|---|:--:|:--:|:--:|
| User research (interviews, tests) | ● | ● | ● |
| Workshop facilitation (Lean UX, Design Studio) | ○ | ● | ○ |
| UX/UI design | ● | ● | ● |
| Scrum / agile delivery | ● | ● | |
| Design system | ● (foundations) | ● | ● (solo) |
| Data : pipelines, data mapping, ML interfaces | | ● | ● |
| « Data-driven » (sans le mot — dire : metrics-led, instrumented, ML-powered) | ○ | ● | ● |
| IA dans le workflow (Cursor, Claude Code, MCP) | | | ● |
| Product management (roadmap, backlog, user stories, slicing, proxy PO) | ○ | ● | ● |

● = porteur principal · ○ = secondaire

> ⚠️ **« Data-driven » est banni (§7.1)** mais le *concept* est central pour Total + Valoris. Le dire autrement : `built on data pipelines`, `data mapping`, `ML-powered`, `metrics fed the roadmap`, `instrumented with analytics`.
> ⚠️ **Valoris manque de métriques dures** (cf. §1) : combler avec scope validé (interviews FR+LU, campagnes Meta ads, vitesse de build solo).

---

## 9. Contenu validé par bloc (destiné à la v7)

### Avanade · Accenture-Microsoft JV — Product Designer · Paris · Jan 2020 - Jun 2022

**Summary ✅ validé :**
> I delivered on scope and on time across the full design process for enterprise clients like BforBank, Sodexo, Chanel, and Schneider Electric.

> ⚠️ La parenthèse skills (`user research, workshop facilitation, visual design, design systems`) a été retirée pour gagner de l'espace. **Keywords ATS perdus** — à récupérer ailleurs : `research` revient chez Total/Valoris, `design system` aussi, mais `workshop facilitation` n'apparaît plus nulle part. À surveiller pour la variante ATS.

**Bullets ✅ validés :**
- Designed BforBank's mobile app onboarding (84 screens); the flow ranked **first of 51 banks** in Google's 2023 Finance UX benchmark.
- Co-designed Spie Batignolles' construction app (60 screens), connecting site crews' workflows to a complex ERP and replacing **3 legacy tools with a single interface** (50/50 with another designer).

**Décision finale :** intro gardée lean (pas de « in agile squads ») — Scrum/agile reste couvert implicitement par « enterprise clients » + le contexte squads de Total.

---

## 10. Décisions design v7 (session 2026-06-01)

> Toutes appliquées dans `docs/cv/ui/cv-v7-design-md.html`. La réconciliation avec le DS canonique (`globals.css`) est repoussée à plus tard.

### Typo
| Élément | Réglage final | Token |
|---|---|---|
| Profile `.lead` | 12px / 400 / primary (testé en 14px puis **remis en body**) | `--text-cv-body` |
| Société `.co` | 14px / 600 / primary, Space Grotesk (porte le descriptif : `TotalEnergies · Digital Factory`, `Avanade · Accenture-Microsoft JV`) | `--text-body-sm` |
| Rôle `.role` | 11px / 400 / secondary | `--text-cv-meta` |
| Période / Ville | 11px / 400 / tertiary | `--text-cv-meta` |
| Summary `.summary` | 12px / 400 / **primary** | `--text-cv-body` |
| Bullet `.bullet` | 12px / 400 / **secondary** (bullets discrets) | `--text-cv-body` |
| Métrique `.bullet strong` | **500 / primary** (pop par la couleur sombre sur le gris) | — |

→ Hiérarchie intra-bloc portée par la **couleur** (summary primary ressort, bullets gris reculent) + les métriques sombres en ancre de scan. Pas de jeu sur la taille/poids de la summary.

### Spacing / layout
- Summary → bullets : **16px** (`--sm`)
- Puce → texte : **4px** (`--2xs`)
- Gap colonnes : **32px** (`--lg`)
- Sidebar : **232px** (+16px), main : **450px**

### Override couleur (hors DS — à réconcilier plus tard)
- `--text-secondary` : `#71717b` → **`#66666f`** (−10%)
- `--text-tertiary` : `#9f9fa9` → **`#92929b`** (−8%)
- Raison : gain de lisibilité des bullets gris + lignes meta. Le DS d'origine (handoff) prévoyait même `#52525c` pour secondary.

### MAJ 2026-06-01 (suite — session « bloc Total + stack »)

**Nouveau composant : stack tools + skills (par expérience)**

Ligne meta sous les bullets de Total et Valoris : embarque outils + méthodes en 2 lignes scannables. Assume un écart à la décision §7.5 (« pas de section Tools, outils dans les bullets ») — choix user.

| Élément | Réglage final | Token |
|---|---|---|
| `.stack` margin-top (dernier bullet → stack) | **12px** | hors token (entre `--xs` 8 et `--sm` 16) |
| `.stack` gap (TOOLS ↔ SKILLS) | **8px** | `--xs` |
| `.stack-line` (items / valeurs) | 11px / **500 medium** / tertiary / `line-height:1` | `--text-cv-meta` |
| `.stack-line` alignement | `display:flex; align-items:center` (centre verticalement le label 8px dans la ligne) | — |
| `.stack-k` (label TOOLS / SKILLS) | **8px / 700 bold** / uppercase / `letter-spacing:0.08em` / **secondary** | hors token (8px) |
| `.stack-k` margin-right (label → items) | **8px** | `--xs` |

Contenu :
- Total : `Tools` Figma · Miro · Hotjar · CloudWatch — `Skills` User research · Story mapping · Scrum · Design system
- Valoris : `Tools` Figma · Cursor · Claude Code · Notion · Meta Ads Manager — `Skills` Product discovery · Product strategy · Frontend · Design system

**Spacing — remplace les valeurs « Spacing / layout » ci-dessus**
- Profile : marge **haut + bas 32px** (`--lg`) — était 40px.
- Summary → bullets : **12px** — était 16px (`--sm`).
- Entre chaque bullet : **8px uniforme** (`--xs`). Le trick grouping 4px intra-produit / 12px inter-produit a été testé puis **abandonné** (classe `.sep` retirée du CSS, reste inerte dans le HTML — à nettoyer).
- `.xp-list` : **gap dynamique** (`flex:1; justify-content:space-between`) → remplit la hauteur restante, l'inter-expérience s'auto-ajuste (plus de gap fixe).
- `.xp-head` gap : 2px · `.id-contact` gap : 4px (`--2xs`).

### MAJ 2026-06-04 (session « bloc Total finalisé ») — REMPLACE la MAJ 2026-06-01 ci-dessus

> La MAJ 2026-06-01 (stack 2 lignes tools+skills, label 8px, gap dynamique) est **périmée**. État canonique ci-dessous.

**Structure finale**
- **Skills** = une ligne inline **sous chaque expérience** (Total, Valoris, Avanade), label `SKILLS:` + items.
- **Tools** = section unique **en bas de sidebar**, en **pills** (réutilise `.tag` du DS). Plus de tools inline.

**Spacings verticaux — canon.** Séquence dans un bloc : `2 → 8 → 16 → 8 → 20`, et `40` entre expériences.

| Entre… | Valeur | Source |
|---|---|---|
| Nom société ↔ Rôle | **2px** | `.xp-head gap: 2px` |
| Rôle ↔ Summary | **8px** | `.xp-head margin-bottom: --xs` |
| Summary ↔ 1er bullet | **16px** | `.summary margin-bottom: 16px` |
| Entre bullets | **8px** | `.bullets gap: --xs` |
| Dernier bullet ↔ Skills | **20px** | `.stack margin-top: 20px` |
| Entre expériences | **40px** | `.xp-list gap: --lg-plus` |
| Profile haut + bas | **32px** | `header` + `.profile margin-bottom: --lg` |

**Typo / style**
- `.summary` : 12px / **500 medium** / primary (medium pour qu'elle ressorte).
- `.co` (nom société) : **15px** / 600 / Space Grotesk (était 14px `--text-body-sm`).
- `.stack-k` (label skills) : **9px** / 700 / uppercase / `letter-spacing:0.08em` / secondary, + `::after { content:":" }` → rend `SKILLS:`.
- `.stack-line` (items skills) : 11px / **400 regular** / **primary** / `flex; align-items:center; flex-wrap:wrap`.
- `.sk-sep` (séparateur skills) : `margin: 0 6px` (~12px entre skills) / tertiary.
- `.tag` (pills Tools) : **10px** / 500 / primary / border 1px `--border` (léger) / radius **6px** / padding **3px 8px** ; `.tags gap: --2xs`. (Option A, retenue parmi 4 variantes testées.)
- `--text-secondary` : `#66666f` (**−10%** vs DS `#71717b`).

**Contenu skills**
- Total : `Product vision / strategy · Data mapping · Adoption tracking · Design system`
- Valoris : `Product discovery · Product strategy · Frontend · Design system`
- Avanade : `User research · Workshop facilitation · Visual design`
- Tools (sidebar) : `Figma · Cursor · Claude Code · Notion · Miro · Hotjar · CloudWatch`

⚠️ **Valoris bullets = placeholder provisoire réaliste** (founder AI assistant landlords, pivot agent-first, Meta Ads, frontend Cursor/Claude Code, portefeuille 15 biens) — **à remplacer en session Valoris dédiée**.

### Dette technique à nettoyer
- Mini serveur de preview jetable : `docs/cv/ui/_preview-server.cjs` + entrée `static-docs` dans `.claude/launch.json` → **à supprimer en fin de projet CV**.
- Override couleur + valeurs off-DS → décider si on les remonte dans le DS ou si elles restent spécifiques au CV.
- **Off-DS à réconcilier** : `.co` 15px · `.stack-k` 9px · `.tag` radius 6 + padding 3/8 · `.stack` margin-top 20px · `--text-secondary` −10% = hors échelle/tokens DS.
- Classe `.sep` orpheline dans le HTML (bullets) → retirer les `class="sep"` résiduels.
