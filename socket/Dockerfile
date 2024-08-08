FROM node:20-alpine

WORKDIR /study-stream/realtime

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8800

CMD [ "npm","start"]
