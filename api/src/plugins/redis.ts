import fp from 'fastify-plugin';
import { createClient, RedisClientType, RedisScripts } from 'redis';

export default fp(
  async (fastify, ops) => {
    const redis = createClient({ url: fastify.config.REDIS_URL });

    await redis.connect();

    fastify.decorate('redis', redis);
    fastify.addHook('onClose', async (server) => {
      await server.redis.disconnect();
    });
  },
  {
    name: 'redis',
    dependencies: ['dotenv'],
  }
);

declare module 'fastify' {
  interface FastifyInstance {
    redis: RedisClientType<any, RedisScripts>;
  }
}
