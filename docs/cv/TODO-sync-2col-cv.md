# TODO — reporter les edits du CV ATS (1 colonne) vers le CV 2 colonnes

> Créé le 2026-06-16. Pendant la session docx ATS, le wording a évolué.
> Ces changements de **contenu** sont à reporter dans le CV 2 colonnes
> (`docs/cv/ui/cv-classique-immo.html` + `cv-dubai-immo.html` + `cv-template.html`),
> puis régénérer le PDF (`node docs/cv/export-pdf.mjs <variant>`).
> Les changements de mise en page (1 colonne, polices, marges) ne concernent PAS le HTML.

## À appliquer (contenu)

- [ ] **Profil** : "taught me **that** design isn't" → "taught me design isn't" (retrait de "that").
- [ ] **Valoris #1** : "Pivoted the core flow from web forms to chat interactions: a Telegram AI assistant that turns user inputs and documents into structured data."
  → "Pivoted the **main user flow** from web forms to a chat assistant turning inputs and documents into structured data."
- [ ] **Valoris #3** : "...that turn research **insights** into TDD specs and enforce **design-system token** compliance **through** linting."
  → "...that turn research into TDD specs and enforce **design-token** compliance **via** linting."
- [ ] **TotalEnergies #1** : "Scaled... **across** 4 refineries (500+ inspectors): 82% daily active **inspectors**, −6% pipe leaks."
  → "Scaled... **to** 4 refineries (500+ inspectors): 82% daily active, −6% pipe leaks."
- [ ] **TotalEnergies #2** : "with **ML-based** kWh loss prediction" → "with **ML** kWh loss prediction".
- [ ] **TotalEnergies #3** : "Ran a dual-track loop in a small agile squad, discovering the next features while steering the build of the current ones into polished, shipped UI."
  → "**Led continuous discovery alongside delivery**, shipping current features as polished UI and de-risking the next ones."
- [ ] **Avanade #1** : retirer "(first of 51 banks)" → finit sur "winner of Google's 2023 Finance UX Award."
- [ ] **Avanade #2** : "Co-designed Spie Batignolles' construction app (60 screens), connecting site crews to a complex ERP and replacing 3 legacy tools."
  → "Designed Spie Bat' construction app, connecting field users' input to a complex ERP and replacing 3 legacy tools."
  - ⚠️ "Spie Bat'" est informel. Sur le CV 2 colonnes (envoi humain), garder plutôt "Spie Batignolles'".
- [ ] **Real Estate** : remplacer "House of Training, Luxembourg" → "Luxembourg Chamber of Commerce" (year 2025).
- [ ] **Certifications** : retirer "AI for Designers (Interaction Design Foundation)". Garder PSPO I + PSU.

## Optionnel (j'ai coupé pour le 1 page, à ton appréciation sur le 2 colonnes)

- [ ] "11-property family rental portfolio" : retiré du docx. Le garder ou non sur le HTML ?
- [ ] "Bachelor Psychology" : retiré du docx. Le HTML a plus de place, tu peux le garder.

## Après report
- [ ] `node docs/cv/export-pdf.mjs cv-classique-immo` (et dubai) → vérifier que ça tient sur 1 page.
- [ ] Copier-coller réel dans TextEdit pour valider le parsing (jamais `pdftotext`).
