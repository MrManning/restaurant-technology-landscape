#!/bin/bash

# exit if a command returns a non-zero exit code and also print the commands and their args as they are executed.
set -e -x

# Download and install required tools.
# gridsome
npm install --global @gridsome/cli

# install ALL node packages, including 'devDependencies'
npm set progress=false
npm config set depth 0
npm install --quiet

# create static site to distribute
gridsome build

# mirror new site to bucket
gsutil rsync -r -d dist gs://$BUCKET_NAME
