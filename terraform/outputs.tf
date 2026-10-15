output "ssm_parameters" {
  description = "SSM Parameter Store parameter names for DevOps Portfolio"
  value = {
    resend_api_key_name = aws_ssm_parameter.resend_api_key.name
    resend_api_key_arn  = aws_ssm_parameter.resend_api_key.arn
    contact_email_name  = aws_ssm_parameter.contact_email.name
    contact_email_arn   = aws_ssm_parameter.contact_email.arn
  }
}
