FROM node:18-slim

WORKDIR /usr/src/app

COPY . .

EXPOSE 3000

RUN npm install
RUN export NODE_OPTIONS=--openssl-legacy-provider
RUN npm run build
RUN npm install -g serve
CMD ["serve", "-s", "build"]
