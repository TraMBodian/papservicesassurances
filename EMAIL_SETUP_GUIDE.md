# Configuration des notifications par email

## Vue d'ensemble

Le système envoie automatiquement des emails :
- ✉️ **À l'administrateur** : Notification de chaque nouvelle inscription
- ✉️ **À l'utilisateur** : Confirmation d'inscription

## Configuration requise

### 1. Service d'email (Resend)

#### Créer un compte Resend

1. Allez sur https://resend.com
2. Créez un compte gratuit
3. Vérifiez votre domaine (ou utilisez l'email de test)

#### Obtenez votre clé API

1. Dashboard Resend → Desenvolvimento → API Keys
2. Créez une nouvelle clé API
3. Copiez la clé

### 2. Configurer Supabase Functions

#### Pré-requis

```bash
npm install -g supabase
```

#### Créer une fonction pour les emails

```bash
cd supabase/functions
supabase functions new send-notification-email
```

#### Configurer les secrets

```bash
# Définir les variables d'environnement
supabase secrets set RESEND_API_KEY=votre_clé_api_resend
supabase secrets set ADMIN_EMAIL=admin@votre-domaine.com
```

#### Déployer la fonction

```bash
supabase functions deploy send-notification-email
```

### 3. Variables d'environnement (.env.local)

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_ADMIN_EMAIL=admin@assurance-sante-connect.com
```

## Structure des tables

### user_profiles
Contient les informations de profil utilisateur avec le rôle

### temp_emails
Gère les emails temporaires :
- `user_id` : UUID de l'utilisateur
- `real_email` : Email réel (peut être null)
- `temp_email` : Email temporaire généré
- `confirmed` : Boolean si vérifié
- `expires_at` : Date d'expiration (30 jours)

## Flux d'email

### Lors de l'inscription

1. **Créer le compte** → Supabase Auth
2. **Créer le profil** → Table user_profiles
3. **Envoyer les emails** :
   - Email d'admin notifiant une nouvelle inscription
   - Email de confirmation à l'utilisateur
4. **Rediriger** → Dashboard

### Structure email admin

```
Subject: 🔔 Nouvelle inscription - Jean Dupont
From: (configurable via `FROM_EMAIL` env var)

- Nom: Jean Dupont
- Email: jean@example.com
- Rôle: Administrateur
- Organisation: Ma Clinique
- Action: Approuver/Rejeter dans le dashboard
```

### Structure email utilisateur

```
Subject: Bienvenue sur Assurance Santé Connect
From: (configurable via `FROM_EMAIL` env var)

- Merci de vous être inscrit
- Votre rôle: Administrateur
- Statut: En attente d'approbation
- Vérifiez votre boîte mail
```

## Email temporaire

### Fonctionnalités

- ✅ Générer un email temporaire unique
- ✅ Copier l'email dans le presse-papiers
- ✅ Remplacer par un vrai email plus tard
- ✅ Expire après 30 jours

### Format

```
temp_[timestamp]_[random]@assurance-sante-connect.com
Exemple: temp_1709472000000_a7b9c2@assurance-sante-connect.com
```

### Utilisation

1. Lors de l'inscription, cliquer sur "Email temporaire?"
2. Générer ou modifier l'email temporaire
3. Copier et utiliser pour l'inscription
4. Vérifier son email réel dans le profil après

## Dépannage

### Les emails ne sont pas envoyés

1. **Vérifier les secrets Supabase**
   ```bash
   supabase secrets list
   ```

2. **Vérifier les logs**
   ```bash
   supabase functions logs send-notification-email
   ```

3. **Tester la fonction**
   ```bash
   curl -i --location --request POST 'http://localhost:54321/functions/v1/send-notification-email' \
     --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' \
     --header 'Content-Type: application/json' \
     --data '{"type":"new_registration","data":{"email":"test@example.com","fullName":"Test User","role":"admin"}}'
   ```

4. **Vérifier la clé Resend**
   - La clé ne doit pas être expirée
   - La domaine doit être vérifiée

### Email temporaire n'apparaît pas

1. Vérifier que la table `temp_emails` existe
2. Vérifier les RLS policies
3. Vérifier la console browser pour les erreurs

### L'utilisateur ne reçoit pas l'email de confirmation

1. Vérifier le dossier spam/indésirable
2. Vérifier l'email entré est correct
3. Vérifier dans les logs Resend

## Fichiers clés

- `supabase/functions/send-notification-email/index.ts` - Fonction d'envoi d'email
- `src/services/emailService.ts` - Service pour gérer les emails
- `src/context/AuthContext.tsx` - Déclenche l'envoi lors de l'inscription
- `src/pages/SignupPage.tsx` - Formulaire avec option email temporaire
- `supabase/migrations/002_create_temp_emails.sql` - Schéma base de données

## Prochaines étapes

1. ✅ Configurer Resend API
2. ✅ Configurer Supabase Functions
3. ✅ Déployer la fonction
4. ✅ Tester l'inscription
5. 🚀 Ajouter 2FA optionnel
6. 🚀 Ajouter les templates d'email personnalisés
7. 🚀 Ajouter les webhooks de relecture d'email
