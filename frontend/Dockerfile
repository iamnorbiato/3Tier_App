# Etapa 1: build do React
FROM node:18 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: servir com Nginx
FROM nginx:alpine

# Remove a configuração padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia os arquivos do build do React para o Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copia nossa configuração customizada do Nginx para o lugar da padrão
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]