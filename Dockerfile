# ── Build stage ───────────────────────────────────────────────────────────────
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app

COPY backend/pom.xml .
RUN mvn dependency:go-offline -q

COPY backend/src ./src
RUN mvn package -DskipTests -q

# ── Runtime stage ─────────────────────────────────────────────────────────────
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

COPY --from=build /app/target/*.jar app.jar
COPY start.sh start.sh
RUN chmod +x start.sh

EXPOSE 8080

ENTRYPOINT ["./start.sh"]
