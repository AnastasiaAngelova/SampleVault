FROM node:18-slim

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN export NODE_OPTIONS=--openssl-legacy-provider
RUN npm uninstall -g serve
RUN npm i -S serve
RUN npm run build
RUN serve -s build

EXPOSE 3000

CMD ["npm", "run", "start"]
