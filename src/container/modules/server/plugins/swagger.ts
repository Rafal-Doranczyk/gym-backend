import { FastifyInstance } from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';

/** @param {import('fastify').FastifyInstance} app */
export default function swaggerPlugin(app: FastifyInstance) {
  app.register(fastifySwagger, {
    swagger: {
      info: {
        title: 'Test swagger',
        description: 'Testing the Fastify swagger API',
        version: '0.1.0',
      },
      host: 'localhost',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
      tags: [
        { name: 'health', description: 'Health related end-points' },
        { name: 'auth', description: 'Auth related end-points' },
      ],
      securityDefinitions: {
        apiKey: {
          type: 'apiKey',
          name: 'apiKey',
          in: 'header',
        },
      },
    },
  });

  app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
  });

  return app;
}
