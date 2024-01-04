#!/bin/sh

while ! nc -z postgres 5432; do
  sleep 1
done

npx prisma generate
npx prisma db push --accept-data-loss

node server.js