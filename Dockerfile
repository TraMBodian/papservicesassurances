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

EXPOSE 8080

ENTRYPOINT ["sh", "-c", "\
  if [ -n \"$DATABASE_URL\" ]; then \
    U=$(echo $DATABASE_URL | sed 's|postgresql://\\([^:]*\\):.*|\\1|'); \
    P=$(echo $DATABASE_URL | sed 's|postgresql://[^:]*:\\([^@]*\\)@.*|\\1|'); \
    H=$(echo $DATABASE_URL | sed 's|.*@\\([^:]*\\):.*|\\1|'); \
    O=$(echo $DATABASE_URL | sed 's|.*:\\([0-9]*\\)/.*|\\1|'); \
    N=$(echo $DATABASE_URL | sed 's|.*/\\([^?]*\\).*|\\1|'); \
    JDBC=\"jdbc:postgresql://${H}:${O}/${N}\"; \
  else \
    JDBC=\"jdbc:postgresql://${PGHOST:-localhost}:${PGPORT:-5432}/${PGDATABASE:-assurance_db}\"; \
    U=\"${PGUSER:-admin}\"; P=\"${PGPASSWORD:-admin123}\"; \
  fi; \
  exec java -Dfile.encoding=UTF-8 \
    -Dspring.profiles.active=${SPRING_PROFILE:-postgres} \
    -Dspring.datasource.url=$JDBC \
    -Dspring.datasource.username=$U \
    -Dspring.datasource.password=$P \
    -Dspring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect \
    -jar app.jar --server.port=${PORT:-8080}"]
