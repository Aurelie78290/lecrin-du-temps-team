
# ⌚ Écrin du Temps : Boutique de montres de luxe / Js-Crew809-TeamRocket-P3-G1-lecrindutemps

Plateforme e-commerce full-stack (React + Express + MySQL) dédiée aux passionnés et collectionneurs de montres de luxe.

Ce projet de fin de formation (Wild Code School / Simplon) est un monorepo JS, suivant l'architecture React-Express-MySQL telle qu'enseignée à la Wild Code School (v7.2.4) :
Équipe de 6 développeurs · 7 semaines · Stack imposée RNCP

---
## Présentation

Écrin du Temps est une application web full-stack combinant e-commerce et contenu éditorial, pensée comme un club digital exclusif autour de l'univers horloger. Elle permet aux utilisateurs de consulter un catalogue de montres haut de gamme, gérer leur collection personnelle, effectuer des achats sécurisés via Stripe, et suivre l'actualité horlogère.

---
## Fonctionnalités

### Côté utilisateur
- Consultation du catalogue et recherche par modèle
- Gestion des favoris et collection personnelle
- Panier d'achat dynamique & Paiement sécurisé via Stripe (mode test)
- Actualités horlogères
- Formulaire de contact (EmailJS)
- Espace personnel et historique de commandes

### Côté administrateur
- Dashboard analytique (ChartJS)
- Gestion des montres et actualités (BREAD)
- Gestion des utilisateurs et suivi des transactions

---
## Stack technique

### Front-End
- React · TypeScript · Vite
- React Router · Context API
 - CSS / Media queries (responsive)

### Back-End
- Node.js · Express · TypeScript
- Architecture 3 couches : Router / Actions / Repository

### Base de données
- MySQL · MySQL Workbench
- Modèle relationnel · 15+ tables

### Services tiers & sécurité
- Stripe (paiement sécurisé)
- EmailJS (formulaire de contact)
- ChartJS (dashboard analytique)
- JWT · bcrypt · cookie httpOnly
- Multer (upload photos)

---
## Installation & Utilisation

### Prérequis
- Node.js v18+
- MySQL
- Un compte Stripe (mode test)
- Un compte EmailJS
- Un compte Mailtrap (réinitialisation de mot de passe)

### Cloner le dépôt
git clone https://github.com/WildCodeSchool/Js-Crew809-TeamRocket-P3-G1-lecrindutemps
cd Js-Crew809-TeamRocket-P3-G1-lecrindutemps

### Installer les dépendances
- Frontend
cd frontend && npm install
- Backend
cd ../backend && npm install


### Variables d'environnement

Créer un fichier `.env` dans le dossier `server` à partir du fichier .env.sample fourni :
            # Application
            APP_PORT=3310
            APP_SECRET=your_jwt_secret
            
            # Base de données
            DB_HOST=localhost
            DB_PORT=3306
            DB_USER=your_database_username
            DB_PASSWORD=your_database_password
            DB_NAME=your_database_name
            
            # CORS
            CLIENT_URL=http://localhost:3000
            
            # Mailtrap (réinitialisation de mot de passe)
            MAIL_HOST=sandbox.smtp.mailtrap.io
            MAIL_PORT=2525
            MAIL_USER=your_mailtrap_user_id
            MAIL_PASS=your_mailtrap_password
            
            # Stripe
            STRIPE_SECRET_KEY=sk_test_...
            STRIPE_WEBHOOK_SECRET=whsec_...
            
Créer un fichier `.env` dans le dossier `client` à partir du fichier .env.sample fourni :
            # URL de l'API back-end
            VITE_API_URL=http://localhost:3310


### Commandes de Base

        | Commande               | Description                                                                 |
        |------------------------|-----------------------------------------------------------------------------|
        | `npm install`          | Installe les dépendances pour le client et le serveur                       |
        | `npm run db:migrate`   | Met à jour la base de données à partir d'un schéma défini                   |
        | `npm run dev`          | Démarre les deux serveurs (client et serveur) dans un seul terminal         |
        | `npm run check`        | Exécute les outils de validation (linting et formatage)                     |
        | `npm run test`         | Exécute les tests unitaires et d'intégration                                |


---
## Base de données

Importer le schéma SQL fourni dans le dossier `/database` :
mysql -u your_user -p ecrin_du_temps < database/schema.sql
        
---
## Structure des Dossiers


       my-project/
    ├── server/
    │   ├── app/
    │   │   ├── modules/
    │   │   │   ├── articles/
    │   │   │   │   ├── articlesActions.ts
    │   │   │   │   └── articlesRepository.ts
    │   │   │   ├── basket/
    │   │   │   │   ├── basketActions.ts
    │   │   │   │   └── basketRepository.ts
    │   │   │   ├── stripe/
    │   │   │   │   └── stripeActions.ts
    │   │   │   ├── watch/
    │   │   │   └── user/
    │   │   ├── middlewares/
    │   │   │   ├── isAuth.ts
    │   │   │   └── isAdmin.ts
    │   │   └── router.ts
    │   ├── database/
    │   │   ├── client.ts
    │   │   └── schema.sql
    │   ├── .env
    │   └── .env.sample
    │
    └── client/
        ├── src/
        │   ├── components/
        │   ├── pages/
        │   ├── contexts/
        │   │   └── ShopContext.tsx
        │   └── main.tsx
        ├── .env
        └── .env.sample
  

---
## Mes contributions

Ce projet étant un travail d'équipe, voici mon périmètre de contribution personnel :

### Front-End
- Pages et composants de la section **Actualités** (liste, détail, ArticleCard)
- **Panier dynamique** : composant ShopBasket, ShopContext (Context API), gestion des états
- **Système de favoris** : FavoriteIcon, FavoritesDrawer
- **Barre de recherche** sur la page Boutique
- Intégration du **formulaire de contact** via EmailJS
- Intégration du flux de **paiement Stripe** côté front
- Responsive design sur l'ensemble de mes composants

### Back-End
- `articlesActions.ts` + `articlesRepository.ts` → gestion complète des actualités (BREAD)
- Routes BREAD actualités dans `router.ts` (routes publiques + routes admin protégées)
- `basketActions.ts` + `basketRepository.ts` → gestion du panier (GET, POST, DELETE)
- `stripeActions.ts` → création session Stripe, vérification disponibilité, gestion retour paiement
- Modification table `order_archive` : ajout colonne `stripe_session_id`
- Tests des routes via Thunder Client

---
## Sécurité
- JWT stocké en cookie httpOnly / secure
- Middleware `isAuth` et contrôle admin
- Hachage bcrypt des mots de passe
- Paiement Stripe sécurisé (mode test)

---
## Équipe & période

Projet réalisé par 6 développeurs dans le cadre de la formation Wild Code School / Simplon — promotion Js-Crew809-TeamRocket.
Durée : Décembre 2025 — Février 2026


