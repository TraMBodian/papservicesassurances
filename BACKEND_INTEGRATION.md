# Intégration Frontend - Backend

Ce projet a été migré de Supabase vers une intégration personnalisée avec un backend.

## Configuration

### Variables d'environnement (.env)

```
VITE_API_BASE_URL=http://localhost:3001/api
VITE_API_TIMEOUT=10000
```

Remplacez l'URL par celle de votre backend.

## Architecture

### Client API (`src/services/apiClient.ts`)

Classe centralysée pour toutes les requêtes API vers le backend.

**Méthodes disponibles:**
- `login(credentials)` - Connexion utilisateur
- `register(userData)` - Inscription
- `logout()` - Déconnexion
- `getCurrentUser()` - Récupérer l'utilisateur actuel
- `getUsers()` - Récupérer tous les utilisateurs (admin)
- `getAssures()` - Récupérer les assurés
- `createAssure(data)` - Créer un assuré
- `getPolices()` - Récupérer les polices
- `getSinistres()` - Récupérer les sinistres
- Et plus...

### Data Service (`src/services/dataService.ts`)

Service de haut niveau pour accéder aux données, basé sur le API Client.

### Context Auth (`src/context/AuthContext.tsx`)

Context React pour la gestion de l'authentification.

**Mises à jour:**
- Utilise maintenant le API Client au lieu de Supabase
- Stocke le token dans `localStorage` sous la clé `auth_token`

### Email Service (`src/services/emailService.ts`)

Service pour envoyer les emails via le backend.

## API Response Format

Le backend doit retourner les réponses au format suivant:

### Login/Register
```json
{
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "role": "admin|prestataire|client",
    "full_name": "Full Name",
    "organization": "Organization"
  },
  "token": "jwt-token"
}
```

### Get Users
```json
{
  "users": [
    {
      "id": "user-id",
      "email": "user@example.com",
      "role": "admin",
      "status": "active|pending|rejected",
      "full_name": "Full Name"
    }
  ]
}
```

### Get Assures
```json
{
  "assures": [
    {
      "id": "assure-id",
      "numero": "ASS-2024-001",
      "nom": "Diop",
      "prenom": "Moussa",
      "telephone": "+221...",
      "statut": "Actif|Suspendu|Résilié",
      "type": "famille|groupe"
    }
  ]
}
```

## Endpoints attendus

Le backend doit fournir les endpoints suivants:

### Authentification
- `POST /auth/login` - Connexion
- `POST /auth/register` - Inscription
- `POST /auth/logout` - Déconnexion
- `GET /auth/me` - Récupérer l'utilisateur actuel

### Utilisateurs
- `GET /users` - Récupérer les utilisateurs
- `PUT /users/:id` - Mettre à jour un utilisateur
- `DELETE /users/:id` - Supprimer un utilisateur

### Assurés
- `GET /assures` - Récupérer les assurés
- `POST /assures` - Créer un assuré
- `PUT /assures/:id` - Mettre à jour un assuré
- `DELETE /assures/:id` - Supprimer un assuré

### Polices
- `GET /polices` - Récupérer les polices
- `POST /polices` - Créer une police

### Sinistres
- `GET /sinistres` - Récupérer les sinistres
- `POST /sinistres` - Créer un sinistre

### Prestataires
- `GET /prestataires` - Récupérer les prestataires
- `POST /prestataires` - Créer un prestataire

### Consultations
- `GET /consultations` - Récupérer les consultations
- `POST /consultations` - Créer une consultation

### Prescriptions
- `GET /prescriptions` - Récupérer les prescriptions
- `POST /prescriptions` - Créer une prescription

### Emails
- `POST /email/send` - Envoyer un email
- `POST /email/temp-mapping` - Stocker une adresse email temporaire
- `GET /email/real-email` - Récupérer l'adresse email réelle
- `PUT /email/confirm` - Confirmer une adresse email

## Authentification

Les requêtes doivent inclure le token JWT dans le header:

```javascript
Authorization: Bearer <token>
```

Le token est automatiquement ajouté par le `apiClient` depuis `localStorage`.

## Migration depuis Supabase

Les fichiers Supabase ont été supprimés:
- ✅ `src/integrations/supabase/` - Supprimé
- ✅ `supabase/` - Supprimé
- ✅ `@supabase/supabase-js` - Désinstallé de package.json

Tous les appels à Supabase ont été remplacés par des appels API via `apiClient`.
