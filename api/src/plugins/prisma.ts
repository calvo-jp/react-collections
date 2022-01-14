import { PrismaClient } from '@prisma/client';
import fp from 'fastify-plugin';

export default fp(async (fastify, ops) => {
  const client = new PrismaClient();

  await client.$connect();

  fastify.decorate('prisma', client);
  fastify.addHook('onClose', async (server) => {
    await server.prisma.$disconnect();
  });
});

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}
