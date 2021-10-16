FROM node:alpine3.12

ARG JSON_SERVER_PORT
ENV JSON_SERVER_PORT=$JSON_SERVER_PORT

WORKDIR /data

RUN npm install -g json-server

CMD json-server --watch data.json --port $JSON_SERVER_PORT --host 0.0.0.0
