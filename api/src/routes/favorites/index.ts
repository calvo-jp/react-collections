import { Static, Type } from '@sinclair/typebox';
import type { FastifyPluginAsync, RouteShorthandOptions } from 'fastify';
import TFavorite from '../../shared/typebox/favorite';
import TPaginated from '../../shared/typebox/paginated';

const TAuthorQuery = Type.Object({ authorId: Type.Number() });
const TRecipeQuery = Type.Object({ recipeId: Type.Number() });
const TPaginationQuery = Type.Intersect([
  Type.Partial(Type.Pick(TPaginated(TFavorite), ['page', 'pageSize'])),
  Type.Partial(TAuthorQuery),
  Type.Partial(TRecipeQuery),
]);

const THasId = Type.Object({ id: Type.Number() });

const TCreateInput = TRecipeQuery;

interface GetAllRequest {
  Querystring: Static<typeof TPaginationQuery>;
}

interface WithIdParams {
  Params: Static<typeof THasId>;
}

type GetSingleRequest = WithIdParams;
type DeleteRequest = WithIdParams;

interface CreateRequest {
  Body: Static<typeof TCreateInput>;
}

const router: FastifyPluginAsync = async (fastify, ops) => {
  const service = fastify.db.collection.favorite;

  const getAllOps: RouteShorthandOptions = {
    schema: {
      querystring: TPaginationQuery,
      response: {
        200: TPaginated(TFavorite),
      },
    },
  };

  fastify.get<GetAllRequest>('/', getAllOps, async (request, reply) => {
    return await service.read.all(request.query);
  });

  const getByIdOps: RouteShorthandOptions = {
    schema: {
      params: THasId,
      response: {
        200: TFavorite,
      },
    },
  };

  fastify.get<GetSingleRequest>('/:id', getByIdOps, async (request, reply) => {
    const favorite = await service.read.one(request.params.id);
    if (!favorite) return reply.notFound();
    return favorite;
  });

  const createOps: RouteShorthandOptions = {
    preHandler: [fastify.authenticate],
    schema: {
      body: TCreateInput,
      response: {
        201: TFavorite,
      },
    },
  };

  fastify.post<CreateRequest>('/', createOps, async (request, reply) => {
    const authorId = request.user.id;
    const recipeId = request.body.recipeId;

    const exists = await service.exists({
      AND: {
        authorId,
        recipeId,
      },
    });

    if (exists) return reply.badRequest('Already in favorites');

    try {
      reply.code(201).send(
        await service.create({
          authorId,
          recipeId,
        })
      );
    } catch (error) {
      // most probably a recipe not found error
      reply.code(400).send(error);
    }
  });

  const delOps: RouteShorthandOptions = {
    preHandler: [fastify.authenticate],
    schema: {
      params: THasId,
    },
  };

  fastify.delete<DeleteRequest>('/:id', delOps, async (request, reply) => {
    const data = await service.read.one(request.params.id);

    if (!data) return reply.notFound();
    if (data.authorId !== request.user.id) return reply.forbidden();

    service.delete(request.params.id);
    reply.code(204).send;
  });
};

export default router;
