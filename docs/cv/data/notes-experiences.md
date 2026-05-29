# Notes — Contenu expériences (à injecter après arbitrage layout)

> Capture des nouveaux éléments de contenu donnés en session. À transformer en bullets/taglines une fois le layout des blocs arbitré.

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

À retravailler dans la v5 :
> Draft profile pivoté :
> "Senior Product Designer with **6 years on 0→1 SaaS** in industry, finance and now proptech — building **Valoris**, a property management SaaS for individual landlords. Data-driven and AI-native: research, design and frontend coded with Cursor + Claude Code. Licensed real estate professional in Luxembourg, managing a 15-property family rental portfolio. Past clients via Avanade (Accenture-Microsoft JV): TotalEnergies, BforBank, Spie Batignolles."

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

1. **Layout de bloc expérience** → arbitrage via `CV_layout_tests.html` (10 variantes)

### Contenu

2. **Title Valoris** : `Founder` seul, ou `Founder · Product Designer & Product Manager` ?
3. **Tagline Valoris** : drafted A / B / C ?
4. **Tagline TotalEnergies** : version dense (proxy PO + ML projects) ou version courte (juste les 2 projets phares Nob + Smart Integrity) ?
5. **Niveau de détail ML** : on assume "machine learning" en clair dans les bullets ou on reste à "data-driven" ?
6. **Pivot Valoris** : on raconte explicitement le pivot Luxembourg → France + documentation → agent-first, ou on garde implicite ?
7. **Méthode Meta ads pour validation** : on le sort en bullet (signal d'autonomie research + GTM) ou trop niche ?
