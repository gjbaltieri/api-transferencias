FROM node:14.15.4-alpine3.12
WORKDIR /usr/src/app
COPY ./package.json .
COPY ./build ./build
RUN npm install