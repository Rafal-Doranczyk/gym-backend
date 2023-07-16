import { interfaces } from 'inversify';
import { UserEntity } from 'entities';

declare module 'fastify' {
  interface FastifyRequest {
    container: interfaces.Container;
    user: UserEntity;
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_PORT: string;
      API_HOST: string;
      AWS_ACCESS_KEY: string;
      AWS_SECRET_KEY: string;
      AWS_REGION: string;
      AWS_BUCKET_NAME: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      GITHUB_CLIENT_ID: string;
      GITHUB_CLIENT_SECRET: string;
    }
  }
}
