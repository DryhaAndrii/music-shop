FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV NEXT_PUBLIC_API_URL="http://server:3001/api/common/"
ENV NEXT_PUBLIC_API_URL_LOCALHOST="http://localhost:3001/api/common/"
ENV NEXT_PUBLIC_REVALIDATION_TIME="3600"

EXPOSE 3000

CMD ["/bin/sh", "-c", "npm run build;npm run start"]