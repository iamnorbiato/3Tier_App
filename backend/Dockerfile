
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm ci

EXPOSE 5000

CMD ["npm", "run", "dev"]
