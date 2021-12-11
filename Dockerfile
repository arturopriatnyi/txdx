FROM node:17

WORKDIR ./txdx

COPY . .
RUN yarn install

RUN yarn build
