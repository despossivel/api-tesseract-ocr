FROM node:12-alpine
WORKDIR /usr/api.pinpper.com
COPY package.json .
RUN npm i
RUN npm i pm2 -g
COPY . .
