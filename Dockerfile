FROM node:16

ENV CI=true
ENV PORT=8080

WORKDIR /code
COPY package.json /code/package.json
COPY package-lock.json /code/package-lock.json

# replace .env file with the correct url for deyployment
COPY tools/.env ./.env

RUN npm i
COPY . /code

CMD [ "npm", "start" ]