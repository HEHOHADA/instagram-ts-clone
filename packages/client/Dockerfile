FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .
#COPY .env.production .env

#RUN yarn dev

#ENV NODE_ENV production

#EXPOSE 3000
CMD [ "yarn", "dev" ]
USER node
