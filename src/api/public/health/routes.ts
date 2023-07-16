import { FastifyInstance } from 'fastify';
import { constants } from 'gym-shared';

export default function routes(fastify: FastifyInstance, _: any, done: () => void) {
  fastify.get(
    constants.ROUTES.HEALTH,
    {
      schema: {
        description: 'App health status',
        tags: ['health'],
        summary: 'health',
        response: {
          200: {
            description: 'App health status',
            type: 'object',
            properties: {
              status: {
                type: 'string',
              },
            },
          },
        },
      },
    },
    (_, reply) => {
      reply.status(200).send({ status: 'ok' });
    },
  );

  done();
}
