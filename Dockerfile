FROM node:9.11.1-alpine

MAINTAINER willwbowen@gmail.com

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN npm install -g nodemon

RUN npm install

EXPOSE $PORT

CMD [ "npm", "start" ]
