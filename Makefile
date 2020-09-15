SHELL=/bin/bash

.PHONY: deploy
deploy: build up

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


.PHONY: server-dev
server-dev: build-server-dev up-server-dev

.PHONY: build-server-dev
build-server-dev:
	cd ./server && npm install

.PHONY: up-server-dev
up-server-dev:
	cd ./server && npm run dev

.PHONY: client-dev
client-dev: build-client-dev up-client-dev

.PHONY: build-client-dev
build-client-dev:
	cd ./client && npm install @angular/cli && npm install

.PHONY: up-client-dev
up-client-dev:
	ng serve


.PHONY: integration
integration: build-server-dev build-client-dev up-integration

.PHONY: up-integration
up-integration:
	cd ./client && ng build --configuration=integration --output-path=../server/client && cd ../server && npm run integration
