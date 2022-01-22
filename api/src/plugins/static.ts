import fp from 'fastify-plugin';
import static_ from 'fastify-static';

export default fp(
  async (fastify) => {
    fastify.register(static_, {
      list: fastify.config.DEBUG,
      root: fastify.config.UPLOADS_DIR,
      prefix: '/uploads',
      dotfiles: 'ignore',
      index: false,
      decorateReply: false,
      prefixAvoidTrailingSlash: true,
    });
  },
  {
    name: 'static',
    dependencies: ['dotenv'],
  }
);
