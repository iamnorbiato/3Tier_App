
# Usa uma imagem oficial do Node.js
FROM node:18

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código
COPY ./backend .

# Expõe a porta que seu app usa (ajuste conforme necessário)
EXPOSE 5000

# Comando para iniciar o app
CMD ["npm", "run", "dev"]