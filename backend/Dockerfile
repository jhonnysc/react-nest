FROM node:12.18.3-alpine as build
RUN mkdir -p /usr/src/backend
WORKDIR /usr/src/backend
COPY . /usr/src/backend
RUN yarn

EXPOSE 3100
CMD ["yarn", "start"]
