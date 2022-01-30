import fp from 'fastify-plugin';
import { createClient, RedisClientType, RedisScripts } from 'redis';

export default fp(
  async (fastify) => {
    const redis = createClient({ url: fastify.config.REDIS_DSN });
    await redis.connect();

    if (fastify.config.DEBUG) fastify.log.info('Connected to redis');

    fastify.decorate('redis', redis).addHook('onClose', async (server) => {
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
