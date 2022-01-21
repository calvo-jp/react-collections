import { Static, Type } from '@sinclair/typebox';
import type { FastifyPluginAsync, RouteShorthandOptions } from 'fastify';
import TInstruction from '../../shared/typebox/instruction';
import TPaginated from '../../shared/typebox/paginated';

const TRecipeQuery = Type.Pick(TInstruction, ['recipeId']);

const TPaginationQuery = Type.Intersect([
  Type.Partial(TRecipeQuery),
  Type.Partial(
    Type.Pick(TPaginated(TInstruction), ['page', 'pageSize', 'search'])
  ),
]);

const THasId = Type.Object({
  id: Type.Number(),
});

interface GetAllRequest {
  Querystring: Static<typeof TPaginationQuery>;
}

interface GetSingleRequest {
  Params: Static<typeof THasId>;
}

const plugin: FastifyPluginAsync = async (fastify, ops) => {
  const service = fastify.db.collection.instruction;

  const getAllOps: RouteShorthandOptions = {
    schema: {
      response: {
        200: TPaginated(TInstruction),
      },
      querystring: TPaginationQuery,
    },
  };

  fastify.get<GetAllRequest>('/', getAllOps, async (request) => {
    return await service.read.all(request.query);
  });

  const getSingleOps: RouteShorthandOptions = {
    schema: {
      params: THasId,
      response: {
        200: TInstruction,
      },
    },
  };

  fastify.get<GetSingleRequest>(
    '/:id',
    getSingleOps,
    async (request, reply) => {
      const recipe = await service.read.one(request.params.id);

      if (!recipe) return reply.notFound();

      return recipe;
    }
  );
};

export default plugin;
