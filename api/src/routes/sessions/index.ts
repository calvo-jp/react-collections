import { Static, Type } from '@sinclair/typebox';
import { compare } from 'bcrypt';
import { FastifyPluginAsync, RouteShorthandOptions } from 'fastify';
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

const plugin: FastifyPluginAsync = async (fastify, ops) => {
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
    const expiresAt = payload.exp as number;

    // FIXME: get remaining time before token expires
    const blacklistDuration = Date.now() - expiresAt;

    fastify.redis.setEx(
      payload.tokenId,
      blacklistDuration,
      JSON.stringify(payload)
    );

    reply.code(204).send();
  });
};

export default plugin;
