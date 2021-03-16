FROM node:14.13.0-alpine

ENV NODE_ENV=production

WORKDIR /usr/app

COPY package*.json ./

RUN npm ci

COPY . . 

EXPOSE 5000
CMD [ "npm", "start" ]

