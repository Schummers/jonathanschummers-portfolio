# Homepage Design — Portfolio Jonathan Schummers

> Spec validee le 2026-03-24. Reference pour l'implementation en etape 3 de la roadmap.

---

## 1. Vue d'ensemble

Site single-page avec case studies comme seules pages separees. La homepage EST le site — hero, projets, temoignages, about, contact. Pas de page About ni Contact separee.

**Architecture :**
```
/                    Homepage (toutes les sections)
/work/[slug]         Case study (nod, valoris, bforbank, spie-bat, smartintegrity, malaama)
```

**Langue** : Anglais (tout le site)
**Ton** : Direct, confiant, zero bullshit. Pas de jargon marketing.
**Localisation** : Based in Luxembourg, working remotely.

---

## 2. Structure de la homepage (ordre des sections)

```
1. Nav (sticky)
2. Hero (copy gauche + photo droite)
3. Projets Featured — 3 grands (NOD, Valoris, BforBank)
4. Projets Compacts — 3 rangees (Spie Bat, SmartIntegrity, Malaama) + "See all projects"
5. Temoignages (bande inversee noire)
6. About (parcours gauche + passion droite)
7. CTA final ("Have a project? Let's talk.")
8. Footer
```

---

## 3. Nav

**Type** : Sticky en haut de page.
**Contenu** :
- Gauche : "Jonathan S." (texte, pas de logo)
- Droite : Work · About · Contact (ancres vers les sections) + dark mode toggle
- Mobile : hamburger menu

**Style** :
- Background : `bg` avec bordure bottom `border`
- Typo : Manrope SemiBold 14px
- Hauteur : ~64px

---

## 4. Hero

**Layout** : 2 colonnes — copy a gauche, photo a droite.
**Mobile** : empile (copy en haut, photo en dessous).

**Photo** : `/public/images/Hero/Moi.webp` — placeholder, nouvelle photo a prendre.

**Copy** :
```
Hi, I'm Jonathan.
Senior Product Designer with a builder mindset. I research, design, and code.
What drives me: solving hard problems, shipping fast, and iterating until it works.
I focus on real estate and fintech startups — the industries I'm passionate about and the ones I understand best.
Based in Luxembourg, working remotely.
```

**Typographie** :
- "Hi, I'm Jonathan." → Space Grotesk Bold, taille hero `clamp(48px, 8vw, 96px)`, uppercase
- Corps du texte → Manrope Regular 15-16px, line-height: 1.65
- "Based in Luxembourg..." → Manrope, couleur `muted`

**CTA** : Bouton primary noir "Get in touch" → scrolle vers la section contact

---

## 5. Projets Featured (3 grands)

**Layout** : Full-width par projet. Texte a gauche, grande image a droite. Separes par bordures horizontales.
**Mobile** : empile (texte → image).

**Hover** : background passe de `surface` a `zinc-200` (light) / `zinc-700` (dark), transition 300ms. Pas d'inversion, pas de grayscale.
**Images** : en couleur directement.
**Metriques** : integrees dans chaque carte.

**Clic** : le projet entier est cliquable, mene vers `/work/[slug]`.

### 5.1 NOD

- **Titre** : Revamping a power plant monitoring SaaS to increase kWh tracked per operator by 23%
- **Description** : Redesigned the app in dark mode — new diagnostic dashboard for production loss, integrated alerting system, and automated reporting for plant business owners, saving operators 3x30 min per day.
- **Metrique** : +23% kWh/operator
- **Tags** : Product Design · Dark Mode · TotalEnergies Digital Factory
- **Image** : `/images/Hero/NOD.webp`
- **Lien** : `/work/nod`

### 5.2 Valoris

- **Titre** : Designing and building a rental management SaaS for Luxembourg legal compliance
- **Description** : Solo-built property management platform automating legal documentation — tax declarations, rent control tracking, and resale reporting. OCR-powered document processing that auto-fills ~72% of required fields for tax filings.
- **Metrique** : ~72% of tax fields automated
- **Tags** : Product Builder · Cursor / Claude Code · Entrepreneurship
- **Image** : a definir
- **Lien** : `/work/valoris`

### 5.3 BforBank

- **Titre** : Designing the onboarding flow that ranked #1 on Google's UX Benchmark 2023
- **Description** : Built a fully compliant banking onboarding for BforBank's complete app relaunch — meeting all KYC, security, and regulatory constraints while achieving a full account opening in under 10 minutes.
- **Metrique** : #1 Google UX Benchmark 2023
- **Tags** : UX/UI Design · Mobile Design · Onboarding Flow
- **Image** : `/images/Hero/BFOR.webp`
- **Lien** : `/work/bforbank`

**Format des titres** : Impact-first, 1 phrase complete qui inclut le resultat.

---

## 6. Projets Compacts (3 rangees)

**Layout** : Format compact — une ligne par projet. Texte uniquement (PAS de photo). Bordure entre chaque rangee.
**Mobile** : empile.
**Hover** : identique aux featured — bg `surface` → `zinc-200` / `zinc-700`, 300ms.
**Clic** : le projet entier est cliquable, mene vers `/work/[slug]`.

Suivi d'un lien "See all projects →" (pour le moment, ce lien ne mene nulle part — page /work a creer plus tard si besoin).

### 6.1 Spie Batignolles

- **Titre** : Cut manual data entry on construction sites by redesigning the activity report with 16 field workshops
- **Metrique** : 16 workshops · 12 user tests
- **Tags** : UX Research · Design Thinking · ERP Construction
- **Lien** : `/work/spie-bat`

### 6.2 SmartIntegrity

- **Titre** : Reduced refinery pipe leaks by 6% with a corrosion risk tool deployed to 500 inspectors across 4 sites
- **Metrique** : -6% leaks · 500 users · 4 sites
- **Tags** : Product Design · Data · TotalEnergies Digital Factory
- **Lien** : `/work/smartintegrity`

### 6.3 Malaama

- **Titre** : Designing and building the website for an NGO empowering girls' education in Mauritania
- **Metrique** : Just released · April 2026
- **Tags** : Product Builder · Web Design · Social Impact
- **Lien** : `/work/malaama`

---

## 7. Temoignages (bande inversee)

**Layout** : Bande inversee noire (fond `invert-bg`, texte `invert-fg`). Section pleine largeur.
**Mobile** : inchange, pleine largeur.

**Contenu** : Temoignage de Sandie Blanchaud — en FRANCAIS, version INTEGRALE.

```
"J'ai eu le plaisir de travailler avec Jonathan dans le cadre de mes fonctions de Lead Design Ops chez TotalEnergies. En tant que Product Designer, tu as demontré ton autonomie sur plusieurs sujets d'une grande complexité technique et stratégique en framing et en build et tu t'es toujours très bien intégré au sein de tes squads. Tu es aussi capable de t'adapter à différents contextes opérationnels. Tu es un collaborateur appliqué, impliqué et à l'écoute des feedbacks. En tant que membre du Design Studio (20 designers), tu as toujours été présent dans nos rituels d'équipe et ton caractère jovial et les questions que tu posais participaient grandement à la dynamique d'équipe. Tu as également pris très au sérieux ton rôle de mentor auprès de consultants plus juniors. Pour moi tu as toutes les qualités requises pour poursuivre une belle carrière ! Je te souhaite le meilleur pour la suite :)"

— Sandie Blanchaud, Lead Design Ops @ TotalEnergies (The Digital Factory)
```

**Note** : Espace prevu pour ajouter d'autres temoignages plus tard.

---

## 8. About

**Layout** : 2 colonnes cote a cote.
**Mobile** : empile (parcours en haut, passion en dessous).

### 8.1 Colonne gauche — Parcours

```
I started in user research — two master's degrees, deep in methodology and psychology. Then I joined TotalEnergies Digital Factory for 3 years, where I worked as Lead Designer in product squads building tools from scratch: product vision, first designs, user testing, iteration. Always embedded in a product team.

Going freelance changed everything. I went all-in on AI — not just for design, but for research, product thinking, and development. I broadened into product management and started coding what I design. At the same time, I began investing in real estate in Luxembourg and building my own products.
```

Lien : "More about me →" (pour le moment, ancre vers cette meme section ou lien mort — page /about a creer plus tard si besoin).

### 8.2 Colonne droite — Passion

**Texte** : Passion pour le cyclisme. Apres 8 ans a jouer a une fantasy league cyclisme avec le meme groupe d'amis, il a decide de creer son propre jeu — WattHunter — pour enfin avoir l'experience dont ils revaient, au lieu de continuer a se plaindre.

**Copy a rediger** (direction) :
```
Outside of work, I'm a cycling obsessive. After 8 years playing fantasy cycling with the same group of friends — and 8 years complaining about every app we tried — I decided to build my own. WattHunter is a fantasy cycling game designed for fans who actually care about the sport.
```

**Visuels** : 2 screenshots mobile de WattHunter.

---

## 9. CTA Final

**Layout** : Section en bas de page, avant le footer.

**Copy** : "Have a project? Let's talk."
**Sous-texte** : Disponibilite actuelle (ex: "Available for freelance projects starting May 2026")

**Actions** :
- Bouton primary "Book a call" → lien Calendly
- Email affiche en clair (cliquable mailto)
- Icone LinkedIn (lien)

---

## 10. Footer

**Layout** : Minimaliste. Bordure top.
**Mobile** : empile, liens centres.

**Contenu** :
- Liens nav : Work · About · Contact (ancres)
- Liens sociaux : LinkedIn · GitHub (icones)
- Copyright : © 2026 Jonathan Schummers

---

## 11. Hover & Interactions

### 11.1 Cartes projets (featured + compacts)
- Hover : bg passe de `surface` a `zinc-200` (light) / `zinc-700` (dark)
- Transition : 300ms ease-out
- Pas d'inversion fond/texte
- Pas de grayscale sur les images
- Touch devices : pas de hover

### 11.2 Nav links
- Hover : couleur passe de `fg` a `muted`, transition 150ms

### 11.3 Boutons
- Voir spec design system (`docs/superpowers/specs/2026-03-20-design-system-design.md` section 4.1)

### 11.4 Liens inline
- Voir spec design system section 4.5

---

## 12. Responsive

| Breakpoint | Largeur | Adaptations |
|------------|---------|-------------|
| Mobile | < 768px | Colonnes empilees. Nav → hamburger. Padding 24px. Typo hero via clamp(). |
| Tablet | 768–1024px | Padding 32px. Grids 2 col → 1 col si besoin. |
| Desktop | > 1024px | Layout complet, padding 48px, max-width 1400px. |

**Sections empilees en mobile** : Hero, Featured projets, About (parcours puis passion).
**Inchange en mobile** : Temoignages, CTA final, Footer, Projets compacts (deja en ligne simple).

---

## 13. Modifications au design system

Par rapport a la spec design system (`2026-03-20-design-system-design.md`) :

1. **Hover inversion** : le pattern `.hover-invert` (section 4.3) reste dans le CSS pour d'autres usages potentiels mais ne s'applique PAS aux cartes projets homepage. Les cartes utilisent un hover simple bg `surface` → `zinc-200` / `zinc-700`.
2. **Grayscale images** : le filtre grayscale par defaut sur les images ne s'applique PAS aux cartes projets. Images en couleur directement.
3. **Ces deux patterns restent disponibles** dans le design system pour d'autres usages (ex: listing /work plus tard).

---

## 14. Contenu a fournir

- [ ] Nouvelle photo hero de Jonathan (`/public/images/Hero/Moi.webp` = placeholder)
- [ ] Image projet Valoris
- [ ] 2 screenshots mobile WattHunter pour la section About
- [ ] Lien Calendly pour la section CTA
- [ ] Case study Malaama (contenu)
- [ ] Eventuels temoignages supplementaires

---

## 15. Decisions prises

| Element | Decision | Raison |
|---------|----------|--------|
| Architecture | Single-page + case studies | Pas assez de contenu pour justifier About/Contact separes |
| Langue | Anglais | Marche international, startups |
| Hover projets | bg surface → zinc-200/700 | Coherent blueprint, subtil |
| Images projets | Couleur directement | Plus naturel, pas de gimmick |
| Logos clients | Non | Pas honnete en tant que consultant |
| Metriques | Integrees dans chaque carte | Pas de bande separee |
| Photo hero | Juste "Jonathan" | Plus approachable |
| Contact | Section bas de page | Calendly + email + LinkedIn, frictionless |
| About | 2 colonnes (parcours + passion) | Montre le profil complet sans page dediee |
| Nav | Sticky, "Jonathan S.", hamburger mobile | Minimaliste, conventions respectees |
| Footer | Nav links + LinkedIn + GitHub + copyright | Strict minimum |
| Projets compacts | Pas de photo | Differentiation visuelle avec les featured |
