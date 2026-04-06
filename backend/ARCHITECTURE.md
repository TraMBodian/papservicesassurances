# Backend - Assurance Santé Connect

## 📋 Sommaire

- [Vue d'ensemble](#vue-densemble)
- [Architecture](#architecture)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
- [Authentification JWT](#authentification-jwt)

## Vue d'ensemble

Backend Spring Boot pour l'application Assurance Santé Connect. Fournit une API REST complète pour gérer:

- 👥 Utilisateurs et authentification
- 🏥 Assurés et polices d'assurance
- 🚨 Sinistres et réclamations
- 🏢 Prestataires de santé
- 📋 Consultations et prescriptions
- 📧 Notifications par email

## Architecture

```
backend/
├── src/main/java/com/assurance/sante/connect/
│   ├── AssuranceSanteConnectApplication.java    # Point d'entrée
│   ├── config/                                   # Configuration Spring
│   │   ├── SecurityConfig.java                   # Sécurité JWT
│   │   └── WebConfig.java                        # Configuration CORS
│   ├── controller/                               # REST API
│   │   ├── AuthController.java
│   │   ├── UserController.java
│   │   ├── AssureController.java
│   │   ├── PoliceController.java
│   │   ├── SinistreController.java
│   │   ├── PrestataireController.java
│   │   ├── ConsultationController.java
│   │   ├── PrescriptionController.java
│   │   └── EmailController.java
│   ├── service/                                  # Logique métier
│   │   ├── AuthService.java
│   │   ├── UserService.java
│   │   ├── AssureService.java
│   │   ├── PoliceService.java
│   │   ├── SinistreService.java
│   │   ├── PrestataireService.java
│   │   ├── ConsultationService.java
│   │   ├── PrescriptionService.java
│   │   └── EmailService.java
│   ├── repository/                               # Accès aux données
│   │   ├── UserRepository.java
│   │   ├── AssureRepository.java
│   │   ├── PoliceRepository.java
│   │   ├── SinistreRepository.java
│   │   ├── PrestataireRepository.java
│   │   ├── ConsultationRepository.java
│   │   └── PrescriptionRepository.java
│   ├── entity/                                   # Modèles JPA
│   │   ├── User.java
│   │   ├── Assure.java
│   │   ├── Police.java
│   │   ├── Sinistre.java
│   │   ├── Prestataire.java
│   │   ├── Consultation.java
│   │   └── Prescription.java
│   ├── dto/                                      # Data Transfer Objects
│   │   ├── UserDto.java
│   │   ├── AssureDto.java
│   │   ├── LoginRequest.java
│   │   ├── RegisterRequest.java
│   │   ├── AuthResponse.java
│   │   └── ApiResponse.java
│   ├── security/                                 # Authentification JWT
│   │   ├── JwtTokenProvider.java
│   │   ├── JwtAuthenticationFilter.java
│   │   └── JwtAuthenticationToken.java
│   └── exception/                                # Gestion d'erreurs
│       ├── ResourceNotFoundException.java
│       └── UnauthorizedException.java
├── src/main/resources/
│   ├── application.yml                          # Configuration par défaut
│   └── application-dev.yml                      # Configuration développement
├── pom.xml                                       # Dépendances Maven
└── README.md                                     # Documentation
```

## Installation

### Prérequis

- Java 17+
- Maven 3.8+
- MySQL 8.0+

### Étapes

1. **Cloner le projet**

```bash
cd backend
```

2. **Créer la base de données MySQL**

```bash
mysql -u root -p
CREATE DATABASE assurance_sante_connect;
```

3. **Configurer la base de données**

Éditez `src/main/resources/application.yml`:

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/assurance_sante_connect
    username: root
    password: votre_mot_de_passe
```

4. **Installer les dépendances**

```bash
mvn clean install
```

5. **Démarrer l'application**

```bash
mvn spring-boot:run
```

Ou en mode développement:

```bash
mvn spring-boot:run -Dspring-boot.run.arguments="--spring.profiles.active=dev"
```

L'API est disponible sur: `http://localhost:3001/api`

## Configuration

### Variables d'environnement

Les configuration sont dans `src/main/resources/application.yml`:

```yaml
server:
  port: 3001                    # Port du serveur
  servlet:
    context-path: /api          # Chemin d'accès de l'API

spring:
  datasource:
    url: jdbc:mysql://localhost:3306/assurance_sante_connect
    username: root
    password: votre_mot_de_passe
  
  jpa:
    hibernate:
      ddl-auto: update          # Créer/update les tables automatiquement
    show-sql: false

  mail:
    host: smtp.gmail.com        # Serveur SMTP
    port: 587
    username: votre_email@gmail.com
    password: votre_mot_de_passe_app

app:
  jwtSecret: votre_secret_jwt           # Secret pour les tokens JWT
  jwtExpirationMs: 86400000              # Expiration du token (24h)
```

### CORS

Les origins autorisées sont configurées dans `SecurityConfig.java`:

```java
configuration.setAllowedOrigins(Arrays.asList(
    "http://localhost:5173",  // Frontend Vite
    "http://localhost:3000"   // Frontend React
));
```

## API Endpoints

### Authentication

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/auth/login` | Connexion utilisateur |
| POST | `/auth/register` | Inscription utilisateur |
| GET | `/auth/me` | Récupérer l'utilisateur actuel |
| POST | `/auth/logout` | Déconnexion |

### Users

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/users` | Lister tous les utilisateurs |
| GET | `/users/{id}` | Récupérer un utilisateur |
| PUT | `/users/{id}` | Mettre à jour un utilisateur |
| DELETE | `/users/{id}` | Supprimer un utilisateur |

### Assurés

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/assures` | Lister tous les assurés |
| POST | `/assures` | Créer un assuré |
| GET | `/assures/{id}` | Récupérer un assuré |
| PUT | `/assures/{id}` | Mettre à jour un assuré |
| DELETE | `/assures/{id}` | Supprimer un assuré |

### Polices

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/polices` | Lister toutes les polices |
| POST | `/polices` | Créer une police |
| GET | `/polices/{id}` | Récupérer une police |
| PUT | `/polices/{id}` | Mettre à jour une police |
| DELETE | `/polices/{id}` | Supprimer une police |

### Sinistres

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/sinistres` | Lister tous les sinistres |
| POST | `/sinistres` | Créer un sinistre |
| GET | `/sinistres/{id}` | Récupérer un sinistre |
| PUT | `/sinistres/{id}` | Mettre à jour un sinistre |
| DELETE | `/sinistres/{id}` | Supprimer un sinistre |

### Prestataires

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/prestataires` | Lister tous les prestataires |
| POST | `/prestataires` | Créer un prestataire |
| GET | `/prestataires/{id}` | Récupérer un prestataire |
| PUT | `/prestataires/{id}` | Mettre à jour un prestataire |
| DELETE | `/prestataires/{id}` | Supprimer un prestataire |

### Consultations

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/consultations` | Lister toutes les consultations |
| POST | `/consultations` | Créer une consultation |
| GET | `/consultations/{id}` | Récupérer une consultation |
| PUT | `/consultations/{id}` | Mettre à jour une consultation |
| DELETE | `/consultations/{id}` | Supprimer une consultation |

### Prescriptions

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/prescriptions` | Lister toutes les prescriptions |
| POST | `/prescriptions` | Créer une prescription |
| GET | `/prescriptions/{id}` | Récupérer une prescription |
| PUT | `/prescriptions/{id}` | Mettre à jour une prescription |
| DELETE | `/prescriptions/{id}` | Supprimer une prescription |

### Email

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/email/send` | Envoyer un email |
| POST | `/email/temp-mapping` | Stocker une adresse email temporaire |
| GET | `/email/real-email` | Récupérer l'adresse email réelle |
| PUT | `/email/confirm` | Confirmer une adresse email |

## Authentification JWT

### Format du token

Les tokens JWT sont utilisés pour l'authentification. Lors de la connexion, un token est retourné:

```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "fullName": "John Doe",
    "role": "ADMIN"
  },
  "token": "eyJhbGciOiJIUzUxMiJ9..."
}
```

### Utilisation du token

Incluez le token dans l'en-tête `Authorization` de chaque requête:

```
Authorization: Bearer eyJhbGciOiJIUzUxMiJ9...
```

### Durée de validité

Par défaut, un token expire après **24 heures**. Configurez-le dans `application.yml`:

```yaml
app:
  jwtExpirationMs: 86400000  # 24 heures en millisecondes
```

## Exemples de requêtes

### Connexion

```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password"}'
```

### Créer un assuré

```bash
curl -X POST http://localhost:3001/api/assures \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "numero":"ASS-2024-001",
    "nom":"Diop",
    "prenom":"Moussa",
    "telephone":"+221771234567",
    "email":"moussa@example.com",
    "statut":"ACTIF",
    "type":"FAMILLE"
  }'
```

### Récupérer l'utilisateur actuel

```bash
curl -X GET http://localhost:3001/api/auth/me \
  -H "Authorization: Bearer <token>"
```

## Technologies

- **Spring Boot 3.2.0** - Framework Java
- **Spring Security** - Authentification et autorisation
- **Spring Data JPA** - ORM et accès aux données
- **JWT (jjwt 0.12.3)** - Token-based authentication
- **MySQL** - Base de données relationnelle
- **Lombok** - Réduction du boilerplate
- **Maven** - Gestion des dépendances

## License

MIT
