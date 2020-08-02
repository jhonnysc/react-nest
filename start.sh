#!/bin/bash
if [[ $(/usr/bin/id -u) -ne 0 ]]; then
    echo "Not running as root"
    exit
fi

yarn --cwd ./frontend
yarn --cwd ./backend
docker network create myprojectnetwork
docker-compose -f ./backend/docker-compose.yml up --build & docker-compose -f ./frontend/docker-compose.yml up --build 