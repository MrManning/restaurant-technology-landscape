"use strict";

const pulumi = require("@pulumi/pulumi");
const gcp = require("@pulumi/gcp");

const config = new pulumi.Config();
const name = pulumi.getProject();
const stack = pulumi.getStack();

const gcpProject = config.get("gcp:project");

// Create a GCP resource (Service Account to publish artifacts?)
// const serviceAccount = new gcp.serviceAccount.Account("builder", {
//   accountId: "builder",
//   description: "Service account to support the build pipeline.",
//   displayName: "Builder",
// });
// const serviceAccountKey = new gcp.serviceAccount.Key("builder-key", {
//   serviceAccountId: serviceAccount.name,
//   publicKeyType: "TYPE_X509_PEM_FILE",
// });

// Create a GCP resource (Cloud Build for infrastructure (this))
const infrastructureFeatureTrigger = new gcp.cloudbuild.Trigger(name + "-feature", {
  description: "Pulumi preview check of a proposed feature.",
  filename: "infrastructure/gcp/once/cloudbuild.yaml",
  github: {
    owner: "open-restaurant",
    name: "restaurant-technology-landscape",
    push: {
      branch: "[^master]",
    }
  },
  ignoredFiles: [
    '/website/**'
  ],
  includedFiles: [
    '/infrastructure/**'
  ],
  substitutions: {
    _BUILD_TYPE: "PullRequest",
    _BUILD_STACK: stack,
  },
});  // Initial creation will fail, please follow link to connect repository

const infrastructureProvisionTrigger = new gcp.cloudbuild.Trigger(name + "-provision", {
  description: "Pulumi provisioning of infrastructure to support restaurant technology landscape",
  filename: "infrastructure/gcp/once/cloudbuild.yaml",
  github: {
    owner: "open-restaurant",
    name: "restaurant-technology-landscape",
    push: {
      branch: "master",
    }
  },
  ignoredFiles: [
    '/website/**'
  ],
  includedFiles: [
    '/infrastructure/**'
  ],
  substitutions: {
    _BUILD_TYPE: "",
    _BUILD_STACK: stack,
  },
});  // Initial creation will fail, please follow link to connect repository


// Export the Service Account details
// exports.saEmail = serviceAccount.email;
// exports.saKey = serviceAccountKey.privateKey;
// exports.saProject = gcpProject;
// Export the DNS name of the artefact bucket
// exports.ArtifactsBucketName = artefactBucket.url;
