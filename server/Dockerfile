FROM node:16

ENV PORT=3002

EXPOSE 3002

WORKDIR /code
COPY . .
RUN npm install

CMD [ "npm", "run", "dev" ]