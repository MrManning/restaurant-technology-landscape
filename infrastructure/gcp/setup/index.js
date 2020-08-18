"use strict";

const pulumi = require("@pulumi/pulumi");
const gcp = require("@pulumi/gcp");

const config = new pulumi.Config();
const name = pulumi.getProject();
const stack = pulumi.getStack();

const gcpProject = config.get("gcp:project");

// Create a GCP resource (Cloud Build for infrastructure (this))
const infrastructureFeatureTrigger = new gcp.cloudbuild.Trigger(name + "-feature", {
  description: "Pulumi preview check of a proposed feature.",
  filename: "infrastructure/gcp/site/cloudbuild.yaml",
  github: {
    owner: "open-restaurant",
    name: "restaurant-technology-landscape",
    push: {
      branch: "[^master]",
    }
  },
  includedFiles: [
    '/infrastructure/gcp/site/**'
  ],
  // ignoredFiles: [
  //   '/website/**'
  // ],
  substitutions: {
    _BUILD_TYPE: "PullRequest",
    _BUILD_STACK: stack,
  },
});  // Initial creation will fail, please follow link to connect repository

const infrastructureProvisionTrigger = new gcp.cloudbuild.Trigger(name + "-provision", {
  description: "Pulumi provisioning of infrastructure to support restaurant technology landscape",
  filename: "infrastructure/gcp/site/cloudbuild.yaml",
  github: {
    owner: "open-restaurant",
    name: "restaurant-technology-landscape",
    push: {
      branch: "master",
    }
  },
  includedFiles: [
    '/infrastructure/gcp/site/**'
  ],
  // ignoredFiles: [
  //   '/website/**'
  // ],
  substitutions: {
    _BUILD_TYPE: "",
    _BUILD_STACK: stack,
  },
});  // Initial creation will fail, please follow link to connect repository
