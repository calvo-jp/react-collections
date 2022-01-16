import multipart from 'fastify-multipart';
import fp from 'fastify-plugin';

export default fp(async (fastify, ops) => {
  fastify.register(multipart, {
    limits: {
      files: 1,
      fileSize: 1024 * 1024 * 15, // 15mb
      fields: 0,
    },
    throwFileSizeLimit: true,
  });
});
