module.exports = {
  PORT: 3300,
  MONGODB_URL: 'mongodb://127.0.0.1:27017/sample-api',
  VERBOSE_LOGGING: true,
  BASE_URL: 'api',
  SECURITY: {
    SALT_LENGTH: 64,
    ITERATIONS: 4096,
    PASSWORD_LENGTH: 64,
  },
  SMTP_HOST: 'smtp.mailgun.org',
  SMTP_PORT: 587,
  SMTP_USERNAME: 'postmaster@example.com',
  SMTP_PASSWORD: '1234',
  EMAIL_SENDER_ADDRESS: 'noreply@example.com',
  FORGOT_PASSWORD_LINK: 'http://localhost:3200/change-password/{{code}}',
  FORGOT_LINK_EXPIRATION: '1d',
};
