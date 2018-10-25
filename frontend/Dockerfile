FROM node:10.12-alpine

COPY . /golada/web/.

WORKDIR /golada/web/.

RUN npm install

EXPOSE 3000

CMD [ "npm" , "run" , "build" ]