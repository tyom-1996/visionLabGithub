# Base image
FROM node:18-alpine3.20 AS base

ENV NEXT_TELEMETRY_DISABLED=1
ENV APP_ENV=production
ENV NODE_ENV=production

# Build stage
FROM base AS deps
WORKDIR /app

COPY package*.json ./
RUN npm ci --legacy-peer-deps --omit=dev --ignore-scripts

FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production stage
FROM base AS production
WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]
