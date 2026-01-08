FROM node:18-alpine3.20

WORKDIR /app

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --legacy-peer-deps

ENV NEXT_TELEMETRY_DISABLED=1
ENV APP_ENV=local

CMD ["npm", "run", "dev"]