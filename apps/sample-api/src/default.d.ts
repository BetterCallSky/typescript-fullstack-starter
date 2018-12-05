declare module 'config' {
  interface Config {
    BASE_URL: string;
    PORT: number;
    MONGODB_URL: string;
  }
  const config: Config;
  export default config;
}
