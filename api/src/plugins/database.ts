import { PrismaClient } from '@prisma/client';
import fp from 'fastify-plugin';
import services from '../services';

interface Collection {
  user: ReturnType<typeof services.user>;
  recipe: ReturnType<typeof services.recipe>;
}

interface Db {
  instance: PrismaClient;
  collection: Collection;
}

export default fp(async (fastify, ops) => {
  const prisma = new PrismaClient();

  await prisma.$connect();

  const db: Db = {
    instance: prisma,
    collection: {
      user: services.user(prisma),
      recipe: services.recipe(prisma),
    },
  };

  fastify.decorate('db', db);
  fastify.addHook('onClose', async (server) => {
    await server.db.instance.$disconnect();
  });
});

declare module 'fastify' {
  interface FastifyInstance {
    db: Db;
  }
}
