FROM node:8

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./server/* ./server/

WORKDIR /usr/src/app/server
RUN npm install

WORKDIR /usr/src/app
RUN mkdir -p ./client/build
COPY ./client/build/* ./client/build/

EXPOSE 8080

WORKDIR /usr/src/app/server
CMD [ "npm", "start" ]