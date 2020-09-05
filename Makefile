SHELL=/bin/bash

.PHONY: all
all: build up

.PHONY: build
build:
	docker-compose build
#	ps ; cd ${DB_PATH} && docker build -t ${DB_IMAGE} .
#	cd ${WS_PATH}  && docker build -t ${WS_IMAGE} .

#.PHONY: network
#network:
#	- docker network create -d bridge ${NETWORK}

.PHONY: up
up:
	docker-compose up
#	docker run -itd --network ${NETWORK} -p ${DB_PORTS} --name ${DB_SERVICE_NAME}      ${DB_IMAGE}
#	docker run -itd --network ${NETWORK} -p ${WS_PORTS} --name ${WS_SERVICE_NAME} --rm ${WS_IMAGE}

#.PHONY: cleanall
#cleanall: downrmi

.PHONY: clean
clean: down

#.PHONY: downrmi
#downrmi: down rmi

# Stops containers and removes containers, networks, volumes, and images created by up .
.PHONY: down
down:
#	stop rm rmnetwork
	docker-compose down

.PHONY: stop
stop:
#	- docker stop ${DB_SERVICE_NAME} ${WS_SERVICE_NAME}
	docker-compose stop

.PHONY: rm
rm:
#	- docker rm ${DB_SERVICE_NAME} ${WS_SERVICE_NAME}
	docker-compose rm

#.PHONY: rmi
#rmi:
#	- docker rmi ${NODEJSAPPIMAGE} ${MONGOIMAGE}

#.PHONY: rmnetwork
#rmnetwork:
#	- docker network rm ${NETWORK}

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

