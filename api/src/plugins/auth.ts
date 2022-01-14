import type { RouteHandler } from 'fastify';
import fp from 'fastify-plugin';

// TODO: make this work properly and connect to redis
export default fp(async (fastify, ops) => {
  fastify.decorate<RouteHandler>('authenticate', async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (error) {
      reply.log.error(error);
      reply.unauthorized();
    }
  });
});

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: RouteHandler;
  }
}
