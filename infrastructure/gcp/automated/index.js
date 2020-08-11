"use strict";
const pulumi = require("@pulumi/pulumi");
const gcp = require("@pulumi/gcp");

const name = pulumi.getProject();

// Create a GCP resource (Storage Bucket For build artifacts)
const artefactBucket = new gcp.storage.Bucket("artefacts");

// Create a GCP resource (Storage Bucket For website)
const websiteBucket = new gcp.storage.Bucket(name + "-website");
const websiteBackend = new gcp.compute.BackendBucket(name + "-website-backend",
{
  description: "Contains restaurant technology landscape site",
  bucketName: websiteBucket.name,
  enableCdn: true,
});

// Create a GCP resource (Cloud Build for website)


// Export the DNS name of the bucket
exports.websiteBucketName = websiteBucket.url;
exports.websiteBAckend = websiteBackend.urn;
// Export the DNS name of the artefact bucket
exports.ArtifactsBucketName = artefactBucket.url;
