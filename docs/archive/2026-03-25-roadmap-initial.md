# Roadmap — Portfolio Jonathan Schummers

> Ouvre ce fichier pour voir l'avancement global du projet.
> Mis a jour au fur et a mesure des sessions.

**Objectif** : Site portfolio operationnel
**Stack** : Next.js 16 + Tailwind CSS v4 + Heroicons + Space Grotesk + Manrope
**Approche** : Section-by-section avec wireframes

---

## Jour 1 : Fondations + Homepage

### Etape 1 — Sitemap & IA (30min) ✅
- [x] Architecture : single-page homepage + case studies
- [x] Sections de chaque page definies
- [x] URL structure App Router

**Architecture validee :**
```
/                    Homepage (toutes les sections)
/work/[slug]         Case study (nod, valoris, bforbank, spie-bat, smartintegrity, malaama)
```

### Etape 2 — Direction visuelle & Design System (2-3h) ✅
- [x] Explorer 2-3 directions visuelles (visual companion)
- [x] Choisir typographie, palette, spacing, animations
- [x] Implementer en CSS variables + Tailwind v4 @theme
- [x] Creer composants de base (Button, Tag, BlueprintShell, Section, DarkModeToggle)
- [x] Definir echelle typographique responsive (hero → h1 → h2 → h3 → h4 → body-lg → body → body-sm → label)
- [x] Definir tokens texte semantiques (text-primary, text-secondary, text-tertiary)
- [x] Definir tokens bouton (btn-primary, btn-primary-hover, btn-primary-fg) avec etats default/hover/pressed
- [x] Card hover subtil (surface au lieu de border)
- [x] Ghost/liens hover (text-secondary → text-primary)
- [x] Integrer Heroicons comme bibliotheque d'icones

### Etape 3 — Homepage section par section ✅
- [x] Nav (sticky, hamburger mobile, dark mode toggle)
- [x] Hero (titre, tagline, photo, CTA)
- [x] Projets featured (3 cartes avec images, metriques, tags)
- [x] Projets compacts (3 rangees texte, "See all projects")
- [x] Temoignages (bande inversee, Sandie Blanchaud)
- [x] About (parcours + WattHunter)
- [x] CTA Contact (Calendly, email, LinkedIn)
- [x] Footer (nav + socials + copyright)

**En cours / A finaliser :**
- [ ] Photo hero : Jonathan doit reexporter sans transparence (alpha)
- [ ] Valider la hero section visuellement (tailles, spacings, photo)
- [ ] Screenshots WattHunter pour section About
- [ ] Image projet Valoris

---

## Jour 2 : Case Studies + Pages + Deploy

### Etape 4 — Template case study (2h)
- [ ] Wireframe du template Impact-First
- [ ] Implementation : Hero, TL;DR, Context, Process, Solution, Impact, Reflections
- [ ] Validation sur 1er case study

### Etape 5 — Case studies (3-4h)
- [ ] NOD
- [ ] Valoris
- [ ] BforBank
- [ ] Spie Batignolles
- [ ] SmartIntegrity
- [ ] Malaama

### Etape 6 — QA & Polish (1.5h)
- [ ] Responsive (375px, 768px, 1440px)
- [ ] Lighthouse (Perf >90, A11y >95, SEO >95)
- [ ] Hover states sur tous les composants interactifs
- [ ] Verification liens, images, typos
- [ ] Dark mode complet

### Etape 7 — Deploy (30min)
- [ ] Vercel deploy
- [ ] Domaine custom
- [ ] Analytics + Speed Insights

---

## Decisions prises

| Decision | Choix | Raison |
|----------|-------|--------|
| Architecture | Single-page + case studies | Pas assez de contenu pour About/Contact separes |
| Langue | Anglais | Marche international, startups |
| Polices | Space Grotesk (display) + Manrope (body) | |
| Icones | Heroicons (@heroicons/react) + custom LinkedIn/GitHub | Bibliotheque Tailwind Labs, coherente |
| Tokens texte | text-primary (zinc-900), text-secondary (zinc-500), text-tertiary (zinc-400) | 3 niveaux, inspire de Radix (steps 11-12) |
| Bouton primary | zinc-850 default → zinc-950 hover → brightness(1.08) pressed | Approche Radix (step 9 → 10 → filtre) |
| Card hover | surface (zinc-100) | Subtil, Radix step 4 |
| Ghost hover | text-secondary → text-primary | Pas de bg, evite le padding visuel |
| Hover projection | bg surface (zinc-100) pour outline, border (zinc-200) pour pressed | |
