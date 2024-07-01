FROM node:latest
WORKDIR /usr/src/app
RUN apt-get update && apt-get install -y netcat-openbsd
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD sh -c "while ! nc -z db 3306; do sleep 1; done; npm start"