# TODO — CubeHost

> **Règle d'or** : une seule feature en chantier à la fois. On ne démarre une feature que quand la précédente coche tous ses critères de « done ». Les idées qui surgissent en cours de route vont dans le **Backlog**, pas dans la tâche du jour.

---

## ✅ Phase 0 — Setup (terminée)

- [x] Initialiser le projet Nuxt (`npx nuxi init .`) + TypeScript
- [x] Versionner : `git init`, premier commit, push sur le repo GitHub
- [x] Ajouter le `README.md` et le `.gitignore` (node_modules, .env, *.sqlite)
- [x] Installer les dépendances de base : `drizzle-orm`, `dockerode`, `better-auth`
- [x] Configurer Drizzle + SQLite (connexion + 1ère migration vide qui tourne)
- [x] Vérifier que dockerode se connecte au démon Docker local (lister les conteneurs en console)
- [x] Mettre en place la maquette / charte graphique (layout de base, couleurs, composants UI)

**Done quand** : `npm run dev` démarre, la page d'accueil s'affiche au design voulu, la DB se connecte, et dockerode liste les conteneurs Docker existants. ✅

---

## 🎯 Phase 1 — MVP

### 1. Auth + RBAC
- [ ] Schéma DB : table `users` (rôle : owner / admin / user)
- [ ] Login / logout (sessions + cookies httpOnly)
- [ ] Middleware de protection des routes (front + API)
- [ ] Garde par rôle côté serveur (pas seulement côté UI)
- [ ] Création du 1er compte owner (seed ou page setup initiale)

**Done quand** : je peux me connecter/déconnecter, une route protégée refuse un visiteur non connecté, et un `user` ne peut pas accéder aux actions réservées à `admin`/`owner` — vérifié côté serveur, pas juste masqué dans l'UI.

### 2. CRUD des serveurs
- [ ] Schéma DB : table `servers` (nom, version, type, port, ressources, id conteneur…)
- [ ] Créer un serveur = créer un conteneur `itzg/minecraft-server` (dockerode) avec volume monté
- [ ] Lister les serveurs (avec leur état : running / stopped)
- [ ] Page détail d'un serveur
- [ ] Modifier la config d'un serveur
- [ ] Supprimer un serveur (conteneur + nettoyage, avec confirmation)

**Done quand** : je crée un serveur depuis l'UI, le conteneur apparaît dans Docker et démarre, je le vois dans la liste avec son état, et je peux le supprimer proprement.

### 3. Contrôle start / stop / restart
- [ ] Boutons start / stop / restart sur la page serveur
- [ ] Appels dockerode correspondants
- [ ] Reflet de l'état en quasi temps réel dans l'UI
- [ ] Gestion des erreurs (conteneur déjà arrêté, échec de démarrage…)

**Done quand** : les trois actions fonctionnent depuis l'UI et l'état affiché correspond toujours à l'état réel du conteneur.

### 4. Console live + commandes RCON
- [ ] Stream des logs du conteneur (dockerode `docker logs --follow`)
- [ ] Pousser les logs au front via WebSocket (Nitro/crossws)
- [ ] Affichage console qui défile en direct
- [ ] Champ de saisie → envoi de commande via RCON
- [ ] 🔒 Contrôle des droits : un `user` ne peut pas envoyer de commandes arbitraires sans contrôle

**Done quand** : les logs s'affichent en live, je peux taper une commande qui s'exécute sur le serveur, et les permissions RCON respectent le rôle.

### 5. Stats live (CPU / RAM / joueurs)
- [ ] Récupérer CPU + RAM via le flux `stats` Docker (dockerode)
- [ ] Récupérer le nombre de joueurs (RCON `list` ou ping Minecraft)
- [ ] Polling toutes les quelques secondes
- [ ] Affichage dans l'UI (jauges / chiffres)

**Done quand** : la page serveur affiche CPU, RAM et joueurs connectés, rafraîchis automatiquement, sans recharger la page.

### 6. Gestionnaire de fichiers
- [ ] Lister les fichiers/dossiers du volume monté d'un serveur
- [ ] 🔒 **Validation des chemins** : tout chemin résolu doit rester DANS le volume autorisé (anti path traversal `../../`)
- [ ] Lire / éditer un fichier de config (texte)
- [ ] Upload de fichiers (mods, plugins)
- [ ] Supprimer un fichier (avec confirmation)

**Done quand** : je navigue dans les fichiers d'un serveur, j'édite une config, j'uploade un mod — et toute tentative de sortir du dossier autorisé est bloquée côté serveur.

---

## 📋 MVP terminé quand…

- [ ] Les 6 features ci-dessus cochent tous leurs critères
- [ ] Un ami avec un compte `user` peut gérer uniquement les serveurs qui lui sont attribués
- [ ] Les 3 points de sécurité sont traités : path traversal, droits RCON, (accès socket Docker noté pour plus tard)
- [ ] L'app tourne de bout en bout sur la vraie machine

---

## 🗂️ Backlog (PAS avant que le MVP soit solide)

### Phase 2 — MVP+1
- Scheduler de tâches (redémarrages programmés, commandes RCON planifiées)
- Backups automatiques planifiés + rétention + restauration en un clic
- Notifications Discord (webhook : crash, démarrage, seuil RAM)
- Partage d'accès temporaire (lien/token limité à un serveur, avec expiration)

### Phase 3 — Roadmap
- Installateur de modpacks/plugins (API Modrinth + CurseForge)
- Métriques historisées (graphes CPU / RAM / joueurs dans le temps)
- Console avancée (historique persistant + recherche dans les logs)
- Proxy de socket Docker (durcissement sécurité)

### Idées en vrac (à trier plus tard)
- _(ajouter ici toute idée qui surgit en cours de dev, pour ne pas dévier de la tâche en cours)_