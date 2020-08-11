# Restaurant Technology Landscape Infrastructure

This will allow you to use Google Cloud Build to create you infrastructure via pulumi automation.

## Pre-Requisites

The following software is needed to develop this project:

  * [git](http://git-scm.com/) with [git-flow](https://github.com/nvie/gitflow)
  * [node.js](https://nodejs.org/)
  * [pulumi](https://www.pulumi.com/docs/get-started/install/)
  * [GCP CLI](https://cloud.google.com/sdk/install) and a project

First Time Execution Steps:
* [Enable the Cloud Build API](https://console.cloud.google.com/marketplace/details/google/cloudbuild.googleapis.com) for your project.
* Followed steps 1 and 2 of[Using Cloud KMS](https://cloud.google.com/cloud-build/docs/securing-builds/use-encrypted-secrets-credentials#encrypt_credentials) to secure builds for your project.
* Execute the following:
  ``` bash
  gcloud kms keyrings create cloud-build --location global
  gcloud kms keys create pulumi \
    --location global \
    --keyring cloud-build \
    --purpose encryption
  ```
* Created and copy a [Pulumi](https://app.pulumi.com/) access token under user profile -> settings.
* Execute the following (replace `pul-aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa` with appropriate value) within the same folder as this file.:
  ``` bash
  echo -n pul-aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa | gcloud kms encrypt --plaintext-file=- \
     --ciphertext-file=- --location=global --keyring=cloud-build \
     --key=pulumi | base64 | xargs -I {} pulumi config set build:pulumi {}
  ```
* Execute the following:
  ``` bash
  pulumi stack init $YOUR_NAME
  pulumi config set gcp:project $YOUR_PROJECT_HERE
  pulumi config set gcp:region europe-west1
  pulumi config set gcp:zone b
  pulumi up
  ```
  Initial creation will fail, please follow URL/link to connect repository:
  * select GitHub and next button.
  * Authorise GCP into open-restaurant GitHub account
  * Select open-restaurant account, tick boxes and connect repository button.
  * Select skip for now and yes your are sure.
  * Rerun `pulumi up`
