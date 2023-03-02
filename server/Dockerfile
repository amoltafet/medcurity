FROM node:16

ENV PORT=3002

EXPOSE 3002

WORKDIR /code

COPY . .

COPY ./tools/.env /code/.env

RUN npm install

CMD [ "npm", "run", "dev" ]