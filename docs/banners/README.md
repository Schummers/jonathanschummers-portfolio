# Banners — générateur d'artefacts visuels

Système standalone (comme `docs/cv/`) pour générer des bannières aux bons
formats à partir de templates HTML, exportés en PNG via Puppeteer.
Réutilise les tokens de branding du portfolio (Space Grotesk + Manrope, bleu
`#0A4CF0`, fond `#fafafa`, bordures sans ombres) — mais reste **indépendant**
de l'app Next.js.

## Usage

```bash
node docs/banners/render.mjs <template-rel-path> <format>

# LinkedIn (bannière profil 1584x396, exportée @2x = 3168x792)
node docs/banners/render.mjs ui/linkedin-banner.html linkedin
```

Le PNG sort dans `docs/banners/out/<nom-du-template>.png`.

## Registre des formats

Défini en tête de `render.mjs` (objet `FORMATS`). Ajouter une ligne pour un
nouveau format :

| Clé        | Dimensions | Usage                                  |
| ---------- | ---------- | -------------------------------------- |
| `linkedin` | 1584 × 396 | Bannière de profil LinkedIn (ratio 4:1) |

Zone sûre LinkedIn : coin bas-gauche (~568 × 264) masqué par la photo de
profil ; haut/bas rognables sur mobile. Garder texte + URL centrés/à droite.

Malt n'a pas de bannière de couverture (photo carrée uniquement) → non couvert.

## Pourquoi Puppeteer

Même raison que le CV : rendu fidèle des web-fonts et du layout. Ici on utilise
`page.screenshot()` (PNG) au lieu de `page.pdf()`, avec un viewport fixe et
`deviceScaleFactor: 2` pour un export net.

Les templates référencent les visuels par chemin absolu `/public/images/...`
(le serveur de rendu est rooté à la racine du repo).
