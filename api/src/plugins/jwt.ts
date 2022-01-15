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
      expiresIn: 60 * 60 * 24 * 14, // 14days
      notBefore: 3, // 3sec
    },
    verify: {
      algorithms: ['HS256'],
      cache: true,
      maxAge: 1000, // 1sec
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
    authenticate: any;
  }
}
