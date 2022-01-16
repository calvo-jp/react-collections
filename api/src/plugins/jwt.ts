import type { RouteHandler } from 'fastify';
import jwt from 'fastify-jwt';
import fp from 'fastify-plugin';

export default fp(
  async (fastify, ops) => {
    const blacklisted = async (id: string) => !!(await fastify.redis.get(id));

    fastify.register(jwt, {
      secret: fastify.config.ACCESS_TOKEN_SECRETKEY,
      sign: {
        algorithm: 'HS256',
        expiresIn: '14 days',
      },
      verify: {
        algorithms: ['HS256'],
        cache: !fastify.config.DEBUG,
      },
      trusted: async (_, payload) => !(await blacklisted(payload.tokenId)),
      messages: {
        authorizationTokenExpiredMessage: 'Expired token',
        noAuthorizationInHeaderMessage: 'Missing token',
        authorizationTokenUntrusted: 'Invalid token',
        authorizationTokenInvalid: 'Invalid token',
        badRequestErrorMessage: 'Missing or invalid token',
      },
    });

    fastify.decorate<RouteHandler>('authenticate', async (request, reply) => {
      try {
        await request.jwtVerify();
      } catch (error: any) {
        reply.unauthorized(error.message);
      }
    });
  },
  {
    name: 'jwt',
    dependencies: ['dotenv'],
  }
);

declare module 'fastify-jwt' {
  interface FastifyJWT {
    payload: {
      tokenId: string;
      version: string;
      [key: string]: any;
    };
  }
}

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: RouteHandler;
  }
}
