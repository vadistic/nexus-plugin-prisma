#!/bin/bash

rm -rf fixture/migrations

sudo docker rm --force nexus-prisma
sudo docker run --name nexus-prisma -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -d postgres

echo "DATABASE_URL $DATABASE_URL"

yarn prisma generate --schema="./fixture/schema.prisma"

yarn prisma migrate save --experimental --schema="./fixture/schema.prisma" --name init --create-db

yarn prisma migrate up --experimental --schema="./fixture/schema.prisma"

