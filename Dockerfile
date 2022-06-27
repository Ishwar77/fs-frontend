FROM node:12-alpine
WORKDIR /app
COPY . /app
RUN npm install
EXPOSE 4200
CMD npm run host
