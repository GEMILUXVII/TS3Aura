import { cleanEnv, str, port, url } from 'envalid';

export function validateEnv() {
  cleanEnv(process.env, {
    NODE_ENV: str({
      choices: ['development', 'production', 'test'],
      default: 'development',
    }),
    PORT: port({ default: 3001 }),
    CORS_ORIGINS: str({ default: 'http://localhost:3000' }),
    // Add other environment variables here
  });
}