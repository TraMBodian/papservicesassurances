# 🚀 Démarrage rapide - Backend Spring Boot

## En 5 minutes

### 1. Prérequis
- Java 17+ installé
- MySQL 8.0+ installé et en cours d'exécution
- Maven 3.8+ installé

### 2. Créer la base de données

```bash
mysql -u root -p
```

```sql
CREATE DATABASE assurance_sante_connect CHARACTER SET utf8mb4;
EXIT;
```

### 3. Démarrer l'application

```bash
cd backend
mvn spring-boot:run
```

L'API démarre sur: **http://localhost:3001/api**

### 4. Tester une requête

```bash
# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password"}'
```

## Structure créée

```
backend/
├── pom.xml                              # Dépendances Maven
├── README.md                            # Documentation principale
├── ARCHITECTURE.md                      # Guide architecture
├── SETUP_GUIDE.md                       # Guide de configuration
├── .gitignore
└── src/
    ├── main/
    │   ├── java/com/assurance/sante/connect/
    │   │   ├── AssuranceSanteConnectApplication.java
    │   │   ├── config/          # Configuration Spring
    │   │   ├── controller/      # 9 contrôleurs REST
    │   │   ├── service/         # 9 services métier
    │   │   ├── repository/      # 7 repositories JPA
    │   │   ├── entity/          # 7 entités JPA
    │   │   ├── dto/             # DTOs pour API
    │   │   ├── security/        # JWT & Authentification
    │   │   └── exception/       # Gestion erreurs
    │   └── resources/
    │       ├── application.yml      # Config production
    │       └── application-dev.yml  # Config développement
    └── test/
        └── java/...                # Tests unitaires
```

## Points clés

✅ **8 modules complets**
- Authentification JWT
- Gestion Utilisateurs
- Gestion Assurés
- Gestion Polices
- Gestion Sinistres
- Gestion Prestataires
- Gestion Consultations
- Gestion Prescriptions
- Service Emails

✅ **Architecture professionnelle**
- Spring Boot 3.2.0
- Spring Security
- Spring Data JPA
- MySQL
- JWT (jjwt 0.12.3)
- Lombok

✅ **API REST complète**
- 60+ endpoints
- Authentification JWT
- CORS configuré
- Gestion erreurs
- Réponses standardisées

## Configuration

### Database (MySQL)
```yaml
spring.datasource.url: jdbc:mysql://localhost:3306/assurance_sante_connect
spring.datasource.username: root
spring.datasource.password: [votre_mot_de_passe]
```

### JWT Secret
```yaml
app.jwtSecret: mySecretKeyForJWTTokenGenerationAndValidation123456789
app.jwtExpirationMs: 86400000  # 24h
```

## Commandes du développement

```bash
# Compiler
mvn clean compile

# Tests
mvn test

# Démarrer
mvn spring-boot:run

# Build JAR
mvn clean package

# Exécuter JAR
java -jar target/assurance-sante-connect-1.0.0.jar
```

## Intégration Frontend

Configurez dans `.env` du frontend:

```
VITE_API_BASE_URL=http://localhost:3001/api
VITE_API_TIMEOUT=10000
```

## Troubleshooting

**Erreur: "Port 3001 already in use"**
```bash
# Changez le port dans application.yml
server.port: 3002
```

**Erreur: "MySQL connection refused"**
```bash
# Vérifiez que MySQL s'exécute
sudo systemctl start mysql  # Linux
brew services start mysql   # Mac
```

**Dépendances non trouvées**
```bash
mvn clean install
```

## Documentation complète

Consultez [README.md](./README.md) et [ARCHITECTURE.md](./ARCHITECTURE.md) pour la documentation complète.

## Support

Pour toute question, consultez:
- [README.md](./README.md) - Documentation complète
- [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Guide de configuration détaillé
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Architecture et endpoints
