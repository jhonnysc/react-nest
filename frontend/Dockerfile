FROM node:12.18.3-alpine as build
RUN mkdir -p /usr/src/frontend
WORKDIR /usr/src/frontend
COPY . /usr/src/frontend
RUN yarn


EXPOSE 3000
CMD ["yarn", "start"]
