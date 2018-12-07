declare module 'config' {
  interface Config {
    BASE_URL: string;
    AMQP_URL: string;
    PORT: number;
    MONGODB_URL: string;
    SECURITY: {
      SALT_LENGTH: number;
      ITERATIONS: number;
      PASSWORD_LENGTH: number;
    };
    SINGLE_PROCESS: true;
    SMTP_HOST: string;
    SMTP_PORT: number;
    SMTP_USERNAME: string;
    SMTP_PASSWORD: string;
    EMAIL_SENDER_ADDRESS: string;
  }
  const config: Config;
  export default config;
}
