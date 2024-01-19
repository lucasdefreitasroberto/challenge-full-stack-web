FROM node:20-slim as base

RUN apt-get update
RUN apt-get install -y openssl

WORKDIR /home/node/app

FROM base as builder
COPY package.json yarn.lock ./
RUN  yarn install --frozen-lockfile --ignore-scripts
COPY . .
RUN yarn build

FROM base as dependencies
COPY package.json yarn.lock ./
COPY prisma ./prisma
RUN yarn install --production

FROM base as release
COPY --chown=node:node --from=dependencies /home/node/app/node_modules ./node_modules
COPY --chown=node:node --from=builder /home/node/app/dist ./dist

# It's a good idea to use dumb-init to help prevent zombie chrome processes.
ADD https://github.com/Yelp/dumb-init/releases/download/v1.2.0/dumb-init_1.2.0_amd64 /usr/local/bin/dumb-init
RUN chmod +x /usr/local/bin/dumb-init

RUN mkdir /home/node/app/tmp
RUN chown -R node:node /home/node

USER node

EXPOSE 3000
ENTRYPOINT ["dumb-init", "--"]
CMD [ "node", "./dist/index.js" ]

