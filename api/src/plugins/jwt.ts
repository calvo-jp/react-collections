import type { RouteHandler } from 'fastify';
import jwt from 'fastify-jwt';
import fp from 'fastify-plugin';

export default fp(async (fastify, ops) => {
  const blacklisted = async (tokenId: string) => {
    return !!(await fastify.redis.get(tokenId));
  };

  fastify.register(jwt, {
    secret: fastify.config.ACCESS_TOKEN_SECRETKEY,
    sign: {
      algorithm: 'HS256',
      expiresIn: '14days',
    },
    verify: {
      algorithms: ['HS256'],
      cache: !fastify.config.DEBUG,
    },
    trusted: async (request, payload) => {
      return !(await blacklisted(payload.tokenId));
    },
    messages: {
      authorizationTokenExpiredMessage: 'Expired token',
      noAuthorizationInHeaderMessage: 'Invalid token',
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
});

declare module 'fastify-jwt' {
  interface FastifyJWT {
    payload: {
      tokenId: string;
      [key: string]: any;
    };
  }
}

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: RouteHandler;
  }
}
