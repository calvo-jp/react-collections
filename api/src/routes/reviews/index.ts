import type { FastifyPluginAsync, RouteShorthandOptions } from 'fastify';
import TPaginated from '../../shared/typebox/paginated';
import TReview from '../../shared/typebox/review';

const router: FastifyPluginAsync = async (fastify, ops) => {
  const service = fastify.db.collection.review;

  const readAllOps: RouteShorthandOptions = {
    schema: {
      tags: ['reviews'],
      response: {
        200: TPaginated(TReview),
      },
    },
  };

  fastify.get('/', readAllOps, async (request, reply) => {
    return await service.read.all();
  });
};

export default router;
