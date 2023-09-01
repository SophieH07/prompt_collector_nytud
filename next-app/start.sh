#!/bin/sh

while ! nc -z postgres 5432; do
  sleep 1
done

npx prisma db pull
npx prisma generate
npx prisma db push

node server.js