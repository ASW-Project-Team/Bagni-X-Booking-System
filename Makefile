SHELL=/bin/bash

.PHONY: all
all: build up

.PHONY: build
build:
	docker-compose build

.PHONY: up
up:
	docker-compose up

.PHONY: clean
clean: down

# Stops containers and removes containers, networks, volumes, and images created by up .
.PHONY: down
down:
	docker-compose down

.PHONY: stop
stop:
	docker-compose stop

.PHONY: rm
rm:
	docker-compose rm

.PHONY: local
local: build-local up-local

.PHONY: build-local
build-local:
	cd ./client npm install @angular/cli && npm install && npm run build-prod
	mv ./client/dist/client/ ./server/client/
	cd ./server && npm install

.PHONY: up-local
up-local:
	cd ./server && node server.js

