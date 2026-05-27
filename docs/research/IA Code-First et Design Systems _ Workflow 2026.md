# **Alignement Continu entre Figma et Agents IA Code-First : Rapport Technique d'Ingénierie Design-to-Code (Mai 2026\)**

## **TL;DR opérationnel**

En mai 2026, l’orchestration d’un workflow design-to-code rigoureux repose sur le protocole ouvert MCP (Model Context Protocol) et l’utilisation de fichiers de comportement locaux (CLAUDE.md, DESIGN.md, system.md) qui forcent les agents (Claude Code, Cursor) à interroger Figma avant toute génération.1 Si les démonstrations d’éditeurs promettent une synchronisation bidirectionnelle magique, la réalité terrain montre que l'export inverse (code vers Figma) brise systématiquement la logique applicative (handlers d’états, logique métier).4 Pour éviter le drift visuel et l'improvisation de tokens, les équipes matures déploient des workflows de "Preflight" et de "Style Binding" automatisés, ramenant le taux de non-conformité de 28% à moins de 2%.5 Le rôle du designer se déplace de la livraison de pixels vers la gouvernance de spécifications textuelles lisibles par les machines.7

## **Contexte et vue d'ensemble**

Le marché des outils de conception d'interfaces traverse une phase de consolidation structurelle sans précédent depuis le début de l'année 2026\. L'époque où le "handoff" se limitait à l'exportation de spécifications statiques ou de snippets CSS génériques est révolue.7 L'adoption massive de l'architecture agentique et la standardisation du protocole MCP (Model Context Protocol) initié par Anthropic ont transformé les éditeurs de code en outils d'exécution visuelle directe, tandis que Figma s'est vu contraint d'ouvrir son canvas à l'écriture automatisée.3  
Deux événements majeurs ont marqué les derniers mois :

* **Le lancement de Claude Design (17 avril 2026\)** : Cette extension d'Anthropic Labs, propulsée par le modèle de vision Claude Opus 4.7, extrait de façon autonome les systèmes de design à partir d'un dépôt GitHub ou de fichiers Figma pour générer des prototypes interactifs éditables par curseurs ou invites.11 Ce lancement a provoqué une baisse de 7% de l'action de Figma en une seule journée, illustrant la menace directe des générateurs visuels IA-natives sur les outils de dessin traditionnels.13  
* **La riposte de Figma avec "Code to Canvas" (Mai 2026\)** : Figma a officialisé son laboratoire de workflows permettant à des agents comme Cursor ou Claude Code de lire des bases de code locales et d'injecter des prototypes interactifs sous forme de calques vectoriels natifs.3

La dynamique actuelle oppose les tenants d'une approche "Canvas-First", où Figma reste le registre central des décisions esthétiques, aux praticiens du "Code-First", pour qui l'interface doit être codée immédiatement avant d'être documentée visuellement.3 Dans les deux cas, la lutte contre le "drift" (l'écart grandissant entre la maquette Figma et le code de production) est devenue la priorité absolue des équipes produit.7

## **Cartographie des outils 2026**

Le tableau ci-dessous dresse l’inventaire technique et l'évaluation critique des outils qui assurent la liaison entre les agents de codage et les systèmes de design en mai 2026\.

| Outil | Capacités Réelles | Limites Réelles | Maturité | Adoption Observée | Source |
| :---- | :---- | :---- | :---- | :---- | :---- |
| **Claude Code** (CLI) | Exécution autonome de modifications multi-fichiers, planification via /goal (v2.1.139), support natif de Figma MCP.14 | Accumulation quadratique des tokens en session longue, coûts de fonctionnement élevés hors forfaits Max.14 | Élevée.15 | Très forte (standard de fait en CLI).14 | 14 |
| **Cursor** (Visual Editor) | Édition de styles CSS par sliders visuels dans le Cursor Browser, manipulation en direct des propriétés React.17 | Limité aux ajustements esthétiques ; incapable de structurer des architectures de fichiers complexes.4 | Moyenne à élevée.18 | Très forte chez les développeurs front-end.18 | 17 |
| **Figma MCP** (Officiel) | Lecture de la hiérarchie des calques, extraction des variables, intégration de Code Connect.1 | Accès en écriture restreint à la bêta ; nécessite un siège payant Dev ou Full.3 | Moyenne (Beta).3 | Forte au sein des grandes organisations.3 | 1 |
| **Figma CLI & Code Connect** | Liaison stricte entre un composant Figma et son implémentation dans le code (React, Swift, Kotlin).9 | Exige une maintenance manuelle rigoureuse des fichiers de configuration Code Connect.4 | Élevée.9 | Forte chez les ingénieurs de systèmes de design.20 | 3 |
| **Claude Design** | Extraction automatique de design systems à partir de code ou d'URL, édition collaborative par sliders.11 | Consommation extrême de tokens ; pas de mode multijoueur synchrone ; code généré non conforme pour la production.13 | Moyenne (Research Preview).11 | Modérée (utilisé en phase de cadrage amont).12 | 11 |
| **Google Stitch** (v2.0) | Génération multi-écrans basée sur Gemini 3.1 Pro/Flash, voice canvas, export du format DESIGN.md.21 | Code généré trop verbeux nécessitant un refactoring ; verrouillage partiel au sein de l'écosystème Google.8 | Moyenne.21 | Forte chez les développeurs solos et en prototypage.22 | 21 |
| **EXDST Figma MCP** (Open-source) | Serveur MCP tiers autorisant l'écriture complète (CRUD) dans Figma via relais WebSocket local.24 | Demande l'installation manuelle d'un plugin Figma non approuvé en sandbox de développement.24 | Moyenne.24 | Adopté par la communauté code-first (Liase).24 | 24 |

## **Le workflow opérationnel recommandé**

Pour maintenir un alignement continu sans subir les frictions des générations IA anarchiques, le workflow le plus mature en mai 2026 s'articule autour de quatre phases distinctes.

\+-----------------------------------------------------------------+  
|               PHASE 1 : EXPLORATION & IDÉATION                  |  
| Outils : Claude Design / Google Stitch                          |  
| Rôle : Générer les concepts et exporter le fichier DESIGN.md     |  
\+-----------------------------------------------------------------+  
                                │  
                                ▼  
\+-----------------------------------------------------------------+  
|            PHASE 2 : ALIGNEMENT & GÉNERATION CONFORME           |  
| Outils : Claude Code / Figma MCP / Code Connect                 |  
| Rôle : Valider le "Preflight" et générer le code tokenisé       |  
\+-----------------------------------------------------------------+  
                                │  
                                ▼  
\+-----------------------------------------------------------------+  
|             PHASE 3 : REVIEW VISUELLE & INSPECTION              |  
| Outils : Cursor Browser (Visual Edit) / Previews VS Code        |  
| Rôle : Ajuster les espacements et valider l'accessibilité       |  
\+-----------------------------------------------------------------+  
                                │  
                                ▼  
\+-----------------------------------------------------------------+  
|             PHASE 4 : SYNCHRONISATION CANVAS (SYNC)             |  
| Outils : Figma Code to Canvas (/prototype-to-figma)             |  
| Rôle : Réimporter les écrans codés et pousser les tokens        |  
\+-----------------------------------------------------------------+

### **Description détaillée des phases**

#### **Phase 1 : Exploration et idéation**

* **Outil choisi** : Claude Design ou Google Stitch.11  
* **Raison du choix** : Ces environnements permettent de s'affranchir temporairement de la rigueur du système de design pour explorer des "vibes" et des architectures d'écrans complexes.11  
* **Alternative en cas de blocage** : Prototypage rapide sous Figma à l'aide de composants génériques du kit.6  
* **Durée typique** : 1 à 2 heures.  
* **Livrable** : Un premier jet d'écrans interactifs et un fichier DESIGN.md extrait par l'agent.8

#### **Phase 2 : Alignement et génération conforme**

* **Outil choisi** : Claude Code (branché au serveur Figma MCP local ou distant).1  
* **Raison du choix** : Contrairement au consensus marketing qui vante les mérites de la génération en un clic, le designer doit ici forcer l'agent à analyser le fichier system.md et à rechercher les liaisons Code Connect existantes avant de générer du code React.2 L'agent vérifie la présence des composants requis et utilise uniquement les tokens officiels.5  
* **Alternative en cas de blocage** : Inspection manuelle du Dev Mode Figma et rédaction d'un prompt d'alignement enrichi des variables copiées.4  
* **Durée typique** : 1 heure.

#### **Phase 3 : Review visuelle et inspection**

* **Outil choisi** : Cursor Browser avec Visual Editor.17  
* **Raison du choix** : L'intégration d'un navigateur web au sein même de l'IDE permet d'ajuster les espacements fins, les alignements et les contrastes de couleurs à l'aide de sliders visuels sans jamais quitter la base de code.17 Les modifications de style s'écrivent directement dans les fichiers CSS ou Tailwind du projet.18  
* **Alternative en cas de blocage** : Utilisation de l'aperçu HTML de VS Code 1.121 combiné à des validations de mise au point manuelles.25  
* **Durée typique** : 1 à 2 heures.

#### **Phase 4 : Synchronisation canvas (Handoff inverse)**

* **Outil choisi** : Figma Code to Canvas (via la commande /prototype-to-figma exécutée dans l'agent).3  
* **Raison du choix** : Ce protocole importe l'interface en cours d'exécution sur localhost directement sur le canvas Figma sous forme d'écrans vectorisés.3 Il extrait également les nouvelles variables de styles définies en code pour mettre à jour automatiquement le panneau de variables Figma, maintenant ainsi une source unique de vérité.3  
* **Alternative en cas de blocage** : Capture d'écran classique et réalignement visuel manuel pour les composants interactifs complexes.4  
* **Durée typique** : 30 minutes.

### **Variantes de workflows documentées**

#### **Variante A : Le flux "Figma-First" (Recommandé pour les équipes de marque et de systèmes de design)**

Ce workflow considère que Figma est l'autorité absolue. L'agent n'a pas le droit d'improviser : chaque composant généré doit correspondre à une liaison Code Connect préexistante dans Figma.6

* *Avantage* : Parité absolue entre le design et le code (taux de drift proche de 0%).6  
* *Inconvénient* : Processus plus lourd qui freine les phases de prototypage jetable.

#### **Variante B : Le flux "Code-First" (Recommandé pour le prototypage rapide de produits SaaS)**

Le designer écrit ou fait générer l'interface directement en code (vibe coding).3 Figma n'intervient qu'en bout de chaîne, comme outil de contrôle de conformité, de documentation et de présentation client grâce au mécanisme de capture "Live UI to Figma".3

* *Avantage* : Vélocité de développement extrême.  
* *Inconvénient* : Le canvas Figma peut rapidement se transformer en un amas de calques mal structurés si l'import automatique échoue à lier correctement les variables sémantiques.4

## **Conformité design system : pourquoi ça casse, comment ça tient**

Malgré les promesses des éditeurs d'outils d'automatisation, les agents IA ont une tendance innée à briser la conformité des systèmes de design.5 Ils privilégient la résolution visuelle locale en insérant des valeurs brutes ou des styles improvisés (ex: bg-blue-500 au lieu de var(--color-brand-primary)) pour satisfaire immédiatement la demande de l'utilisateur.5

### **Pourquoi les méthodes naïves échouent**

Un point sous-estimé par les démonstrations marketing est la saturation du contexte : intégrer la totalité des tokens d'un design system de taille moyenne dans un prompt système consomme entre 15 000 et 40 000 tokens par message.16 En session longue, l'accumulation quadratique sature la mémoire de travail de l'agent, entraînant des "pertes d'attention" où les règles d'utilisation des couleurs et des composants commencent à être ignorées au profit d'improvisations locales.16

### **Les techniques de conformité éprouvées en 2026**

Pour obtenir un taux de conformité supérieur à 95% (mesuré empiriquement sur des dépôts de production), les équipes matures implémentent les patterns structurés suivants 2 :

#### **1\. L'utilisation conjointe des fichiers CLAUDE.md et system.md**

Plutôt que d'espérer qu'un agent se souvienne de règles énoncées dans un chat, le designer stocke les contraintes comportementales directement dans la structure du projet 2 :

* CLAUDE.md définit les règles de développement et interdit formellement l'utilisation de valeurs hexadécimales brutes ou de composants HTML natifs non enveloppés dans des composants du système de design.2  
* system.md sert d'annuaire de composants pour l'IA, détaillant quand privilégier un type de bouton ou d'encart par rapport à un autre.2

#### **2\. Les Skills de préflight et de style binding**

Ces packages d'instructions personnalisés pour Claude Code automatisent deux étapes cruciales 1 :

* Le skill de *Preflight Check* vérifie que le serveur Figma MCP est connecté et extrait la table de correspondance des variables actives avant d'initier toute tâche de génération.5  
* Le skill de *Style Binding* analyse automatiquement le code produit et réécrit les valeurs hexadécimales ou Tailwind brutes en variables CSS sémantiques.5

### **Exemple complet de setup minimal viable (MVS)**

#### **Fichier : .claude/CLAUDE.md**

# **CLAUDE.md \- Comportement de l'Agent pour le Design System**

## **Directives de Codage Visuel**

* Interdiction formelle d'écrire des valeurs hexadécimales de couleur brutes (ex: \#ffffff) ou des valeurs numériques d'espacement brutes (ex: 12px, 24px) dans le code de production.  
* Utiliser obligatoirement les tokens sémantiques documentés dans DESIGN.md.  
* Ne jamais utiliser de balises HTML d'interface nues (ex: \<button\>, \<input\>). Rechercher systématiquement leur équivalent tokenisé dans system.md et via les liaisons Code Connect de Figma MCP.

## **Protocole de Session**

1. Lancer un Preflight de validation de connexion : claude mcp list.  
2. Après toute génération ou modification de fichier d'interface, exécuter le script de validation de styles : npm run lint:tokens.

#### **Fichier : DESIGN.md**

YAML  
\---  
design\_system:  
  name: "SaaS Fintech Core"  
  version: "3.4.0"  
tokens:  
  color:  
    primitive:  
      brand-blue-500: "\#2563EB"  
      neutral-gray-900: "\#111827"  
    semantic:  
      color-brand-primary: "var(--brand-blue-500)"  
      color-text-title: "var(--neutral-gray-900)"  
  spacing:  
    scale:  
      space-sm: "8px"  
      space-md: "16px"  
      space-lg: "24px"  
  radius:  
    default: "8px"  
\---

\# Directives de Rendu  
Tous les composants doivent s'aligner sur la grille de 8px définie ci-dessus.

#### **Fichier : system.md**

# **system.md \- Registre des Composants de l'Application**

## **Composant : Button**

* Import : import { Button } from '@/components/ui/button'  
* Variantes : variant="primary" (Action principale, une seule par écran), variant="secondary", variant="ghost".  
* Props d'espacement : Ne jamais forcer des marges externes (margin) sur le bouton ; utiliser l'auto-layout du conteneur parent.

## **Composant : FormField**

* Import : import { FormField } from '@/components/ui/form-field'  
* Props : label, placeholder, error, disabled.

## **Études de cas**

### **Cas d'étude 1 : Parallel HQ – Automatisation industrielle de système de design**

* **Setup technique** : Claude Code \+ Figma MCP Server branché sur un dépôt monorepo d'entreprise, combiné avec l'interface visuelle Code Connect UI de Figma.6  
* **Métriques constatées** :  
  * **75 jours de développement économisés** sur une période de six mois en supprimant la phase de documentation manuelle du handoff.6  
  * **Taux de drift visuel** descendu de 28% à moins de 2% sur l'ensemble de la bibliothèque de composants.6  
* **Rapport de mise en œuvre** : Ce qui a fait le succès de l'intégration est la systématisation des métadonnées de Code Connect. Les designers ont annoté directement leurs composants Figma avec des snippets d'exemples d'utilisation réels.6 Claude Code a pu consommer ces annotations via MCP pour reproduire instantanément des mises en page sans improviser la structure des propriétés (props).6

### **Cas d'étude 2 : Builder.io – Pipeline de conversion déterministe**

* **Setup technique** : Claude Code \+ compilateur ouvert Mitosis \+ Figma MCP.6  
* **Métriques constatées** :  
  * Génération de composants conformes multi-frameworks (React, Vue, Svelte) avec un **alignement de styles de 1:1** dès le premier essai.6  
  * **Réduction de 80% des allers-retours de revue de code** pour des détails de mise en page (paddings, alignements).6  
* **Rapport de mise en œuvre** : Le point clé a été le déploiement d'un script de validation post-génération combinant Playwright et l'API Figma MCP.6 L'agent génère le composant, lance un test de rendu visuel local, prend une capture d'écran et la compare pixel par pixel au modèle vectoriel extrait de Figma, appliquant de lui-même des correctifs de positionnement jusqu'à élimination complète des écarts.6

### **Cas d'étude 3 : EXDST – Conception et écriture de canvas en temps réel**

* **Setup technique** : Serveur MCP open-source propriétaire basé sur un relais local WebSockets et un plugin Figma de développement (Figma Puppeteer).24  
* **Métriques constatées** :  
  * Scaffolding d'un composant de formulaire complexe (8 nœuds auto-layout) directement sur le canvas Figma en **2 minutes** via invite de commande, contre plus de 10 minutes manuellement.24  
  * Importation et reconstruction vectorielle propre d'une page web locale (localhost:3000) vers le canvas Figma en **5 minutes**.24  
* **Rapport de mise en œuvre** : Ce qui a fonctionné est le contournement de la nature "lecture seule" de l'API Figma MCP officielle.24 En développant un serveur d'écriture bidirectionnel, les concepteurs de l'agence ont pu demander à Claude Code d'organiser leurs fichiers, de renommer automatiquement les calques selon des conventions sémantiques et de créer des variantes de composants directement sur Figma.24

### **Retours de la communauté francophone (Liase, Discord Anthropic Builders)**

Les praticiens de la communauté francophone *Liase* (qui réunit des designers et développeurs code-first actifs en SaaS et fintech) soulignent une friction opérationnelle majeure :

* Les restrictions de sécurité et d'accès aux fichiers en entreprise empêchent souvent l'usage du serveur Figma MCP distant d'Anthropic (hébergé à l'adresse mcp.figma.com).1  
* La majorité des designers français interrogés optent pour l'installation du serveur Figma MCP de bureau fonctionnant localement (port 3845).1 Bien que l'authentification doive être renouvelée régulièrement en raison de l'expiration imprévisible des sessions web de Figma, cela garantit que la propriété intellectuelle de la maquette ne quitte pas la machine locale.4

## **Visual feedback loop — solutions et limites**

L'une des plus grandes frustrations du designer travaillant en code-first est la perte de l'évaluation esthétique instantanée. Sans canevas visuel direct, l'ingénieur design doit sans cesse compiler, actualiser et inspecter les éléments.5

### **Les solutions de boucle visuelle en 2026**

En mai 2026, l'industrie propose plusieurs approches pour combler cette lacune :

#### **1\. Le visual editor intégré de Cursor**

Le Cursor Browser intègre un inspecteur visuel de propriétés couplé à des contrôles d'édition (drag-and-drop, sliders CSS).17 Lorsque l'on ajuste une marge ou une couleur à l'écran, l'agent trouve la ligne exacte dans le code source React et propose la modification sous forme de pull request.18 Cette solution est aujourd'hui largement déployée en production pour les phases d'ajustement fin.19

#### **2\. L'aperçu HTML natif de VS Code**

La version 1.121 de VS Code intègre des aperçus HTML et Mermaid en natif, permettant aux agents de générer des variantes d'interface et d'afficher le rendu directement dans un panneau latéral sans lancer de serveur local lourd.25

#### **3\. La sélection interactive de Claude Code (Glow/Pill Selector)**

Ce que la documentation officielle d'Anthropic ne dit pas, mais qui est documenté par les retours de praticiens sur Reddit, est la capacité de Claude Code à proposer des choix esthétiques discrets avant d'écrire du code.27 Face à une capture d'écran de barre de navigation, l'agent ne réécrit pas directement le CSS ; il propose d'abord des directions de style claires (ex: "Refined gold pill", "Sparkle prefix", "Glow halo around text") et attend la confirmation visuelle de l'utilisateur.27

### **La viabilité de l'export inverse (Code → Figma)**

La promesse d'une boucle parfaite où le code génère automatiquement une maquette Figma conforme reste en grande partie compromise.4

#### **Ce qui fonctionne**

L'importation de variables de style simples, la création de collections de tokens à partir de fichiers JSON (/figma-generate-library) et la vectorisation statique de composants simples (comme des boutons ou des cartes d'information).3

#### **Ce qui casse**

La logique applicative complexe. Dès qu'un composant de production contient des hooks React (useState, useEffect), des liaisons d'API, des conditions d'affichage basées sur des rôles utilisateurs ou des animations complexes, le fait de l'exporter vers Figma via des convertisseurs de code (ou de le manipuler sur le canvas avant de le réimporter) détruit ou supprime toute la logique métier.4 La reconstruction inverse écrase les fichiers, obligeant les développeurs à réécrire manuellement l'interactivité.4

#### **Recommandation pragmatique**

Le designer doit adopter une approche asymétrique. Figma doit être utilisé uniquement pour :

1. La validation esthétique et ergonomique globale.3  
2. La gestion centralisée des tokens et des variables de marque.3 Le code de production doit quant à lui rester l'autorité suprême pour la logique applicative, l'interactivité et l'intégration des API.7 La synchronisation de Figma vers le code s'effectue de manière déterministe via MCP et Code Connect, tandis que le retour du code vers Figma sert uniquement à la documentation visuelle statique des écrans.3

## **design.md / Stitch — analyse critique**

L’émergence du format DESIGN.md promu par Google à travers son outil Stitch 2.0 en mars 2026 soulève une interrogation : s'agit-il d'une avancée technique majeure ou d'un simple rebranding marketing de pratiques existantes?.8

### **Révolution ou packaging?**

Pour répondre précisément à cette question, il convient de dresser la comparaison technique suivante :

| Dimension | Document Markdown Classique (Repo Git) | Spécification DESIGN.md (Google Stitch) |
| :---- | :---- | :---- |
| **Structure des données** | Texte libre non structuré, destiné exclusivement à la lecture humaine. | En-tête YAML normalisé (front-matter) contenant des tokens machine-readables.2 |
| **Mode de traitement** | Consommé de manière passive par les développeurs (nécessite une réécriture manuelle). | Consommé activement et de manière déterministe par les agents IA (LLM parsers).8 |
| **Liaison avec les outils** | Isolé dans le dépôt, déconnecté des outils d'édition visuelle. | Connecté bidirectionnellement à Stitch et aux IDE via des serveurs MCP dédiés.8 |
| **Richesse sémantique** | Limité à la documentation de style. | Intègre des règles d'intention d'usage à destination des LLM (prose d'interdiction et d'exclusivité).2 |

Le format DESIGN.md dépasse largement le simple cadre de la documentation.8 Il constitue un véritable **manifeste d'exécution pour les machines**.8 Son intérêt réside dans sa structure hybride : l'en-tête YAML permet d'extraire de manière déterministe les variables de styles (couleurs, polices, espacements), tandis que la partie prose rédigée en Markdown donne aux agents les contraintes d'application contextuelles que les API de tokens classiques (JSON) sont incapables d'exprimer.2

### **Adoption et limites réelles**

Bien que Claude Design et des environnements comme Antigravity aient adopté le support de DESIGN.md pour contraindre leurs générations, le format reste encore peu répandu au sein des grandes entreprises disposant d'architectures de tokens matures basées sur Style Dictionary ou les variables Figma natives.7 Ces organisations considèrent DESIGN.md comme une étape de traduction supplémentaire et redondante, préférant requêter directement l'API de variables Figma par le biais de serveurs MCP personnalisés.7

## **Checklist actionnable "demain matin"**

Voici les étapes concrètes à suivre pour déployer ce workflow opérationnel sur un prochain projet client :

### **Phase 1 : Cadrage et configuration de l'environnement**

* \[ \] Vérifier que l'application Figma Desktop est à jour et s'assurer de disposer d'un siège payant Dev ou Full.4  
* \[ \] Installer Claude Code en ligne de commande : npm install \-g @anthropic-ai/claude-code.4  
* \[ \] Créer un dossier .claude à la racine de la codebase du projet.28  
* \[ \] Initialiser le fichier de comportement .claude/CLAUDE.md.2  
* \[ \] Créer le fichier de spécifications machine-readable DESIGN.md contenant les tokens de marque.2  
* \[ \] Rédiger le catalogue de composants autorisés dans system.md.2

### **Phase 2 : Connexion des outils et activation du MCP**

* \[ \] Dans Figma Design, ouvrir le Dev Mode et activer le serveur MCP local (Preferences \> Enable Dev Mode MCP Server).1  
* \[ \] Copier l'adresse de connexion du serveur de bureau (ex: http://127.0.0.1:3845/sse).1  
* \[ \] Dans le terminal, connecter l'agent Claude Code au serveur Figma : claude mcp add \--transport sse figma-server http://127.0.0.1:3845/sse.4  
* \[ \] Valider la connexion en saisissant /mcp ou claude mcp list.1  
* \[ \] Générer un jeton d'accès personnel Figma (PAT) dans les paramètres du compte pour les configurations de rechange hors serveur de bureau.4  
* \[ \] Lier les composants React existants dans le code aux calques Figma à l'aide de la CLI Code Connect : figma-connect-cli.9

### **Phase 3 : Production et alignement continu**

* \[ \] Avant toute génération, exécuter la commande de Preflight pour s'assurer que l'agent a bien lu les variables Figma.5  
* \[ \] Pour chaque demande de composant, fournir à l'agent le lien de sélection Figma du conteneur parent pour lui donner le contexte de structure.4  
* \[ \] Surveiller régulièrement le taux de remplissage du contexte en saisissant la commande /context.16  
* \[ \] Dès qu'un composant visuel est validé par l'agent, saisir la commande /clear ou /compact pour libérer la mémoire de travail.14  
* \[ \] Lancer l'application localement (localhost) et ouvrir le Cursor Browser.18  
* \[ \] Cliquer sur "Visual Edit" pour ajuster finement les espacements et les couleurs à l'aide de sliders.18  
* \[ \] Exécuter le skill /prototype-to-figma pour réimporter le prototype vectorisé dans Figma et valider l'absence de régressions.3  
* \[ \] Pousser les modifications de code sur GitHub et s'assurer que les modifications de tokens dans DESIGN.md sont validées par le pipeline d'intégration continue.7

## **Pièges et anti-patterns**

* **Le piège de la combustion quadratique des tokens (Context Loop)** : Ne jamais laisser une session d'agent (Claude Code ou Cursor) ouverte pendant plusieurs heures sans la purger. Chaque nouveau message renvoie la totalité de l'historique et des fichiers lus, multipliant les coûts de fonctionnement par dix en fin de journée.16 Utilisez systématiquement la commande /clear pour réinitialiser le contexte après chaque livraison de composant.14  
* **L'anti-pattern des pixels volants (Floating Hex Codes)** : Tolérer des valeurs hexadécimales brutes ou des dimensions numériques en dur dans les fichiers CSS sous prétexte de rapidité. Ces valeurs échappent au contrôle du système de design et provoquent une dérive esthétique incontrôlable dès la mise en production du composant suivant.5  
* **L'illusion du round-tripping automatique** : Croire que l'on peut écraser de façon bidirectionnelle le code et la maquette Figma sans surveillance humaine. L'importation automatique d'écrans Figma vers le code détruit systématiquement les handlers d'état React et les intégrations de services (ex: Stripe, auth).4 Le code doit demeurer l'unique source de vérité logique, Figma l'unique source de validation esthétique.7  
* **La régression par micro-patching (Infinite Loop Syndrome)** : Laisser un agent IA corriger des bugs visuels locaux en empilant des correctifs rapides au sein de fichiers volumineux. L'IA finit par perdre la vue d'ensemble de l'architecture CSS globale de l'application et introduit des conflits de styles majeurs.13  
* **Les règles de sécurité par défaut permissives (AI Security Blindness)** : Laisser l'agent concevoir les liaisons de données et les règles d'accès lors de la génération d'écrans de formulaires. Les plateformes de génération IA configurent systématiquement des accès à la base de données trop permissifs (comme l'absence de Row Level Security dans Supabase) pour faire fonctionner le prototype au plus vite, exposant les données personnelles des utilisateurs dès la mise en ligne.6

## **Zones d'ombre**

L’analyse technique de l’intégration des outils de conception d'interfaces au sein des flux de développement IA en mai 2026 laisse apparaître trois zones d'incertitude majeures :

1. **La viabilité financière du modèle "All-You-Can-Prompt"**  
   *Niveau de confiance : Moyen.*  
   Les expérimentations tarifaires menées par Anthropic (qui a testé le retrait temporaire de Claude Code de son abonnement de base pour évaluer la sensibilité au prix des utilisateurs) suggèrent que la consommation d’infrastructure cloud pour faire tourner de grands modèles de vision sur des sessions prolongées est trop élevée pour être viable sous la forme d'abonnements fixes bon marché.7 Les équipes produit doivent s'attendre à une hausse structurelle des coûts de fonctionnement de leurs agents ou à un passage vers une facturation stricte au token consommé.7  
2. **La résolution des conflits multijoueurs lors de l'écriture MCP synchrone**  
   *Niveau de confiance : Moyen.*  
   Lorsque plusieurs concepteurs d'une même équipe activent des agents de génération autonomes sur le même fichier de conception Figma en utilisant des passerelles d'écriture (comme EXDST), le taux de collision de modifications, d'écrasement de calques et de latences de rafraîchissement augmente de façon critique.13 Les mécanismes de verrouillage de sections ou de fusion de conflits (similaires aux pull requests Git) n'ont pas encore été stabilisés par les éditeurs de logiciels.13  
3. **La dépendance technique vis-à-vis des infrastructures géantes privées**  
   *Niveau de confiance : Élevé.*  
   L'amélioration de la vitesse d'exécution de modèles haut de gamme comme Claude Opus 4.7 repose sur des choix d'infrastructure massifs, à l'image du déploiement massif de serveurs sur le centre de données Colossus de SpaceX.31 Cette centralisation pose des questions de souveraineté des données pour les entreprises européennes de la fintech soumises à des réglementations strictes d'hébergement local de leurs données de conception et de développement.32

#### **Sources des citations**

1. Claude Code and Figma: Set up the MCP server – Figma Learn ..., consulté le mai 22, 2026, [https://help.figma.com/hc/en-us/articles/39888612464151-Claude-Code-and-Figma-Set-up-the-MCP-server](https://help.figma.com/hc/en-us/articles/39888612464151-Claude-Code-and-Figma-Set-up-the-MCP-server)  
2. I Gave My Agent CLAUDE.md and DESIGN.md. It Ignored My Entire Component Library., consulté le mai 22, 2026, [https://www.designsystemscollective.com/i-gave-my-agent-claude-md-and-design-md-it-ignored-my-entire-component-library-c6d7e9be34d4](https://www.designsystemscollective.com/i-gave-my-agent-claude-md-and-design-md-it-ignored-my-entire-component-library-c6d7e9be34d4)  
3. Workflow lab: Code to canvas – Figma Learn \- Help Center, consulté le mai 22, 2026, [https://help.figma.com/hc/en-us/articles/40219873508247-Workflow-lab-Code-to-canvas](https://help.figma.com/hc/en-us/articles/40219873508247-Workflow-lab-Code-to-canvas)  
4. Claude Code MCP with Figma: A Beginner's Step-by-Step Setup Guide \- Medium, consulté le mai 22, 2026, [https://medium.com/@nithin\_94885/claude-code-mcp-with-figma-a-beginners-step-by-step-setup-guide-84546b46c07d](https://medium.com/@nithin_94885/claude-code-mcp-with-figma-a-beginners-step-by-step-setup-guide-84546b46c07d)  
5. How to make Claude Code follow your design system in Figma | by ..., consulté le mai 22, 2026, [https://uxdesign.cc/how-to-make-claude-code-follow-your-design-system-in-figma-559618cffaa9](https://uxdesign.cc/how-to-make-claude-code-follow-your-design-system-in-figma-559618cffaa9)  
6. claude-code-ultimate-guide/guide/workflows/design-to-code.md at ..., consulté le mai 22, 2026, [https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/guide/workflows/design-to-code.md](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/guide/workflows/design-to-code.md)  
7. Claude Code vs Figma Make vs MCP: The Real Bottleneck Isn't Generation — It's Sync, consulté le mai 22, 2026, [https://www.designsystemscollective.com/claude-code-vs-figma-make-vs-mcp-the-real-bottleneck-isnt-generation-it-s-syncc-45ef9388d5e5](https://www.designsystemscollective.com/claude-code-vs-figma-make-vs-mcp-the-real-bottleneck-isnt-generation-it-s-syncc-45ef9388d5e5)  
8. What The Hell Is Google Stitch's DESIGN.md And Why Should You ..., consulté le mai 22, 2026, [https://www.designwhine.com/what-the-hell-is-google-stitchs-design-md/](https://www.designwhine.com/what-the-hell-is-google-stitchs-design-md/)  
9. 8 Best Figma to Code Tools (2026) \- AI Designer, consulté le mai 22, 2026, [https://www.aidesigner.ai/blog/figma-to-code-tools](https://www.aidesigner.ai/blog/figma-to-code-tools)  
10. 10 Best MCP Servers for Developers in 2026 \- Firecrawl, consulté le mai 22, 2026, [https://www.firecrawl.dev/blog/best-mcp-servers-for-developers](https://www.firecrawl.dev/blog/best-mcp-servers-for-developers)  
11. Claude Design Review: Features, Pricing, and Real Limitations \- UX Pilot, consulté le mai 22, 2026, [https://uxpilot.ai/blogs/claude-design-review](https://uxpilot.ai/blogs/claude-design-review)  
12. What Is Claude Design? Anthropic's AI Design Tool Explained \- DataCamp, consulté le mai 22, 2026, [https://www.datacamp.com/blog/claude-design](https://www.datacamp.com/blog/claude-design)  
13. Claude Design (Anthropic): The Complete 2026 Guide, consulté le mai 22, 2026, [https://agence-scroll.com/en/blog/claude-design-anthropic-2026-guide](https://agence-scroll.com/en/blog/claude-design-anthropic-2026-guide)  
14. Claude Code Pricing In 2026: Plans, Token Costs, And What It Actually Costs to Use, consulté le mai 22, 2026, [https://www.cloudzero.com/blog/claude-code-pricing/](https://www.cloudzero.com/blog/claude-code-pricing/)  
15. Week 20 · May 11–15, 2026 \- Claude Code Docs, consulté le mai 22, 2026, [https://code.claude.com/docs/en/whats-new/2026-w20](https://code.claude.com/docs/en/whats-new/2026-w20)  
16. How to Stop Burning Through Claude Code Tokens: The Context Management Guide for Beginners | MindStudio, consulté le mai 22, 2026, [https://www.mindstudio.ai/blog/how-to-stop-burning-through-claude-code-tokens-context-management-guide-beginners](https://www.mindstudio.ai/blog/how-to-stop-burning-through-claude-code-tokens-context-management-guide-beginners)  
17. A visual editor for the Cursor Browser, consulté le mai 22, 2026, [https://cursor.com/blog/browser-visual-editor](https://cursor.com/blog/browser-visual-editor)  
18. Cursor IDE Updates: Latest Features \[2026\] \- usama.codes, consulté le mai 22, 2026, [https://usama.codes/blog/cursor-ide-december-2025-updates-features](https://usama.codes/blog/cursor-ide-december-2025-updates-features)  
19. Cursor Visual Editor: Canva-level ease without low-code lock-in | Meldus, consulté le mai 22, 2026, [https://www.meldus.com/blog/2025/cursor-visual-editor-browser/](https://www.meldus.com/blog/2025/cursor-visual-editor-browser/)  
20. Figma Design Systems in 2026: 26 Scalable Features & Tips \- Zeroheight, consulté le mai 22, 2026, [https://zeroheight.com/blog/building-scalable-design-systems-with-figma-26-tips-for-2026/](https://zeroheight.com/blog/building-scalable-design-systems-with-figma-26-tips-for-2026/)  
21. Google Stitch Tutorial 2026: The Tool That Made Figma's Stock Drop 10% in a Day \- Medium, consulté le mai 22, 2026, [https://medium.com/@0xmega/google-stitch-tutorial-2026-the-tool-that-made-figmas-stock-drop-10-in-a-day-7a051b77a591](https://medium.com/@0xmega/google-stitch-tutorial-2026-the-tool-that-made-figmas-stock-drop-10-in-a-day-7a051b77a591)  
22. Google Stitch Review: Honest Look at the AI Design Tool (2026) \- Moda, consulté le mai 22, 2026, [https://moda.app/blog/google-stitch-review](https://moda.app/blog/google-stitch-review)  
23. Google Stitch \+ Antigravity: Complete Design-to-Code Guide (2026), consulté le mai 22, 2026, [https://antigravity.codes/blog/google-stitch-antigravity-guide](https://antigravity.codes/blog/google-stitch-antigravity-guide)  
24. Figma MCP — A case study by EXDST, consulté le mai 22, 2026, [https://exdst.com/case-studies/figma-mcp](https://exdst.com/case-studies/figma-mcp)  
25. VS Code 1.121 Adds Remote Agents, Boosts Claude Code Functionality Again, consulté le mai 22, 2026, [https://visualstudiomagazine.com/articles/2026/05/20/vs-code-1-121-adds-remote-agents-built-in-html-and-mermaid-previews.aspx](https://visualstudiomagazine.com/articles/2026/05/20/vs-code-1-121-adds-remote-agents-built-in-html-and-mermaid-previews.aspx)  
26. The Complete Guide to Building a Design System in Figma Using Claude Code, consulté le mai 22, 2026, [https://www.designsystemscollective.com/the-complete-guide-to-building-a-design-system-in-figma-using-claude-code-bd99d2b67327](https://www.designsystemscollective.com/the-complete-guide-to-building-a-design-system-in-figma-using-claude-code-bd99d2b67327)  
27. New UI Preview feature on Claude Code is really great. : r/ClaudeCode \- Reddit, consulté le mai 22, 2026, [https://www.reddit.com/r/ClaudeCode/comments/1tfn31s/new\_ui\_preview\_feature\_on\_claude\_code\_is\_really/](https://www.reddit.com/r/ClaudeCode/comments/1tfn31s/new_ui_preview_feature_on_claude_code_is_really/)  
28. How UI/UX Designers Can Use “CLAUDE.md Style Guide” for UI Design Systems \- Medium, consulté le mai 22, 2026, [https://medium.com/@dollyborade07/how-ui-ux-designers-can-use-claude-md-style-guide-for-ui-design-systems-e71530c291f7](https://medium.com/@dollyborade07/how-ui-ux-designers-can-use-claude-md-style-guide-for-ui-design-systems-e71530c291f7)  
29. Claude Code \+ Figma: A Designer-Developer Workflow That Actually Works\! \- Medium, consulté le mai 22, 2026, [https://medium.com/design-bootcamp/claude-code-figma-a-designer-developer-workflow-that-actually-works-b7d7545edc40](https://medium.com/design-bootcamp/claude-code-figma-a-designer-developer-workflow-that-actually-works-b7d7545edc40)  
30. What Is Google Stitch's Design.md File? How AI Design Systems Work | MindStudio, consulté le mai 22, 2026, [https://www.mindstudio.ai/blog/what-is-google-stitch-design-md-file](https://www.mindstudio.ai/blog/what-is-google-stitch-design-md-file)  
31. Live blog: Code w/ Claude 2026 \- Simon Willison's Weblog, consulté le mai 22, 2026, [https://simonwillison.net/2026/May/6/code-w-claude-2026/](https://simonwillison.net/2026/May/6/code-w-claude-2026/)  
32. System Engineer \- Cryptographic systems in Tubize, 1480 | System at Thales Group, consulté le mai 22, 2026, [https://careers.thalesgroup.com/global/en/job/R0305314/System-Engineer-Cryptographic-systems](https://careers.thalesgroup.com/global/en/job/R0305314/System-Engineer-Cryptographic-systems)