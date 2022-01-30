import multipart from 'fastify-multipart';
import fp from 'fastify-plugin';

export default fp(
  async (fastify) => {
    fastify.register(multipart, {
      limits: {
        files: 1,
        fileSize: 1024 * 1024 * 15, // 15mb
      },
      throwFileSizeLimit: true,
    });
  },
  { name: 'multipart' }
);
