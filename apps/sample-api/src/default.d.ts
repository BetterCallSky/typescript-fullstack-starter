import { UserDoc } from './models';

declare module 'config' {
  interface Config {
    BASE_URL: string;
    PORT: number;
    MONGODB_URL: string;
    SECURITY: {
      SALT_LENGTH: number;
      ITERATIONS: number;
      PASSWORD_LENGTH: number;
    };
  }
  const config: Config;
  export default config;
}

declare module 'express' {
  interface Request {
    user: UserDoc;
  }
}
