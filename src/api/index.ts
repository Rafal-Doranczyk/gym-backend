import { FastifyInstance } from 'fastify';

import { authMiddleware } from '@/middlewares';

import protecteRoutes from './protected';
import publicRoutes from './public';

export default function Api(server: FastifyInstance) {
  server.register((fastify, _, done) => {
    publicRoutes.forEach((route) => {
      fastify.register(route);
    });

    done();
  });

  server.register((fastify, _, done) => {
    fastify.addHook('preHandler', (request, reply, done) => {
      return authMiddleware(request, reply);
    });

    protecteRoutes.forEach((route) => {
      fastify.register(route);
    });

    done();
  });
}
