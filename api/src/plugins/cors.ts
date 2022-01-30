import cors from 'fastify-cors';
import fp from 'fastify-plugin';

export default fp(
  async (fastify) => {
    const whitelist: string[] = [];

    fastify.register(cors, {
      origin: fastify.config.DEBUG ? '*' : whitelist,
    });
  },
  {
    name: 'cors',
    dependencies: ['dotenv'],
  }
);
