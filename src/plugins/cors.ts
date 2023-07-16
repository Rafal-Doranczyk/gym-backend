import { FastifyInstance } from 'fastify';
import CORS from '@fastify/cors';

/** @param {import('fastify').FastifyInstance} app */
export default function corsPlugin(app: FastifyInstance) {
  return app.register(CORS, {
    exposedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
}
