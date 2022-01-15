import fp from 'fastify-plugin';
import static_ from 'fastify-static';
import * as path from 'node:path';

export default fp(async (fastify, ops) => {
  fastify.register(static_, {
    root: path.resolve('src/uploads'),
    prefix: '/images',
    index: false,
    decorateReply: false,
    dotfiles: 'ignore',
    list: fastify.config.DEBUG,
  });
});
