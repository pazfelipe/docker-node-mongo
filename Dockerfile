FROM node:alpine3.11

WORKDIR /source

COPY ./package.json .

RUN npm install

COPY . .