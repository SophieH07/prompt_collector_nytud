FROM node:18-alpine

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN npm i

COPY app /app/
COPY public ./public
COPY next.config.js .
COPY tsconfig.json .


CMD npm run build && npm run start