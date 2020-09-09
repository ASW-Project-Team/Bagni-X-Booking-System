FROM node:12 AS client-build
# A multi stage build is used to first build the client.
# Node 12 is the latest LTS (long term support) version
# of Node.js container https://hub.docker.com/_/node
WORKDIR /usr/src/client
# Create a directory to hold the application code inside the image

COPY client/ .
# Copies all client files inside the container.
# node_modules are ignored, as part of .dockerignore

RUN npm install @angular/cli && npm install && npm run build-prod
# Builds the client in production mode. This is necessary to enable
# the right variable inside the build, such as the port, and to enable the
# service worker and PWA functionalities (disabled in dev mode)


FROM node:12 AS server-build
# The build image is then positioned in the right place, inside
# the Express server container, that is build in this final phase

WORKDIR /usr/src/server
# Create a directory to hold the application code inside the image

COPY --from=client-build /usr/src/client/dist .
# Copies the client build from the previous container

COPY storage-init/assets/ ./assets
# Copies default image assets to the assets server directory

COPY server/ .
# Copies all server files inside the container.
# node_modules are ignored, as part of .dockerignore

RUN npm install
# Builds the server in production mode

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait
RUN chmod +x /wait
# Add docker-compose-wait tool. Used to wait mongodb to be up, before the
# launch of this, in the docker-compose configuration

EXPOSE 3000
CMD npm run prod
# Launches the script 'prod' specified inside the package.json.
# It essentially starts the server with the --prod parameter, activating
# the Docker server configuration.
