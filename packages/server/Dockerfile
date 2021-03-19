FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./
COPY yarn.lock ./

RUN yarn
RUN npm install -g ts-node typescript ts-node-dev
COPY . .
COPY .env .
COPY ormconfig.js .
COPY init.sql /docker-entrypoint-initdb.d/


ENV NODE_ENV development

EXPOSE 4000
CMD [ "ts-node", "src/index.ts" ]
USER node
