#!/bin/sh
# Convertit DATABASE_URL (format Railway) en propriétés Spring Boot
if [ -n "$DATABASE_URL" ]; then
  # DATABASE_URL format: postgresql://user:pass@host:port/dbname
  DB_USER=$(echo "$DATABASE_URL" | sed 's|postgresql://\([^:]*\):.*|\1|')
  DB_PASS=$(echo "$DATABASE_URL" | sed 's|postgresql://[^:]*:\([^@]*\)@.*|\1|')
  DB_HOST=$(echo "$DATABASE_URL" | sed 's|.*@\([^:]*\):.*|\1|')
  DB_PORT=$(echo "$DATABASE_URL" | sed 's|.*:\([0-9]*\)/.*|\1|')
  DB_NAME=$(echo "$DATABASE_URL" | sed 's|.*/\([^?]*\).*|\1|')
  JDBC_URL="jdbc:postgresql://${DB_HOST}:${DB_PORT}/${DB_NAME}"
else
  JDBC_URL="jdbc:postgresql://${PGHOST:-localhost}:${PGPORT:-5432}/${PGDATABASE:-assurance_db}"
  DB_USER="${PGUSER:-admin}"
  DB_PASS="${PGPASSWORD:-admin123}"
fi

exec java \
  -Dfile.encoding=UTF-8 \
  -Dspring.profiles.active=${SPRING_PROFILE:-postgres} \
  -Dspring.datasource.url="$JDBC_URL" \
  -Dspring.datasource.username="$DB_USER" \
  -Dspring.datasource.password="$DB_PASS" \
  -Dspring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect \
  -jar app.jar \
  --server.port=${PORT:-8080}
