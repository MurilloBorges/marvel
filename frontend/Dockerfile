FROM node:12

ENV YARN_VERSION 1.22.5

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package.json ./

RUN yarn install

COPY . .

COPY --chown=node:node . .

USER node

EXPOSE 3000

CMD ["yarn", "start"]
