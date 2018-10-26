FROM node:10.12-alpine

COPY . /golada/web/.

WORKDIR /golada/web/.

RUN npm install && \
  npm run build

EXPOSE 3000

CMD [ "npm" , "run" , "start" ]
