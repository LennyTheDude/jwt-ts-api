FROM node:14

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

ENV PORT=5000

ENV DB_HOST=db
# in order to connect to the Postgres container, DB_HOST 
# has to have the same name as the Postgres service container

EXPOSE $PORT
