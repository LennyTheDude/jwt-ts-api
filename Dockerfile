FROM node:14

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

ENV PORT=5000

ENV DB_NAME=jwt_ts
ENV DB_USER=postgres
ENV DB_PASSWORD=spliff
ENV DB_HOST=db

EXPOSE $PORT
