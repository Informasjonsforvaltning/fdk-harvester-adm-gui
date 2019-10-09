#!/usr/bin/env bash
set -e

SECONDS=0 # start timer

echo "Install dependencies"
npm install

echo "SECONDS"
echo $SECONDS

# echo "Run tests"
npm test

echo "SECONDS"
echo $SECONDS

if [[ ! -z "$TRAVIS" ]]
then
    echo "Report coverage"
    codecov
fi

echo "SECONDS"
echo $SECONDS


echo "Start build in docker image";
docker version
docker build -t dcatno/fdk-admin-gui:latest .

echo "SECONDS"