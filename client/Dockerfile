FROM node:18-alpine
WORKDIR /usr/src/app
COPY . .
RUN yarn
EXPOSE 5173
CMD [ "yarn", "dev" ]