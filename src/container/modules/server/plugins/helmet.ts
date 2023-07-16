import { FastifyInstance } from 'fastify';
import HELMET from '@fastify/helmet';

/** @param {import('fastify').FastifyInstance} app */
export default function helmetPlugin(app: FastifyInstance) {
  return app.register(HELMET);
}
