import { FastifyInstance } from 'fastify';
import { OAuth2Client } from 'google-auth-library';
import {
  GoogleSigninPayload,
  GoogleSigninResponse,
  constants,
  schemas,
} from 'gym-shared';

import { UserRepo } from '@/repositories';

export default function routes(fastify: FastifyInstance, _: any, done: () => void) {
  fastify.post<{
    Body: GoogleSigninPayload;
    Reply: GoogleSigninResponse;
  }>(
    constants.ROUTES.AUTH,
    {
      schema: {
        body: schemas.GoogleSigninPayloadSchema,
        tags: ['auth'],
        summary: 'Auth endpoint for google',
        response: {
          200: {
            description: 'Google signup user route',
            ...schemas.GoogleSigninResponseSchema,
          },
          201: {
            description: 'Google signup user route',
            ...schemas.GoogleSigninResponseSchema,
          },
        },
      },
    },
    async ({ body: { idToken } }, res) => {
      const audience = process.env.GOOGLE_CLIENT_ID;

      const ticket = await new OAuth2Client(audience).verifyIdToken({
        idToken,
        audience,
      });

      const googleUser = ticket.getPayload();

      const user = await UserRepo.findOne({ where: { email: googleUser?.email } });

      const tokens = {
        accessToken: idToken,
        refreshToken: idToken,
      };

      if (!user) {
        await UserRepo.createUserWithGoogle(googleUser!);

        return res.status(201).send(tokens);
      }

      return res.status(200).send(tokens);
    },
  );

  done();
}
