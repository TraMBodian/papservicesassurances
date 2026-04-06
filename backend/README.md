# Assurance Santé Connect - Backend Spring Boot

Backend Spring Boot pour l'application Assurance Santé Connect - Gestion d'assurance santé.

## Prérequis

- **Java 17** ou supérieur
- **Maven 3.8+**
- **MySQL 8.0+**
- **NodeJS** (pour le frontend)

## Installation et Configuration

### 1. Configuration de la base de données

Créez une base de données MySQL:

```sql
CREATE DATABASE assurance_sante_connect;
```

### 2. Configuration des variables d'environnement

Modifiez `src/main/resources/application.yml`:

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/assurance_sante_connect
    username: root
    password: votre_mot_de_passe
  mail:
    username: votre_email@gmail.com
    password: votre_mot_de_passe_app
```

### 3. Installation des dépendances

```bash
mvn clean install
```

## Démarrage de l'application

```bash
# Mode développement
mvn spring-boot:run

# Mode production (après build)
mvn clean package
java -jar target/assurance-sante-connect-1.0.0.jar
```

L'application démarre sur `http://localhost:3001/api`

## Architecture

```
src/main/java/com/assurance/sante/connect/
├── config/          # Configuration Spring (Security, Web, etc.)
├── controller/      # REST API Controllers
├── service/         # Logique métier
├── repository/      # Accès aux données (JPA)
├── entity/          # Modèles JPA
├── dto/             # Data Transfer Objects
├── security/        # Authentification JWT
└── exception/       # Gestion d'erreurs
```

## Endpoints API

### Authentification
- `POST /auth/login` - Connexion
- `POST /auth/register` - Inscription
- `POST /auth/logout` - Déconnexion
- `GET /auth/me` - Utilisateur courant

### Utilisateurs
- `GET /users` - Lister
- `GET /users/{id}` - Récupérer
- `PUT /users/{id}` - Mettre à jour
- `DELETE /users/{id}` - Supprimer

### Assurés
- `GET /assures` - Lister
- `POST /assures` - Créer
- `PUT /assures/{id}` - Mettre à jour
- `DELETE /assures/{id}` - Supprimer

### Polices
- `GET /polices` - Lister
- `POST /polices` - Créer
- `PUT /polices/{id}` - Mettre à jour
- `DELETE /polices/{id}` - Supprimer

### Sinistres
- `GET /sinistres` - Lister
- `POST /sinistres` - Créer
- `PUT /sinistres/{id}` - Mettre à jour
- `DELETE /sinistres/{id}` - Supprimer

### Prestataires
- `GET /prestataires` - Lister
- `POST /prestataires` - Créer
- `PUT /prestataires/{id}` - Mettre à jour
- `DELETE /prestataires/{id}` - Supprimer

### Consultations
- `GET /consultations` - Lister
- `POST /consultations` - Créer
- `PUT /consultations/{id}` - Mettre à jour
- `DELETE /consultations/{id}` - Supprimer

### Prescriptions
- `GET /prescriptions` - Lister
- `POST /prescriptions` - Créer
- `PUT /prescriptions/{id}` - Mettre à jour
- `DELETE /prescriptions/{id}` - Supprimer

### Emails
- `POST /email/send` - Envoyer un email
- `POST /email/temp-mapping` - Stocker une adresse email temporaire
- `GET /email/real-email` - Récupérer l'adresse email réelle
- `PUT /email/confirm` - Confirmer une adresse email

## Authentification

Les requêtes authentifiées doivent inclure le JWT token:

```
Authorization: Bearer <jwt-token>
```

## Format des réponses

### Succès
```json
{
  "success": true,
  "data": { ... }
}
```

### Erreur
```json
{
  "success": false,
  "message": "Description de l'erreur"
}
```

## Intégration Frontend

Le frontend React doit configurer l'URL de base:

```javascript
// .env
VITE_API_BASE_URL=http://localhost:3001/api
```

## Technologies utilisées

- **Spring Boot 3.2.0** - Framework Java
- **Spring Security** - Authentification/Autorisation
- **Spring Data JPA** - ORM
- **JWT (jjwt 0.12.3)** - Token-based authentication
- **MySQL** - Base de données
- **Lombok** - Réduction de boilerplate
- **Maven** - Build tool

## Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/amazing-feature`)
3. Commit vos changements (`git commit -m 'Add amazing feature'`)
4. Push vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

## License

MIT
