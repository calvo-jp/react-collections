import type { RouteHandler } from 'fastify';
import fp from 'fastify-plugin';

export default fp(async (fastify, ops) => {
  fastify.decorate<RouteHandler>('authenticate', async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (error: any) {
      if (fastify.config.DEBUG) reply.log.error(error.message);
      reply.unauthorized();
    }
  });
});

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: RouteHandler;
  }
}
