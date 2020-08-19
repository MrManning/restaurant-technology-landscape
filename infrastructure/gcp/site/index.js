"use strict";
const pulumi = require("@pulumi/pulumi");
const gcp = require("@pulumi/gcp");

const name = pulumi.getProject();

// Create a GCP resource (Storage Bucket For live website)
const websiteBucket = new gcp.storage.Bucket(name + "-live-website");
const websiteBackend = new gcp.compute.BackendBucket(name + "-live-cdn",
{
  description: "Contains restaurant technology landscape site",
  bucketName: websiteBucket.name,
  enableCdn: true,
});

// Create a GCP resource (Storage Bucket For feature website)
const featureBucket = new gcp.storage.Bucket(name + "-feature-website");
const featureBackend = new gcp.compute.BackendBucket(name + "-feature-cdn",
{
  description: "Contains restaurant technology landscape site",
  bucketName: featureBucket.name,
  enableCdn: true,
});

// Create a GCP resource (Cloud build to distribute to bucket upon changes)
const websiteFeatureTrigger = new gcp.cloudbuild.Trigger(name + "-website-feature", {
  description: "Pulumi preview check of a proposed feature.",
  filename: "website/cloudbuild.yaml",
  github: {
    owner: "open-restaurant",
    name: "restaurant-technology-landscape",
    push: {
      branch: "[^master]",
    }
  },
  includedFiles: [
    'website/**'
  ],
  substitutions: {
    _BUCKET_NAME: pulumi.interpolate `${featureBucket.url}/$BRANCH_NAME`,
  },
});  // Initial creation will fail, please follow link to connect repository

const websiteProvisionTrigger = new gcp.cloudbuild.Trigger(name + "-website-provision", {
  description: "Pulumi provisioning of infrastructure to support restaurant technology landscape",
  filename: "website/cloudbuild.yaml",
  github: {
    owner: "open-restaurant",
    name: "restaurant-technology-landscape",
    push: {
      branch: "master",
    }
  },
  includedFiles: [
    'website/**'
  ],
  substitutions: {
    _BUCKET_NAME: websiteBucket.url,
  },
});

// Export the DNS name of the bucket
exports.websiteBucket = websiteBucket.url;
exports.websiteBackend = websiteBackend.name;
exports.featureBucket = featureBucket.url;
exports.featureBackend = featureBackend.name;
