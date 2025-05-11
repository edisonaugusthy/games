FROM node:slim

RUN mkdir /app
WORKDIR /app

COPY ./package.json ./package-lock.json  ./

COPY ./apps/functions ./src
COPY ./libs ./libs




RUN npm i

CMD ["npm", "run","api"]