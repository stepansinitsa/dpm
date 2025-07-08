# backend/Dockerfile

FROM node:18-alpine

WORKDIR /app

# Установка зависимостей
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Установка Nest CLI
RUN npm install --save-dev @nestjs/cli

# Копирование остальных файлов
COPY . .

# Сборка проекта
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]