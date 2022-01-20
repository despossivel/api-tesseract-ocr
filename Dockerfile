FROM node:16-alpine

# FROM alpine:3.15.0


RUN apk update && apk add --no-cache wget \ 
 && apk add bash \
#  && apk add nginx \
 && wget https://nodejs.org/dist/v16.13.2/node-v16.13.2-linux-x64.tar.xz && tar -xf node-v16.13.2-linux-x64.tar.xz \
 && apk add tesseract-ocr \
 && apk add tesseract-lang

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
RUN npm i pm2 -g
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8888
#CMD [ "node", "index.js" ]
CMD ["pm2-runtime","process.json"]