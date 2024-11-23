FROM node:22-alpine

EXPOSE 3000

RUN corepack enable pnpm

USER node
WORKDIR /src/web

CMD pnpm dev