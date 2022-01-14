import jwt from 'fastify-jwt';
import fp from 'fastify-plugin';

export default fp(async (fastify) => {
  fastify.register(jwt, {
    secret: fastify.config.ACCESS_TOKEN_SECRETKEY,
  });
});
