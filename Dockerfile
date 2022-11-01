# 1. Install dependencies only when needed
FROM node:16-alpine AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY .yarn/ ./.yarn/
COPY .yarnrc.yml package.json yarn.lock ./ 

COPY package.json ./package.json

RUN yarn install 

COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn build

EXPOSE 3000

ENV PORT 3000

CMD ["yarn", "start"]

# https://stackoverflow.com/questions/43643338/docker-compose-not-updating-content
# https://github.com/docker/compose/issues/4337
# https://stackoverflow.com/questions/35231362/dockerfile-and-docker-compose-not-updating-with-new-instructions