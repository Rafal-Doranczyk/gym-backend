import { FastifyReply, FastifyRequest } from 'fastify';
import { OAuth2Client } from 'google-auth-library';

import { UserRepo } from '@/repositories';

export default async function authMiddleware(req: FastifyRequest, res: FastifyReply) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send({ message: 'Not Authorized' });
  }

  try {
    const items = token.split(/[ ]+/);

    if (items.length > 1 && items[0].trim() == 'Bearer') {
      const idToken = items[1];

      const ticket = await new OAuth2Client().verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();

      const user = await UserRepo.findOne({
        where: {
          email: payload?.email,
        },
      });

      if (user) {
        req.user = user;
      }

      return req;
    }

    return res.status(401).send({ message: 'Not Authorized' });
  } catch (error) {
    return res.status(401).send({ message: 'Not Authorized' });
  }
}
