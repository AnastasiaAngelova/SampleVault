FROM node:18-slim

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN export NODE_OPTIONS=--openssl-legacy-provider

EXPOSE 3000

CMD ["npm", "run", "start"]
