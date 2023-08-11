FROM node:16.19.1-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENTRYPOINT [ "npm" ]
CMD [ "start" ]
