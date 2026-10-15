variable "aws_region" {
  description = "AWS region for resources"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Deployment environment"
  type        = string
  default     = "production"
}

variable "resend_api_key" {
  description = "Resend API Key for portfolio contact form"
  type        = string
  sensitive   = true
}

variable "contact_email" {
  description = "Recipient email address for contact form submissions"
  type        = string
  default     = "shirishmaharjan0@gmail.com"
}
