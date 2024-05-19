FROM node:18-slim

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npm install serve
RUN export NODE_OPTIONS=--openssl-legacy-provider
RUN npm run build
RUN serve -s build

EXPOSE 3000
