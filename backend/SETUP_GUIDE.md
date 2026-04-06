# Guide de configuration - Backend Spring Boot

## Étapes de configuration

### 1. **Installer Java 17**

Vérifiez que vous avez Java 17 ou supérieur:
```bash
java -version
```

Si ce n'est pas le cas, téléchargez et installez Java 17 depuis [oracle.com](https://www.oracle.com/java/technologies/downloads/#java17)

### 2. **Installer MySQL**

Téléchargez et installez MySQL Community Server depuis [mysql.com](https://dev.mysql.com/downloads/mysql/)

Créez la base de données:
```bash
mysql -u root -p
```

```sql
CREATE DATABASE assurance_sante_connect CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 3. **Configuration de la base de données**

Modifiez le fichier `backend/src/main/resources/application.yml`:

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/assurance_sante_connect
    username: root
    password: votre_mot_de_passe  # Remplacez par votre mot de passe MySQL
```

### 4. **Configuration du service email (optionnel)**

Pour activer l'envoi d'emails, configurez un compte Gmail avec mot de passe d'application:

1. Activez l'authentification 2FA sur votre compte Google
2. Créez un mot de passe d'application: https://myaccount.google.com/apppasswords
3. Modifiez `application.yml`:

```yaml
spring:
  mail:
    username: votre-email@gmail.com
    password: votre-mot-de-passe-app
```

### 5. **Installer les dépendances Maven**

```bash
cd backend
mvn clean install
```

### 6. **Démarrer l'application**

```bash
mvn spring-boot:run
```

L'application démarre sur: `http://localhost:3001/api`

### 7. **Vérifier la connexion**

Testez un endpoint publique:
```bash
curl http://localhost:3001/api/auth/login
```

## Configuration du Frontend

Mettez à jour le fichier `.env` du projet racine:

```
VITE_API_BASE_URL=http://localhost:3001/api
VITE_API_TIMEOUT=10000
```

## Commandes utiles

```bash
# Compiler le projet
mvn clean compile

# Exécuter les tests
mvn test

# Créer un JAR exécutable
mvn clean package

# Démarrer en mode développement
mvn spring-boot:run

# Nettoyer
mvn clean
```

## Format JWT

Le token JWT généré lors de la connexion doit être envoyé dans toutes les requêtes authentifiées:

```
Authorization: Bearer eyJhbGciOiJIUzUxMiJ9...
```

## Statuts de la réponse

- `200` - Succès
- `400` - Erreur validation
- `401` - Non authentifié
- `403` - Non autorisé
- `404` - Ressource non trouvée
- `500` - Erreur serveur

## Prochaines étapes

1. ✅ Backend Spring Boot créé avec tous les endpoints
2. ⏭️ Configurer la base de données MySQL
3. ⏭️ Démarrer l'application backend
4. ⏭️ Tester les endpoints avec Postman ou curl
5. ⏭️ Intégrer le frontend React existant
6. ⏭️ Déployer sur un serveur (Azure, AWS, etc.)

## Troubleshooting

### Port 3001 déjà utilisé
Changez le port dans `application.yml`:
```yaml
server:
  port: 3002
```

### Erreur de connexion MySQL
Vérifiez que MySQL est en cours d'exécution:
```bash
# Windows
mysql -u root -p

# Linux/Mac
sudo systemctl status mysql
```

### ClassNotFoundException
Exécutez `mvn clean install` pour télécharger les dépendances manquantes

Pour plus d'aide, consultez le [README.md](./README.md) du backend.
