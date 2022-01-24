FROM debian:stable
 
RUN apt-get update  \
    && apt-get install curl tesseract-ocr tesseract-ocr-por -y  \
    && curl -sL https://deb.nodesource.com/setup_16.x -o nodesource_setup.sh \
    && bash nodesource_setup.sh \ 
    && apt install nodejs build-essential -y \
    && mkdir /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install \
   && npm i pm2 -g
 
COPY . .

EXPOSE 8888
#CMD [ "node", "index.js" ]
CMD ["pm2-runtime","process.json"]