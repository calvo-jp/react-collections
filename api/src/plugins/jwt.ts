import jwt from 'fastify-jwt';
import fp from 'fastify-plugin';

export default fp(async (fastify, ops) => {
  fastify.register(jwt, {
    secret: fastify.config.ACCESS_TOKEN_SECRETKEY,
    trusted: async (request, decoded) => {
      // check if token is blacklisted
      const tokenId = decoded.tokenId;
      return !(await fastify.redis.get(tokenId));
    },
  });
});
