# Roadmap — Portfolio Jonathan Schummers

> Ouvre ce fichier pour voir l'avancement global du projet.
> Mis a jour au fur et a mesure des sessions.

**Objectif** : Site portfolio operationnel en 2 jours
**Stack** : Next.js 16 + Tailwind CSS + shadcn/ui + Framer Motion
**Approche** : Section-by-section avec wireframes

---

## Jour 1 : Fondations + Homepage

### Etape 1 — Sitemap & IA (30min) ✅
- [x] Architecture : 5 pages + 5 case studies
- [x] Sections de chaque page definies
- [x] URL structure App Router

**Sitemap validee :**
```
/                    Homepage (hero, 2-3 projets featured, metrics, about teaser, CTA)
/work                Listing complet des 5 projets
/work/[slug]         Case study Impact-First (nod, bforbank, smartintegrity, boosted, spie-bat)
/about               Bio, photo, parcours, philosophy
/contact             CTA, email, liens sociaux, statut dispo
```
**Nav** : Work · About · Contact + CTA persistant

### Etape 2 — Direction visuelle & Design System (2-3h) ✅
- [x] Explorer 2-3 directions visuelles (visual companion)
- [x] Choisir typographie, palette, spacing, shadows, animations
- [x] Implementer en CSS variables + Tailwind config
- [x] Creer composants de base (Button, Tag, BlueprintShell, DarkModeToggle)

### Etape 3 — Homepage section par section (4-5h)
Pour chaque section : wireframe → choix → implementation → validation

- [ ] Hero
- [ ] Projets featured (grille/liste)
- [ ] Metrics / Impact
- [ ] About teaser
- [ ] CTA Contact

---

## Jour 2 : Case Studies + Pages + Deploy

### Etape 4 — Template case study (2h)
- [ ] Wireframe du template Impact-First
- [ ] Implementation : Hero, TL;DR, Context, Process, Solution, Impact, Reflections
- [ ] Validation sur 1er case study

### Etape 5 — 4 case studies restants (3-4h)
- [ ] BforBank
- [ ] NOD
- [ ] SmartIntegrity
- [ ] Boosted
- [ ] Spie Batignolles

### Etape 6 — Pages About + Contact (1.5h)
- [ ] About : bio, photo, parcours, philosophy
- [ ] Contact : CTA, email, liens sociaux, statut dispo

### Etape 7 — QA & Polish (1.5h)
- [ ] Re-tester les polices (Sora, Manrope) avec le contenu reel — valider lisibilite et hierarchie
- [ ] Evaluer si JetBrains Mono apporte quelque chose pour les tags/labels techniques (optionnel, pas dans le design system de base)
- [ ] Responsive (375px, 768px, 1440px)
- [ ] Lighthouse (Perf >90, A11y >95, SEO >95)
- [ ] Animations, transitions, hover states
- [ ] Verification liens, images, typos

### Etape 8 — Deploy (30min)
- [ ] Vercel deploy
- [ ] Domaine custom (si pret)
- [ ] Analytics + Speed Insights

---

## Structure du repo

```
portfolio/               <- racine du projet Next.js
├── app/                 <- pages (App Router)
├── components/          <- composants React
├── content/
│   ├── homepage.md
│   └── case-studies/    <- 5 fichiers MD
├── docs/
│   ├── roadmap.md       <- CE FICHIER
│   ├── references/      <- recherche, process, anciennes versions
│   └── specs/           <- specs de design (outputs brainstorm)
├── lib/                 <- utilitaires
├── public/images/       <- toutes les images
└── ...
```

## Decisions prises

| Decision | Choix | Raison |
|----------|-------|--------|
| Scope | 5 pages + 5 case studies detailles | Option C — homepage featured + /work listing |
| Services | Mis de cote | Le brief dit que c'est pour les agences, pas les individus |
| Approche | Section-by-section avec wireframes | Iteratif, validation a chaque etape |
| Direction visuelle | Nouvelle direction a explorer | Ni V15 ni V-ref — a definir en etape 2 |
| Contenu | Existant, a reformater Impact-First | Docs deja dans content/case-studies/ |
| Timeline | 2 jours | J1 = fondations + homepage, J2 = case studies + deploy |
