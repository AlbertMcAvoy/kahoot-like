FROM node:19.0-alpine3.15 AS stage_1

WORKDIR /app/types

COPY ./types .

FROM stage_1 AS stage_2

WORKDIR /app/interface

COPY ./frontend .

RUN npm install

RUN npm run build

CMD ["npm", "start"]