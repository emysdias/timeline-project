FROM node:18-alpine

ENV CI=true \
    CHOKIDAR_USEPOLLING=true \
    WATCHPACK_POLLING=true

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 1234

CMD ["npx", "parcel", "src/index.html", "--host", "0.0.0.0"]
