import { Static, Type } from '@sinclair/typebox';
import { compare } from 'bcrypt';
import type { FastifyPluginAsync, RouteShorthandOptions } from 'fastify';
import { v4 as uuid } from 'uuid';
import TUser from '../../shared/typebox/user';

const TLoginResponse = Type.Object({
  accessToken: Type.String(),
  tokenType: Type.Optional(
    Type.Literal('bearer', {
      default: 'bearer',
    })
  ),
  user: TUser,
});

const TCredential = Type.Object({
  email: Type.String({ format: 'email' }),
  password: Type.String(),
});

const THasToken = Type.Object({
  accessToken: Type.String(),
});

interface LoginRequest {
  Body: Static<typeof TCredential>;
}

interface LogoutRequest {
  Querystring: Static<typeof THasToken>;
}

const router: FastifyPluginAsync = async (fastify, ops) => {
  const collection = fastify.db.collection.user;

  const loginOps: RouteShorthandOptions = {
    schema: {
      body: TCredential,
      response: {
        201: TLoginResponse,
      },
    },
  };

  fastify.post<LoginRequest>('/', loginOps, async (request, reply) => {
    const credentials = request.body;
    const user = await collection.read.by('email', credentials.email);

    if (user) {
      const passwordMatched = await compare(
        credentials.password,
        user.password
      );

      if (passwordMatched) {
        return reply.code(201).send({
          user,
          accessToken: await reply.jwtSign({
            id: user.id,
            name: user.name,
            email: user.email,
            tokenId: uuid(),
          }),
        });
      }
    }

    reply.badRequest();
  });

  const logoutOps: RouteShorthandOptions = {
    preValidation: [fastify.authenticate],
  };

  fastify.delete<LogoutRequest>('/', logoutOps, async (request, reply) => {
    const payload = request.user;

    const iat: number = payload.iat;
    const exp: number = payload.exp;

    // most if not all jwt lib uses epoch time,
    // so inorder to get the actual time
    // we need to multiply stored values to 1000.
    // we are also converting them to a Date object for convenience purposes
    const actualIAt = new Date(iat * 1000);
    const actualExp = new Date(exp * 1000);

    /** Current date and time */
    const now = new Date();

    /** remaining time in milliseconds until token expires */
    const leftover = (actualExp.getTime() - now.getTime()) / 1000;

    // better monitor them on dev mode
    // so we could see if something's not working
    if (fastify.config.DEBUG) {
      console.dir({
        'date today': now,
        'date issued': actualIAt,
        'date expires': actualExp,
        'remaining time': leftover,
        'remaining time in days': leftover / (60 * 60 * 24),
      });
    }

    fastify.redis.setEx(
      payload.tokenId,
      // Math.ceil to ensure token expires before it gets removed.
      Math.ceil(leftover),
      JSON.stringify(payload)
    );

    reply.code(204).send();
  });
};

export default router;
