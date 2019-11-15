# FDK Admin GUI

## Description

An administration application for Fellesdatakatalog.

## Installation and Usage

- Required tools to run this project:
  - Node.js and npm to run locally on a host machine
  - Docker and Docker Compose to run locally in a container

#### Running application locally on a host machine

- Install dependencies by running `npm install`
- Run `npm start` to start local development server

#### Running application in a Docker container

- Build a Docker container using the following command:
  - `docker build -t fdk-admin-gui .`
- Run the container using the following comand:
  - `docker run -d -p 8137:8000 -e OIDC_ISSUER -e FDK_HARVEST_ADMIN_HOST -e ORGANISATION_CATALOGUE_HOST fdk-admin-gui`

#### Running application using Docker Compose

- Run the application using the following command:
  - `docker-compose up -d`

## Environment Variables

- `OIDC_ISSUER` - OIDC issuer URI
- `FDK_HARVEST_ADMIN_HOST` - fdk-harvest-admin API hostname
- `ORGANISATION_CATALOGUE_HOST` - organization-catalogue API hostname
