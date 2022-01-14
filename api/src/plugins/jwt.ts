import { FastifyReply, FastifyRequest } from 'fastify';
import jwt from 'fastify-jwt';
import fp from 'fastify-plugin';

export default fp(async (fastify) => {
  fastify.register(jwt, {
    secret: fastify.config.ACCESS_TOKEN_SECRETKEY,
  });

  fastify.decorate<Fn>('authenticate', async (req, reply) => {
    const decoded = req.jwtDecode();
    console.log(decoded);
  });
});

type Fn = (req: FastifyRequest, reply: FastifyReply) => any;

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: Fn;
  }
}
