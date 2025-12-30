# Stage 1: Build
FROM node:24-alpine AS builder
WORKDIR /app

# Copy dependency files first for better caching
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy source and build
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:24-alpine AS runner
WORKDIR /app

# Security: Run as non-root user
USER node

# Copy build artifacts and pruned node_modules
COPY --from=builder --chown=node:node /app/build ./build
COPY --from=builder --chown=node:node /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/package.json ./package.json

EXPOSE 3000
ENV NODE_ENV=production
ENV PORT=3000

CMD [ "node", "build" ]
