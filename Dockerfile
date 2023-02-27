FROM node:16

ENV CI=true
ENV PORT=8080

WORKDIR /code
COPY package.json /code/package.json
COPY package-lock.json /code/package-lock.json

RUN npm i
COPY . /code

# replace .env file with the correct url for deyployment
COPY /tools/.env /code/.env

CMD [ "npm", "start" ]