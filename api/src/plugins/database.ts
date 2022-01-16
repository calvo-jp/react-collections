import { PrismaClient } from '@prisma/client';
import fp from 'fastify-plugin';
import services from '../services';

type Services = typeof services;
type Collection = {
  [K in keyof Services]: ReturnType<Services[K]>;
};
type DbInstance = PrismaClient;

interface Db {
  /** aka `PrismaClient` */
  instance: DbInstance;
  /** aka `services` */
  collection: Collection;
}

export default fp(
  async (fastify, ops) => {
    const instance = new PrismaClient();
    await instance.$connect();

    if (fastify.config.DEBUG) fastify.log.info('Connected to pgsql');

    const db: Db = {
      instance,
      collection: automate(instance),
    };

    fastify.decorate('db', db).addHook('onClose', async (server) => {
      await server.db.instance.$disconnect();
    });
  },
  {
    name: 'database',
    dependencies: ['dotenv'],
  }
);

/** automatically adds new services added in the `services/index.ts` file */
const automate = (db: PrismaClient) => {
  const collection: Partial<Collection> = {};

  // prettier-ignore
  for (const [name, init] of Object.entries(services))
    // @ts-ignore
    collection[name] = init(db);

  return collection as Collection;
};

declare module 'fastify' {
  interface FastifyInstance {
    db: Db;
  }
}
