#!/usr/bin/env bash -e
export BUILD_APPS=("fdk-admin-gui")
export BUILD_CMD=("docker build -t dcatno/fdk-admin-gui:latest .")
