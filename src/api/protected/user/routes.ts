import { FastifyInstance } from 'fastify';
import { constants } from 'gym-shared';

import { UserRepo } from '@/repositories';

export default function routes(fastify: FastifyInstance, _: any, done: () => void) {
  fastify.get(
    constants.ROUTES.USER,
    {
      schema: {
        description: 'App user routes',
        tags: ['user'],
        summary: 'Get user data route',
      },
    },
    async ({ user }, res) => {
      const data = await UserRepo.findOne({ where: { id: user.id } });

      return res.status(200).send({
        ...data,
      });
    },
  );

  done();
}
