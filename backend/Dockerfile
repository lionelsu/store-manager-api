FROM node:16.19.1-slim

# Instale o pacote 'procps' que contém o utilitário 'ps'
# O operador '||' garante que o processo continue mesmo se a instalação falhar.
# A aplicação deve continuar pois o 'ps' não vai ser essencial para o funcionamento, apenas para testes do stryker.
RUN apt-get update && apt-get install -y procps || true


WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENTRYPOINT [ "npm" ]
CMD [ "start" ]
