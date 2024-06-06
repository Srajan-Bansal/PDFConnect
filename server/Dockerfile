FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

RUN npm i --location=global nodemon

COPY . .

EXPOSE 8000

CMD ["nodemon", "server.js"]
