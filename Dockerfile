FROM node:18-slim

WORKDIR /usr/src/app

COPY package.json ./
COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]
