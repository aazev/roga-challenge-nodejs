#!/bin/bash

# Load environment variables from .env file
export $(grep -v '^#' .env | xargs)

# Check if the database exists
echo "Checking if the database exists..."
DBCHECK=$(docker compose exec -T db mysql -u $DATABASE_USER -p$DATABASE_PASSWORD -e "SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '$DATABASE_NAME'" | grep "$DATABASE_NAME")

if [ "$DBCHECK" != "$DATABASE_NAME" ]; then
  echo "Database does not exist, creating it..."
  docker compose exec -T db mysql -u $DATABASE_USER -p$DATABASE_PASSWORD -e "CREATE DATABASE $DATABASE_NAME;"
else
  echo "Database exists, resetting it..."
  docker compose exec -T db mysql -u $DATABASE_USER -p$DATABASE_PASSWORD -e "DROP DATABASE $DATABASE_NAME; CREATE DATABASE $DATABASE_NAME;"
fi

# Run migrations
echo "Running migrations..."
pnpx typeorm migration:run

echo "Done!"
