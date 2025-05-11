FROM node:slim

RUN mkdir /app
WORKDIR /app

COPY ./package.json ./package-lock.json  ./

COPY ./apps/admin ./src
COPY ./libs ./libs




RUN npm i

CMD ["npm", "run","ui"]