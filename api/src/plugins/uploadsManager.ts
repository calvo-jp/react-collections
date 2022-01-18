import fp from 'fastify-plugin';
import UploadsManager from '../utils/uploadsManager';

export default fp(
  async (fastify) => {
    const uploadsDir = fastify.config.UPLOADS_DIR;
    const uploadsManager = new UploadsManager(uploadsDir);
    fastify.decorate('uploadsManager', uploadsManager);
  },
  {
    name: 'uploads-manager',
    dependencies: ['dotenv'],
  }
);

declare module 'fastify' {
  interface FastifyInstance {
    uploadsManager: UploadsManager;
  }
}
