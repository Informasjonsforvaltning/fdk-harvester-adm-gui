# FDK Admin GUI

An administration application for Fellesdatakatalog

## Getting Started

- Install dependencies by running `npm install`
- Set the following environment variables:
  - `OIDC_ISSUER`
  - `OIDC_CLIENT_ID`
- Start the application using one of the following:
  - Run `npm start` to start local development server
  - Run as a Docker container:
    - `docker build -t fdk-admin-gui .`
    - `docker run -d -p 8080:8080 -e OIDC_ISSUER -e OIDC_CLIENT_ID fdk-admin-gui`
  - Run `docker-compose up -d`
