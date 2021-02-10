FROM node:12-alpine
EXPOSE 3000
ARG TOKEN
RUN mkdir /app
WORKDIR /app
ADD package.json yarn.lock /app/
RUN yarn --pure-lockfile
ADD . /app
CMD ["npm", "start"]