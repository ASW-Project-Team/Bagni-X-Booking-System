SHELL=/bin/bash

DB_SERVICE_NAME=database
WS_SERVICE_NAME=server

DB_IMAGE=databaseimage
WS_IMAGE=serverimage

NETWORK=internal

DB_PORTS="27017-27019:27017-27019"
WS_PORTS="3000:3000"

DB_PATH=./database
WS_PATH=./server

.PHONY: all
all: build network up

.PHONY: build
build:
	ps ; cd ${DB_PATH} && docker build -t ${DB_IMAGE} .
	cd ${WS_PATH}  && docker build -t ${WS_IMAGE} .

.PHONY: network
network:
	- docker network create -d bridge ${NETWORK}

.PHONY: up
up: network
	docker run -itd --network ${NETWORK} -p ${DB_PORTS} --name ${DB_SERVICE_NAME}      ${DB_IMAGE}
	docker run -itd --network ${NETWORK} -p ${WS_PORTS} --name ${WS_SERVICE_NAME} --rm ${WS_IMAGE}

.PHONY: cleanall
cleanall: downrmi

.PHONY: clean
clean: down

.PHONY: downrmi
downrmi: down rmi

.PHONY: down
down: stop rm rmnetwork

.PHONY: stop
stop:
	- docker stop ${DB_SERVICE_NAME} ${WS_SERVICE_NAME}

.PHONY: rm
rm:
	- docker rm ${DB_SERVICE_NAME} ${WS_SERVICE_NAME}

.PHONY: rmi
rmi:
	- docker rmi ${NODEJSAPPIMAGE} ${MONGOIMAGE}

.PHONY: rmnetwork
rmnetwork:
	- docker network rm ${NETWORK}

.PHONY: build-ws-local
build-local:
	cd ${WS_PATH}/app/client && npm update && ng build
	cd ${WS_PATH}/app/ && npm update && node app.js


.PHONY: up-ws-local
up-local:
	cd ${WS_PATH}/app/ && node app.js

