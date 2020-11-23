provider "google" {
  project = var.project
  region  = var.region
}

module "cloudbuild" {
  source      = ""
  name        = var.website_name
  description = var.description
  domain      = var.domain
}
