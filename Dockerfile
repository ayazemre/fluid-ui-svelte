FROM node AS builder
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build
RUN npm prune --production

FROM node:24.0-slim
WORKDIR /app
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY package.json .
EXPOSE 3000
ENV NODE_ENV=production
CMD [ "node", "build" ]