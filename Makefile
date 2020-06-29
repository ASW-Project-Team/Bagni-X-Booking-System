SHELL=/bin/bash

MONGO_SERVICE_NAME=mongodb
NODEJSAPP_SERVICE_NAME=nodejsapp

MONGO_IMAGE=mymongo
NODEJSAPP_IMAGE=nodejsapp


NETWORK=interna

MONGO_PORTS_EXPOSED="27017-27019:27017-27019"
NODEJSAPP_PORTS_EXPOSED="3000:3000"

MONGODOCKERFILEDIR=./database
NODEJSAPPDOCKERFILEDIR=./server

all:	build network up


.PHONY:	build network up rmnetwork clean cleanall down downrmi stop rmi rm


build:	
	ps ; cd ${MONGODOCKERFILEDIR} && docker build -t ${MONGO_IMAGE}  .
	cd ${NODEJSAPPDOCKERFILEDIR} && docker build -t ${NODEJSAPP_IMAGE} . 

network:	
	- docker network create -d bridge interna

up:	network
	docker run  -itd  --network interna  -p 27017-27019:27017-27019  --name mongodb  mymongo
	docker run -itd --rm --network interna --name nodejsapp -p 3000:3000 nodejsapp


cleanall:	downrmi


clean:	down


downrmi: down  rmi


down:	stop rm rmnetwork


stop:	
	- docker stop ${MONGO_SERVICE_NAME}  ${NODEJSAPP_SERVICE_NAME}

rm:	
	- docker rm ${MONGO_SERVICE_NAME}  ${NODEJSAPP_SERVICE_NAME}

rmi:	
	- docker rmi ${NODEJSAPPIMAGE} ${MONGOIMAGE}

rmnetwork:	
	- docker network rm ${NETWORK}

.PHONY: build-local-server
build-local-server:
	cd ${NODEJSAPPDOCKERFILEDIR}/app/client && npm update && ng build
	cd ${NODEJSAPPDOCKERFILEDIR}/app/ && npm update && node app.js

.PHONY: up-local-server
up-local-server:
	cd ${NODEJSAPPDOCKERFILEDIR}/app/ && node app.js

