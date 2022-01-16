import fp from 'fastify-plugin';
import static_ from 'fastify-static';

export default fp(
  async (fastify, ops) => {
    fastify.register(static_, {
      root: fastify.config.UPLOADS_DIR,
      prefix: '/images',
      index: false,
      decorateReply: false,
      dotfiles: 'ignore',
      list: fastify.config.DEBUG,
      prefixAvoidTrailingSlash: true,
    });
  },
  {
    name: 'static',
    dependencies: ['dotenv'],
  }
);
