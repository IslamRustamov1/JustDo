FROM node:12-alpine as build
WORKDIR /app
COPY package.json /app/package.json
RUN npm install 
RUN npm install -g @angular/cli@9.0.7
COPY . /app
CMD ng serve --host 0.0.0.0