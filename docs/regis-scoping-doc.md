# Regis, scoping document (grille Hexa, dix rubriques)

> Rempli rétrospectivement le 2026-09-06 pour servir de colonne vertébrale au
> case study. Ce n'est pas la case study : c'est le document de cadrage qu'un
> studio aurait écrit les premiers jours. Les faits viennent du repo
> `~/Documents/Regis` (CONTEXT.md, ADR, migrations, docs/) et du vault
> (`knowledge/goals/regis.md`, `regis-backlog.md`). Ce qui est marqué
> **[À TRANCHER]** manque dans les deux et doit venir de Jonathan.

---

## 1. Résumé en une phrase

Regis permet à un bailleur luxembourgeois de capturer au fil de l'eau ses
documents et ses transactions, de les valider, et d'obtenir chaque année les
montants par rubrique de sa déclaration de revenus locatifs (formulaire 190)
sans repartir de la pile de papier.

Variante orientée sortie : « Ton classeur de charges déductibles, amortissement
et rentabilité théorique, prêt pour le formulaire 190 ou pour le comptable. »
(backlog, décision 8).

**[À TRANCHER]** : version « habitude au fil de l'eau » ou version « classeur
prêt pour le 190 » ? La première dit la fréquence, la seconde dit le livrable.

---

## 2. Problème

**Persona.** Le bailleur particulier qui gère seul, multi-biens (3 à 15 biens
selon le PRD, une dizaine sur plus de trente ans dans le cas familial), avec une
part significative de 55 ans et plus (registre vouvoiement, adéquation aux 55+
posée comme hypothèse à vérifier, non comme acquis). Il photographie déjà ses
reçus mais les perd dans sa galerie.

**L'état d'avant, tel que vécu.** Tous les documents dans un classeur physique,
un emplacement par document (impossible de rattacher une facture à deux biens ou
à deux années), rigueur exigée à chaque rangement, temps perdu à chaque
recherche. La comptabilité pure dans un Excel par bien, tout à la main. Une pile
de documents non classés qui s'accumule entre deux déclarations. Avant la
déclaration : reprendre la pile, la catégoriser dans le classeur, relire les
comptes bancaires pour vérifier qu'on n'a rien oublié, refouiller les mails à la
recherche d'autres factures.

**Trois obligations luxembourgeoises, un seul jeu de pièces.**

| Obligation | Fréquence | Ce qu'elle exige | Source repo |
|---|---|---|---|
| Déclaration des revenus locatifs, formulaire 190 par immeuble, résultat reporté au 100 | Annuelle, obligatoire pour tous | Recettes, charges par rubrique (A, B, D, E, F), amortissement (déductible pour un particulier au LU, 1,5 à 4 % selon l'âge du bâtiment), ou abattement forfaitaire 35 % plafonné 2 700 €/an par immeuble | `docs/architecture/research/fiscalite-reporting-fr-lu.md`, `app-mvp/lib/fiscal.ts` |
| Loyer maximal légal : 5 % du capital investi | À chaque fixation ou révision (biennale, hausse plafonnée +10 %, loi du 23/07/2024) | Prix, frais d'acquisition (7 %), rénovations capitalisées, toutes les factures qui justifient le capital, sur toute la durée de détention | `docs/notion-migration/wiki/01-biens-immobiliers.md`, `docs/architecture/architecture-data-saas.md` |
| Plus-value à la revente | Une fois par bien, après des décennies | Justification de tous les travaux d'amélioration depuis l'acquisition | mentionnée dans `architecture-data-saas.md`, aucune règle chiffrée ni implémentation |

Le point commun : les trois s'appuient sur les mêmes pièces, accumulées sur
trente ans, et la première est la seule qui tombe chaque année pour tout le
monde.

**Fréquence.** Le pic est annuel (la déclaration), mais l'accumulation est
continue : une facture par semaine, un relevé par mois, par bien.

**Intensité.** Antidouleur, pas vitamine : c'est une obligation légale avec
sanction en cas de contrôle, et un coût réel (le comptable, 300 à 600 €/an pour
une liasse simple, 400 à 1 000 € en LMNP). La rentabilité et la valorisation
sont des vitamines : intéressantes, pas obligatoires, et pas pour tous les
bailleurs.

---

## 3. Solution

### Périmètre de la première brique (MVP v1, ce qui est livré)

- **Entrées** : documents (photo ou PDF, upload sans OCR par défaut), relevés
  bancaires PDF multibanque (LCL, Boursorama, Trade Republic, Raiffeisen testés,
  91 opérations sur 91 restituées), saisie manuelle. Le parcours CSV a été
  supprimé le 2026-08-14 au profit du PDF.
- **Workflow d'ingestion** : capture rapide, puis enrichissement différé.
  L'analyse d'un document est **toujours manuelle**, un clic explicite avec coût
  annoncé (ADR 0005, 0,8 crédit par page). L'extraction (Mistral OCR, schéma
  Zod) passe par une **saisie assistée** : proposition, score de confiance,
  décision validé, corrigé ou rejeté. La dépense n'existe qu'après validation.
  Pour les relevés : mapping proposé par le LLM, validé par l'humain, parsing
  déterministe, dédoublonnage par empreinte.
- **Sorties** : rapport fiscal par rubrique du 190 (agrégation déterministe des
  dépenses, ordre du formulaire), rentabilité brute et nette théoriques (loyer
  mensuel × 12, saisi). **Pas de chiffre d'impôt final, pas de formulaire
  rempli.** Position calquée sur Rentila et Qlower : montants donnés à titre
  indicatif, l'utilisateur reste responsable de l'exactitude et remplit
  lui-même sa déclaration.
- **Structure de données** (26 tables, 71 migrations) : `bien`, `depense`,
  `revenu` (deux tables, fusion refusée), `transaction` (immuable),
  `lettrage` (N:N sans partie double, ADR 0003), `document`,
  `saisie_assistee`, `bail`, `echeance`, `regle`, `compte_bancaire`,
  `famille` (tenant d'accès, RLS par `famille_id`, ADR 0004), `activite`
  (audit trail immuable : qui a changé quoi, avant et après, écrit uniquement
  par l'app). Régime fiscal élu **par bien** (`lu_forfait`, `lu_reel`,
  `fr_lmnp_reel`), jamais déduit du pays.
- **Interfaces** : web app, onglets biens, compta, documents, contrats, carnet,
  fiscal, inbox, réglages. Design system monochrome à une seule couleur
  d'action, lint anti-drift en pre-commit. Agent IA invoqué depuis la page,
  contexte injecté, pas de chat-shell (ADR 0002).

### Ce qui est explicitement hors de la première brique

| Écarté | Pourquoi | Source |
|---|---|---|
| Import bancaire automatique (PSD2/AISP) | Agrégateur agréé à partir de 60 €/mois de coût fixe contre 790 à 1 200 € de CA cible sur le trimestre ; ce n'est pas ce que Regis vend | `knowledge/goals/regis.md` |
| Structure de détention, quotes-parts, indivision | Spécifiée (ADR 0004, benchmark Qlower), onglet `structures` en stub ; quote-part 100 % assumée en v1 | `app-mvp/app/app/(tabs)/structures/page.tsx` |
| Rentabilité et valorisation automatiques | Vitamine, dépend de données que la première brique commence seulement à accumuler | backlog, étages de vision |
| Chat-first | Abandonné le 2026-07-02 : le chat ne structure pas, l'app est le socle | ADR 0002 |
| Analyse automatique des documents | Décidée puis renversée en une semaine (REG-262) : coût non maîtrisé, contrôle perdu | ADR 0005 |
| Plus-value à la revente, loyer maximal | Servis par la même base de pièces, calcul reporté ; le plafond 5 % existe comme vue d'alerte, pas comme feature | wiki biens |
| Formulaire rempli, chiffre d'impôt | Responsabilité et non-conseil fiscal ; le comptable garde la dernière main | backlog décision 4 |

### Vision produit long terme (les étages, backlog 2026-06-20)

1. POC : un flow facture vers dépense structurée. Fait.
2. MVP v1 : déclaration fiscale et documentation, sans banque, sans rentabilité
   automatique. En bêta.
3. Produit vendu : v1 plus connexion bancaire plus rentabilité.
4. Long terme : agent personnel de gestion locative (admin, juridique, finance,
   fiscal, communication locataires) qui vaut par la qualité de la donnée
   accumulée en dessous, plus qu'un service branché sur du papier.

Chaque étage suppose le précédent : la donnée validée de la brique 1 est ce qui
rend les briques 3 et 4 possibles. C'est l'argument de séquence.

---

## 4. Implémentation

- **Équipe** : une personne, product designer, PM et développeur, assisté par
  Cursor et Claude Code. Plafond 16 h par semaine, agency devant chaque matin.
- **Stack** : Next.js 16, React 19, Tailwind 4, Supabase (Paris), Mistral
  (`mistral-ocr-latest`, `mistral-small-latest`) via Vercel AI SDK, Stripe
  Checkout et webhook, PostHog EU proxyfié (ADR 0006), Vercel. Prod :
  `app.askregis.fr`.
- **Règle d'architecture qui structure tout** (ADR 0001, 2026-06-24) : tout
  chiffre qui engage l'utilisateur est calculé par du code déterministe et
  persisté ; le LLM extrait, met en forme, explore, conseille avec sources, et
  ne fait jamais autorité sur un nombre. Chaîne canonique : extraction non
  déterministe, validation humaine, donnée propre, calcul déterministe.
- **Traçabilité** : table `activite` (créations, modifications, changements de
  statut, suppressions, acteur utilisateur, bot ou import, valeurs avant et
  après), transactions bancaires immuables, `saisie_assistee` comme journal de
  tout ce que le bot écrit, `user_id` reconverti en champ d'audit.
- **Monétisation branchée dès la v1** : 2 plans (gratuit 1 bien, 10 crédits IA
  par mois, rapport tronqué ; Essentiel 8,99 €/mois, illimité, 200 crédits),
  codes bêta accordant Essentiel trois mois par famille.
- **Timeline** : compréhension du fonctionnement familial dès 2025 ; premier
  commit le 2026-06-11 (sous le nom Valoris) ; un mois de construction dense
  (PRD, schéma, migration Notion, ADR 0001 à 0003, rebrand Regis le 04/07) ;
  partage familial, audit trail, Stripe en juillet ; import PDF, vouchers,
  migration Linear vers GitHub le 14/08 ; analytics le 02/09. 430 commits.

**[À TRANCHER]** : Jonathan dit « l'application a débuté en juillet, un seul
mois de vrai travail ». Le repo dit premier commit le 11 juin et ADR 0001 le 24
juin. Quel mois on raconte ?

---

## 5. Go-to-market

- **ICP** : bailleur particulier luxembourgeois, gère seul, plusieurs biens,
  déclare au réel (l'abattement forfaitaire 35 % plafonné rend le calcul inutile
  pour une partie des mono-biens : part réelle inconnue, hypothèse ouverte).
- **Canal** : prescripteurs en tête (fiduciaires, comptables, ULPI, groupes de
  propriétaires), Meta ads LU en complément et jamais seul (28 000 bailleurs,
  sous le seuil où Meta optimise, CPM parmi les plus chers d'Europe). Logique du
  prescripteur : le comptable est déjà assis entre Regis et le bailleur ; on lui
  livre un dossier propre qu'il termine, il gagne du temps sur un client peu
  rentable et recommande. **Non documenté dans le repo** : le comptable y est
  un ancrage prix, pas un apporteur. Écrit dans le goal seulement.
- **Motion** : self-serve, un inconnu s'inscrit seul, sort son rapport et paie.
- **Modèle et unité de valeur** : abonnement 8,99 €/mois par famille, biens
  illimités. L'unité de valeur est la liasse annuelle, pas le nombre de biens
  (à l'inverse de Qlower : 269 €/an plus 130 € par bien, et de Qalimo : 4,90 €
  par bien par mois). Découpage gratuit contre payant encore ouvert (le code
  fait 2 plans, la copy landing a exploré un freemium 3 paliers).
- **Les 20 premiers noms** : famille et connaissances au Luxembourg, bêta
  ouverte depuis fin août 2026 à une vingtaine de personnes. **[À TRANCHER]** :
  combien utilisent réellement, et qu'est-ce qu'on a le droit de dire.
- **Ce qui a été préparé et non lancé** : landing en quatre variantes (marché LU
  ou FR × emphase IA ou sobre), Pixel et CAPI branchés, taxonomie tracking
  écrite en juin 2026. Jamais lancé, par priorité au dogfood et au produit.

---

## 6. Taille de marché

- Luxembourg : **28 000 bailleurs particuliers** (goal). Aucun sizing LU dans le
  repo, seul chiffre disponible.
- France, marché suivant et hors cycle : 3,2 millions de bailleurs particuliers,
  74 % gèrent eux-mêmes, environ 1,2 million de LMNP poussés vers le réel par la
  loi Le Meur 2025 ; les éditeurs cumulent 400 000 à 500 000 utilisateurs
  actifs ; Excel reste le premier concurrent. Willingness to pay : 28 % des
  propriétaires d'Europe du Sud acceptent plus de 15 €/mois.
- Lecture Hexa : le Luxembourg seul est un motif de kill par structure de marché
  (« marché trop petit »). Réponse assumée : le goal est un goal de validation
  (20 payants, 180 € de MRR), pas de revenu. Le Luxembourg est le terrain où le
  wedge réglementaire est le plus net et où le dogfood est possible. La France
  est le marché de taille, à la condition de re-localiser la fiscalité (régime
  élu par bien déjà prévu pour ça).

---

## 7. Opportunité, pourquoi maintenant

- **Le trou de marché** : aucun logiciel de gestion locative grand public n'est
  localisé pour la fiscalité luxembourgeoise. Rentila est ancré dans le droit
  français (2044), objego et immocloud dans l'Anlage V allemande (deep research
  du 2026-08-24, vault). Le repo ne contient pas d'analyse concurrentielle LU :
  le constat vient du vault, pas du code.
- **Ce que les autres n'ont pas compris** : la valeur n'est pas dans l'OCR (tout
  le monde l'aura) ni dans l'IA comme promesse, mais dans la donnée validée,
  accumulée sur des années, rattachée aux rubriques fiscales locales. La
  déclaration annuelle est le prétexte qui force l'habitude ; le loyer maximal
  et la plus-value, qui exigent les mêmes pièces sur trente ans, sont ce que
  cette donnée paie ensuite.
- **La bascule techno** : l'extraction de documents par LLM rend enfin possible
  la capture au fil de l'eau à coût marginal (0,8 crédit par page), là où la
  saisie manuelle tuait l'habitude. Mais la même techno hallucine, d'où la
  frontière déterministe comme condition de confiance.
- **Le vécu** : une dizaine de biens familiaux sur plus de trente ans, un
  classeur, un Excel par bien, et l'auteur qui reprend la main sur la
  génération précédente. Licence d'agent immobilier luxembourgeoise obtenue en
  décembre 2025.

---

## 8. Concurrence

| Acteur | Ce qu'il fait | Ce qu'il ne fait pas | Prix |
|---|---|---|---|
| Qlower (FR) | Déclaration LMNP, SCI, nue ; fiscalistes et télétransmission ; banque-first ; meilleur modèle de détention | Pas d'IA, pas d'extraction de documents (voit un débit, pas la facture) ; pas de LU | 269 €/an + 130 €/bien |
| Rentila (FR) | 50 000 bailleurs annoncés ; quittances, IRL, 2044 assistée ; OCR sur le formulaire dépense ; onboarding le plus léger | Pas de partie double, pas de LMNP réel, pas de LU | gratuit 1 lot, 99 €/an |
| Qalimo (FR) | 3 paliers, mène sur le temps admin | Compta générique, pas de fiscal réel | 4,90 €/mois/bien |
| Smovin (BE) | Performance financière, réconciliation bancaire auto | Pas de fiscal | gratuit jusqu'à 2 biens |
| BailFacile, Gererseul (FR) | Leaders SEO et support humain | Aucune IA fonctionnelle en 2026 | 9,99 €/mois/bien, 117 €/an/lot |
| Le comptable | Fait la liasse | Ne range pas les pièces, ne construit pas la donnée | 300 à 1 000 €/an |
| Excel et le classeur | Tout | Rien d'automatisable, une erreur de formule par bien | gratuit |

Ce qu'aucun ne fait : la fiscalité luxembourgeoise, et la capture de la pièce
elle-même au fil de l'eau avec validation. Ce qu'on ne copie pas : le prix par
bien.

---

## 9. Hypothèses, ce qu'il faut croire pour que ça marche

1. Un bailleur préfère photographier une facture et valider une extraction
   plutôt que saisir un formulaire (hypothèse fondatrice du PRD, juin 2026).
2. La capture au fil de l'eau devient une habitude si elle prend moins de temps
   que de poser le papier dans la pile. Non mesuré.
3. Le bailleur multi-biens au réel paie 8,99 €/mois pour ne plus subir la
   panique annuelle. Zéro payant hors bêta à ce jour.
4. Un bailleur de 55 ans et plus peut utiliser le produit seul, sur desktop. À
   vérifier, tranches d'âge non filtrées volontairement.
5. Le cas simple (mono-bien, ou forfait 35 %) trouve aussi une valeur. Construit
   pour le cas dur, valeur pour le cas simple non prouvée.
6. La validation humaine à chaque étape est perçue comme de la confiance, pas
   comme de la friction. À observer.
7. Le comptable accepte de recevoir un dossier Regis et le recommande. Aucun
   contact pris.
8. La frontière déterministe suffit à ce que le bailleur fasse confiance aux
   montants du rapport. Non testé face à un utilisateur externe.

---

## 10. Discovery, ce qui reste à tester et auprès de qui

| Question | Méthode | Auprès de qui | État |
|---|---|---|---|
| La première brique tient-elle entre les mains de quelqu'un d'autre que l'auteur ? | Bêta, observation des décrochages, feedback | Une vingtaine de personnes, famille et connaissances LU, depuis fin août 2026 | En cours |
| Quelles parties de la vision intéressent vraiment (fiscal, loyer max, valorisation, agent IA) ? | 30 entretiens qualitatifs | Bailleurs LU, recrutés nominativement | À faire |
| Le wedge LU tient-il face au marché FR, dix fois plus grand et déjà servi par Qlower ? | Fake door, deux audiences | Trafic froid Meta LU et FR | Préparé, jamais lancé |
| L'IA se vend-elle comme promesse ou comme risque ? | Fake door, deux emphases (« Regis AI » contre « Regis ») sur le même pitch | Même trafic | Préparé, jamais lancé |
| Où les nouveaux inscrits décrochent-ils avant le premier rapport ? | Funnel PostHog, replay masqué | Inscrits bêta puis inconnus | Instrumenté le 02/09/2026, pas encore de données |
| Quelle part des bailleurs LU sont au forfait 35 % ? | Recherche, entretiens | Fiduciaires, ULPI | Ouvert |
| Mobile ou desktop pour la tranche 55+ ? | Observation bêta | Testeurs | Ouvert ; conviction mobile forte pour la capture, desktop pour la validation, web app choisie pour garder les deux |
| Go/No-Go rétrospectif | Lecture Hexa : l'obstacle est l'acquisition, pas le produit ; un Go/No-Go à quatre semaines l'aurait dit dix mois plus tôt | | Auto-évaluation, étape 5 |

---

## Catégorie d'idée (Hexa)

**Catégorie 1, problem-solution fit**, avec une composante 2. Le problème est
ressenti et nommé (chaque bailleur LU sait qu'il doit remplir un 190 et
redoute le classeur), les solutions sont absentes (rien de localisé LU) ou
mauvaises (Excel, comptable). La bascule techno (extraction LLM) rend la
capture continue possible, mais elle n'est pas l'innovation : c'est la
localisation et la donnée. Conséquence pour la validation : les entretiens
suffisent à confirmer la douleur ; le risque est ailleurs, dans la taille du
marché et le go-to-market.

## Le triplet

- **Problème** : connu, universel, annuel. Aucune innovation ici, et c'est
  voulu.
- **Solution** : innovation modérée, capture continue avec validation, frontière
  déterministe, fiscalité LU. C'est la dimension qui innove.
- **Go-to-market** : self-serve, prix flat par famille, prescripteurs. Non
  innovant, et non prouvé : c'est le risque principal.
