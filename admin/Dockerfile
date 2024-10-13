FROM node:18-alpine

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .

ENV PORT="3002"

ENV REACT_APP_API_URL="http://localhost:3001/api/admin/"
ENV REACT_APP_CLIENT_URL="http://admin:3002"

RUN npm run build



EXPOSE 3002

CMD ["npm", "start"]