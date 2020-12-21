variable "branch" {}
variable "cloudbuild" {}
variable "description" {}
variable "name" {}
variable "owner" {}
variable "project_id" {}
variable "include" {
  type    = list(string)
  default = []
}
variable "substitutions" {
  type = map(string)
}
