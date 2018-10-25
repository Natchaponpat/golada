FROM node:10.12

COPY . /golada/web/.

WORKDIR /golada/web/.

RUN npm install

ENV API_URL backend:8000

EXPOSE 3000

CMD [ "npm" , "run" , "build" ]