import { interfaces } from 'inversify';
// import { UserEntity } from 'entities';

declare module 'fastify' {
  interface FastifyRequest {
    container: interfaces.Container;
    // user: UserEntity;
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development';
      LOG_LEVEL: 'debug' | 'info' | 'warn' | 'error';
      API_PORT: string;
      API_HOST: string;
      DB_TYPE: 'postgres';
      DB_HOST: string;
      DB_PORT: number;
      DB_USER: string;
      DB_PASSWORD: string;
      DB_NAME: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
    }
  }
}
