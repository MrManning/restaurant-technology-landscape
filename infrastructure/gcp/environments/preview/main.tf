provider "google" {
  project = var.project
  region  = var.region
}

module "cloudbuild" {
  source      = "../../modules/cloudbuild"
  name        = var.website_name
  description = var.description
  domain      = var.domain
  project     = var.project
  branch      = var.branch

  owner      = "open-restaurant"
  repository = "restaurant-technology-landscape"
  filename   = "website/cloudbuild.yaml"
}
