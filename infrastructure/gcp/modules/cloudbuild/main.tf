resource "google_cloudbuild_trigger" "build-trigger" {
  project     = var.project
  description = var.description
  provider    = google-beta

  github {
    owner = var.owner
    name  = var.name

    push {
      branch = var.branch
    }
  }

  filename = var.filename
}
