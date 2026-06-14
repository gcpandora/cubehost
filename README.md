# CubeHost

Panel d'administration self-hosted pour héberger et gérer des serveurs Minecraft depuis une interface web. Créer, configurer, piloter et surveiller plusieurs serveurs Minecraft conteneurisés, avec gestion multi-utilisateurs.

> **Échelle visée** : usage perso / petit cercle d'amis — moins de 10 serveurs sur une seule machine. Le projet est volontairement gardé simple et proportionné ; pas d'orchestration multi-node ni d'infra distribuée.

## Fonctionnalités

### MVP
- **Gestion des serveurs** : création, configuration et suppression de serveurs Minecraft (un conteneur Docker par serveur).
- **Contrôle** : start / stop / restart.
- **Console temps réel** : lecture du flux de logs en direct + envoi de commandes via RCON.
- **Statistiques live** : CPU, RAM et nombre de joueurs connectés.
- **Gestionnaire de fichiers** : édition des configs, ajout de mods et de plugins.
- **Multi-utilisateurs** : authentification et contrôle d'accès par rôles (owner / admin / user).

### Prévu (roadmap)
- Tâches planifiées (redémarrages, commandes RCON automatiques).
- Backups automatiques avec rétention et restauration en un clic.
- Notifications Discord (crash, démarrage, seuils de ressources).
- Partage d'accès temporaire par lien à expiration.
- Installateur de modpacks / plugins (Modrinth, CurseForge).
- Métriques historisées (graphes CPU / RAM / joueurs).
- Console avancée avec historique persistant et recherche.

## Stack technique

| Domaine | Choix |
|---|---|
| Framework | [Nuxt](https://nuxt.com/) (frontend + backend Nitro) |
| Langage | TypeScript |
| Base de données | SQLite via [Drizzle ORM](https://orm.drizzle.team/) |
| Conteneurs | [dockerode](https://github.com/apocas/dockerode) → démon Docker |
| Image Minecraft | [`itzg/minecraft-server`](https://github.com/itzg/docker-minecraft-server) |
| Temps réel | WebSockets (Nitro) |
| Console | RCON + stream des logs Docker |
| Auth | Sessions + cookies httpOnly |

## Prérequis

- [Node.js](https://nodejs.org/) 20+ (testé sur v24)
- npm
- [Docker](https://www.docker.com/) (démon accessible localement)

## Installation

```bash
# Cloner le dépôt
git clone https://github.com/<utilisateur>/cubehost.git
cd cubehost

# Installer les dépendances
npm install

# Configurer l'environnement
cp .env.example .env
# puis éditer .env

# Lancer le serveur de développement
npm run dev
```

L'application est disponible sur `http://localhost:3000`.

## Sécurité

CubeHost dialogue avec le socket Docker, ce qui équivaut à un niveau d'accès élevé sur la machine hôte. Points d'attention en cours de développement :

- **Validation des chemins** dans le gestionnaire de fichiers (prévention du path traversal).
- **Contrôle des commandes RCON** selon le rôle de l'utilisateur.
- **Restriction de l'accès au socket Docker** (proxy de socket envisagé).

## Statut

🚧 En développement actif — projet personnel.

## Licence

À définir.
