# Guide d'authentification - Assurance Santé Connect

## Vue d'ensemble

Un système d'authentification complet avec trois rôles d'utilisateurs :
- **Administrateur** : Gestion complète de la plateforme
- **Prestataire** : Prestataire de services (médecin, clinique, etc.)
- **Client** : Assuré client

## Configuration Supabase

### 1. Variables d'environnement

Créez un fichier `.env.local` à la racine du projet :

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

### 2. Créer la table user_profiles

Exécutez la migration SQL dans l'éditeur SQL de Supabase :

```sql
-- File: supabase/migrations/001_create_user_profiles.sql
```

Ou manuellement dans le Supabase Dashboard :

1. Allez à l'éditeur SQL
2. Cliquez sur "New Query"
3. Copiez le contenu de `supabase/migrations/001_create_user_profiles.sql`
4. Exécutez la requête

### 3. Configurer l'authentification par email

1. Dans Supabase Dashboard → Authentication → Providers
2. Activez "Email" avec les options :
   - Autoconfirm email : OFF (pour la vérification)
   - Confirm email within (hours) : 24

## Utilisation

### Pages d'authentification

- **Connexion** : `/login`
  - Email et mot de passe
  - Boutons d'accès rapide pour l'inscription

- **Inscription** : `/signup?role={role}`
  - Paramètre optionnel `role` pour présélectionner le rôle
  - Sélection du rôle (admin, prestataire, client)
  - Champs personnalisés selon le rôle
  - Organisation requise pour les prestataires et admins

### Contexte d'authentification

Utilisez le hook `useAuth()` n'importe où dans l'app :

```tsx
import { useAuth } from "@/context/AuthContext";

function MyComponent() {
  const { user, isAuthenticated, signIn, signOut } = useAuth();
  
  return (
    <>
      {isAuthenticated && <p>Bienvenue {user?.full_name}</p>}
      <button onClick={() => signOut()}>Déconnexion</button>
    </>
  );
}
```

### Types d'utilisateur disponibles

```typescript
export type UserRole = 'admin' | 'prestataire' | 'client';

export interface AuthUser extends User {
  role?: UserRole;
  full_name?: string;
  organization?: string;
}
```

## Flux d'authentification

1. **Inscription**
   - Utilisateur sélectionne son rôle
   - Crée un compte Supabase Auth
   - Profil utilisateur créé dans `user_profiles`
   - Redirection selon le rôle

2. **Connexion**
   - Authentification Supabase
   - Chargement du profil utilisateur
   - Redirection vers le dashboard

3. **Gestion de session**
   - Persistance de la session dans localStorage
   - Refresh token automatique
   - Synchronisation entre onglets

## Routes protégées

Utilisez le composant `ProtectedRoute` pour protéger les pages :

```tsx
import { ProtectedRoute } from "@/components/ProtectedRoute";

<Route path="/admin-page" element={<ProtectedRoute element={<AdminPage />} requiredRoles={['admin']} />} />
```

## Politiques de sécurité (RLS)

Les politiques Row Level Security sont configurées dans la migration :

- Chaque utilisateur peut lire son propre profil
- Chaque utilisateur peut modifier son propre profil
- Les administrateurs peuvent lire tous les profils

## Détails des rôles

### Administrateur
- Accès complet à toutes les fonctionnalités
- Gestion des utilisateurs
- Rapports avancés
- Configuration du système

### Prestataire
- Gestion des consultations
- Création de prescriptions
- Suivi des remboursements
- Gestion de son profil et organisation

### Client
- Consultation des assurances
- Déclaration de sinistres
- Suivi des remboursements
- Gestion du profil famille

## Dépannage

### "Le terme 'bun' n'est pas reconnu"
Utilisez `npm` à la place de `bun` :
```bash
npm run dev
npm run build
npm install
```

### Erreur de connexion Supabase
1. Vérifiez les variables d'environnement dans `.env.local`
2. Vérifiez la migration SQL a été exécutée
3. Vérifiez les policies RLS dans Supabase

### Utilisateur non redirigé après inscription
1. Vérifiez la création du profil dans `user_profiles`
2. Vérifiez le rôle est bien défini dans le profil
3. Vérifiez la console du navigateur pour les erreurs

## Fichiers clés

- `src/context/AuthContext.tsx` - Contexte d'authentification
- `src/pages/LoginPage.tsx` - Page de connexion
- `src/pages/SignupPage.tsx` - Page d'inscription
- `src/components/ProtectedRoute.tsx` - Composant de protection des routes
- `supabase/migrations/001_create_user_profiles.sql` - Schéma base de données

## Prochaines étapes

1. Configurer les emails de confirmation
2. Ajouter l'authentification à deux facteurs (2FA)
3. Implémenter les vérifications de rôle dans Dashboard
4. Ajouter les redirections basées sur le rôle
5. Configurer les permissions par rôle pour chaque page
