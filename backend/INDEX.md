# 📚 Index - Backend Assurance Santé Connect

## 🎯 Démarrage rapide

1. **Nouveau au projet?** → Commencez par [QUICK_START.md](./QUICK_START.md) (5 minutes)
2. **Besoin de configuration?** → Consultez [SETUP_GUIDE.md](./SETUP_GUIDE.md)
3. **Comprendre l'architecture?** → Lisez [ARCHITECTURE.md](./ARCHITECTURE.md)
4. **Documentation complète?** → Voir [README.md](./README.md)

---

## 📂 Structure du projet

### Application principale
- **[AssuranceSanteConnectApplication.java](src/main/java/com/assurance/sante/connect/AssuranceSanteConnectApplication.java)** - Point d'entrée de l'application

### Configuration Spring
- **[SecurityConfig.java](src/main/java/com/assurance/sante/connect/config/SecurityConfig.java)** - Configuration de sécurité JWT
- **[WebConfig.java](src/main/java/com/assurance/sante/connect/config/WebConfig.java)** - Configuration CORS et Web

### Authentification JWT
- **[JwtTokenProvider.java](src/main/java/com/assurance/sante/connect/security/JwtTokenProvider.java)** - Génération et validation JWT
- **[JwtAuthenticationFilter.java](src/main/java/com/assurance/sante/connect/security/JwtAuthenticationFilter.java)** - Filtre d'authentification
- **[JwtAuthenticationToken.java](src/main/java/com/assurance/sante/connect/security/JwtAuthenticationToken.java)** - Token d'authentification custom

### Contrôleurs REST (9 contrôleurs)
| Contrôleur | Endpoints | Fonctionnalité |
|-----------|-----------|----------------|
| [AuthController](src/main/java/com/assurance/sante/connect/controller/AuthController.java) | `/auth/*` | Login, Register, Logout, Profil |
| [UserController](src/main/java/com/assurance/sante/connect/controller/UserController.java) | `/users/*` | Gestion des utilisateurs |
| [AssureController](src/main/java/com/assurance/sante/connect/controller/AssureController.java) | `/assures/*` | Gestion des assurés |
| [PoliceController](src/main/java/com/assurance/sante/connect/controller/PoliceController.java) | `/polices/*` | Gestion des polices |
| [SinistreController](src/main/java/com/assurance/sante/connect/controller/SinistreController.java) | `/sinistres/*` | Gestion des sinistres |
| [PrestataireController](src/main/java/com/assurance/sante/connect/controller/PrestataireController.java) | `/prestataires/*` | Gestion des prestataires |
| [ConsultationController](src/main/java/com/assurance/sante/connect/controller/ConsultationController.java) | `/consultations/*` | Gestion des consultations |
| [PrescriptionController](src/main/java/com/assurance/sante/connect/controller/PrescriptionController.java) | `/prescriptions/*` | Gestion des prescriptions |
| [EmailController](src/main/java/com/assurance/sante/connect/controller/EmailController.java) | `/email/*` | Envoi d'emails |

### Services (9 services)
- **[AuthService](src/main/java/com/assurance/sante/connect/service/AuthService.java)** - Logique d'authentification
- **[UserService](src/main/java/com/assurance/sante/connect/service/UserService.java)** - CRUD Utilisateurs
- **[AssureService](src/main/java/com/assurance/sante/connect/service/AssureService.java)** - CRUD Assurés
- **[PoliceService](src/main/java/com/assurance/sante/connect/service/PoliceService.java)** - CRUD Polices
- **[SinistreService](src/main/java/com/assurance/sante/connect/service/SinistreService.java)** - CRUD Sinistres
- **[PrestataireService](src/main/java/com/assurance/sante/connect/service/PrestataireService.java)** - CRUD Prestataires
- **[ConsultationService](src/main/java/com/assurance/sante/connect/service/ConsultationService.java)** - CRUD Consultations
- **[PrescriptionService](src/main/java/com/assurance/sante/connect/service/PrescriptionService.java)** - CRUD Prescriptions
- **[EmailService](src/main/java/com/assurance/sante/connect/service/EmailService.java)** - Envoi d'emails

### Repositories (7 repositories JPA)
- **[UserRepository](src/main/java/com/assurance/sante/connect/repository/UserRepository.java)**
- **[AssureRepository](src/main/java/com/assurance/sante/connect/repository/AssureRepository.java)**
- **[PoliceRepository](src/main/java/com/assurance/sante/connect/repository/PoliceRepository.java)**
- **[SinistreRepository](src/main/java/com/assurance/sante/connect/repository/SinistreRepository.java)**
- **[PrestataireRepository](src/main/java/com/assurance/sante/connect/repository/PrestataireRepository.java)**
- **[ConsultationRepository](src/main/java/com/assurance/sante/connect/repository/ConsultationRepository.java)**
- **[PrescriptionRepository](src/main/java/com/assurance/sante/connect/repository/PrescriptionRepository.java)**

### Entités JPA (7 entités)
| Entité | Champs clés | Relation |
|--------|-----------|----------|
| [User](src/main/java/com/assurance/sante/connect/entity/User.java) | email, password, role, status | - |
| [Assure](src/main/java/com/assurance/sante/connect/entity/Assure.java) | numero, nom, prenom, statut | - |
| [Police](src/main/java/com/assurance/sante/connect/entity/Police.java) | numero, type, montant | Assure |
| [Sinistre](src/main/java/com/assurance/sante/connect/entity/Sinistre.java) | numero, description, montant | Assure, Police |
| [Prestataire](src/main/java/com/assurance/sante/connect/entity/Prestataire.java) | numero, nom, type | - |
| [Consultation](src/main/java/com/assurance/sante/connect/entity/Consultation.java) | motif, diagnostic | Assure, Prestataire |
| [Prescription](src/main/java/com/assurance/sante/connect/entity/Prescription.java) | medicament, dosage | Consultation |

### DTOs - Data Transfer Objects
- **[UserDto](src/main/java/com/assurance/sante/connect/dto/UserDto.java)** - DTO utilisateur
- **[AssureDto](src/main/java/com/assurance/sante/connect/dto/AssureDto.java)** - DTO assuré
- **[LoginRequest](src/main/java/com/assurance/sante/connect/dto/LoginRequest.java)** - Requête login
- **[RegisterRequest](src/main/java/com/assurance/sante/connect/dto/RegisterRequest.java)** - Requête inscription
- **[AuthResponse](src/main/java/com/assurance/sante/connect/dto/AuthResponse.java)** - Réponse authentification
- **[ApiResponse](src/main/java/com/assurance/sante/connect/dto/ApiResponse.java)** - Wrapper de réponse API

### Gestion des erreurs
- **[ResourceNotFoundException](src/main/java/com/assurance/sante/connect/exception/ResourceNotFoundException.java)** - Ressource non trouvée
- **[UnauthorizedException](src/main/java/com/assurance/sante/connect/exception/UnauthorizedException.java)** - Non authentifié

### Configuration et ressources
- **[application.yml](src/main/resources/application.yml)** - Configuration production
- **[application-dev.yml](src/main/resources/application-dev.yml)** - Configuration développement

### Tests
- **[AuthControllerTest](src/test/java/com/assurance/sante/connect/controller/AuthControllerTest.java)** - Tests du contrôleur d'authentification

### Build
- **[pom.xml](./pom.xml)** - Configuration Maven et dépendances

---

## 📊 Statistics

- **9 Contrôleurs REST**
- **9 Services métier**
- **7 Repositories JPA**
- **7 Entités JPA**
- **6 DTOs**
- **2 Classes d'exception**
- **3 Classes de configuration**
- **3 Classes de sécurité JWT**
- **60+ Endpoints API**

---

## 🔧 Technologies

- Java 17
- Spring Boot 3.2.0
- Spring Security
- Spring Data JPA
- MySQL 8.0
- JWT (jjwt 0.12.3)
- Lombok
- Maven

---

## 📝 Documentation par type

### Pour commencer
1. [QUICK_START.md](./QUICK_START.md) - Démarrage en 5 minutes
2. [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Configuration détaillée

### Pour développer
1. [README.md](./README.md) - Documentation complète
2. [ARCHITECTURE.md](./ARCHITECTURE.md) - Architecture et endpoints
3. Code source avec javadoc

### Pour déployer
1. [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Section "Commandes utiles"
2. [README.md](./README.md) - Section installation

---

## ✅ Checklist de configuration

- [ ] Java 17+ installé
- [ ] MySQL 8.0+ installé et en cours d'exécution
- [ ] Maven 3.8+ installé
- [ ] Base de données créée: `assurance_sante_connect`
- [ ] `application.yml` configuré
- [ ] Dépendances Maven installées: `mvn clean install`
- [ ] Application démarrée: `mvn spring-boot:run`
- [ ] API accessible sur `http://localhost:3001/api`
- [ ] Frontend configuré `VITE_API_BASE_URL=http://localhost:3001/api`

---

## 🚀 Prochaines étapes

1. **Configuration initiale** - Suivez [SETUP_GUIDE.md](./SETUP_GUIDE.md)
2. **Démarrer l'application** - Utilisez `mvn spring-boot:run`
3. **Tester les endpoints** - Consultez [ARCHITECTURE.md](./ARCHITECTURE.md)
4. **Intégrer le frontend** - Connectez votre application React existante
5. **Déployer** - Publiez sur Azure, AWS, ou votre serveur

---

## 📚 Ressources externes

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Security](https://spring.io/projects/spring-security)
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa)
- [JWT (jjwt)](https://github.com/jwtk/jjwt)
- [MySQL Documentation](https://dev.mysql.com/doc/)

---

**Créé le:** 5 Mars 2026  
**Version:** 1.0.0  
**Statut:** ✅ Prêt pour développement
