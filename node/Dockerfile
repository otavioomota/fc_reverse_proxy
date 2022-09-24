FROM node:lts-bullseye

WORKDIR /app

COPY . .

RUN yarn install

ENTRYPOINT ["yarn", "start"]