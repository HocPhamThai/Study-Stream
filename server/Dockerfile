FROM node:20-alpine

WORKDIR /study-stream/be

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8001

CMD [ "npm","start"]
