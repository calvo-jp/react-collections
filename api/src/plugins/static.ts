import fp from 'fastify-plugin';
import static_ from 'fastify-static';
import * as path from 'node:path';

export default fp(async (fastify, ops) => {
  fastify.register(static_, {
    prefix: '/images',
    index: false,
    root: path.resolve('src/uploads'),
  });
});
