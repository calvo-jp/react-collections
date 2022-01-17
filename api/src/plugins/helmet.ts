import helmet from 'fastify-helmet';
import fp from 'fastify-plugin';

export default fp(async (fastify, ops) => fastify.register(helmet), {
  name: 'helmet',
});
