terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# ==============================================================================
# AWS Systems Manager (SSM) Parameter Store Resources
# ==============================================================================

# Resend API Key for Next.js Contact API
resource "aws_ssm_parameter" "resend_api_key" {
  name        = "/portfolio/RESEND_API_KEY"
  description = "Resend API Key for DevOps Portfolio Contact API"
  type        = "SecureString"
  value       = var.resend_api_key
  overwrite   = true

  tags = {
    Environment = var.environment
    ManagedBy   = "Terraform"
    Application = "portfolio"
  }
}

# Recipient Email for Contact Form Submissions
resource "aws_ssm_parameter" "contact_email" {
  name        = "/portfolio/CONTACT_EMAIL"
  description = "Recipient email address for DevOps Portfolio contact submissions"
  type        = "String"
  value       = var.contact_email
  overwrite   = true

  tags = {
    Environment = var.environment
    ManagedBy   = "Terraform"
    Application = "portfolio"
  }
}
