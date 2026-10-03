# Marchés Ferme : installation sur iPhone

Application web installable (PWA), sur le même principe que GC Blackjack.

## Contenu du dossier

| Fichier | Rôle |
|---|---|
| `index.html` | L'application complète (cours, intrants, sucre, capital markets, météo) |
| `data.json` | Cours de clôture. Ce fichier est remplacé à chaque mise à jour des cours |
| `manifest.webmanifest` | Nom, couleurs et icônes de l'application |
| `sw.js` | Fonctionnement hors ligne : page en cache, dernières données gardées |
| `icons/` | Icône d'écran d'accueil (iPhone 180 px, Android 192 et 512 px) |

## Mise en ligne (Netlify Drop, 2 minutes)

1. Décompresser l'archive.
2. Ouvrir https://app.netlify.com/drop et y glisser le **dossier** `marches-ferme-pwa`.
3. Netlify donne une adresse en `https://…netlify.app`. Créer un compte gratuit pour conserver le site, sinon il expire.

## Installation sur l'iPhone

1. Ouvrir l'adresse Netlify dans **Safari**. Les autres navigateurs ne permettent pas l'installation sur iPhone.
2. Toucher **Partager**, puis **Sur l'écran d'accueil**, puis **Ajouter**.
3. Lancer l'application depuis l'icône : elle s'ouvre en plein écran, sans barre Safari.

## Mises à jour des données

- **Météo** : en direct, rechargée à chaque ouverture via Open-Meteo (gratuit, sans clé).
  - Prévision heure par heure et par moment de la journée.
  - Historique de 12 mois avec pluie, température et ensoleillement, comparé à l'année précédente.
  - Hors réseau, les dernières données restent affichées.
- **Cours** : `data.json` est relu à chaque ouverture. Pour qu'il change, il faut publier un nouveau `data.json` :
  - **Manuel** : glisser à nouveau le dossier mis à jour sur Netlify (Deploys, puis glisser-déposer).
  - **Automatique** : héberger le dossier sur GitHub Pages. La tâche planifiée du soir peut alors pousser le nouveau `data.json` sans intervention.

## Limites

- **Météo** : les valeurs Open-Meteo sont modélisées (réanalyse ERA5 et modèles Météo-France), pas mesurées par une station. Pour un relevé officiel, voir Météo-France ou Infoclimat (liens dans l'application).
- **Utilisation commerciale** : l'API Open-Meteo gratuite est réservée à un usage non commercial, limitée à 10 000 appels par jour, et demande de citer la source (licence CC BY 4.0, déjà fait dans l'application). Un usage commercial demande un abonnement Open-Meteo.
- **Cours** : ce sont les règlements de fin de séance, avec la source de chaque ligne. Il n'y a pas de flux continu.
