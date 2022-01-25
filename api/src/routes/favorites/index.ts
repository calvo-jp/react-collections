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

const plugin: FastifyPluginAsync = async (fastify, ops) => {
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
    try {
      const data = await service.create({
        ...request.body,
        authorId: request.user.id,
      });

      reply.code(201).send(data);
    } catch (error) {
      reply.code(400).send(error);
    }
  });

  fastify.delete<DeleteRequest>('/:id', async (request, reply) => {
    if (await service.exists(request.params.id)) {
      service.delete(request.params.id);
      return reply.code(204).send;
    }

    reply.notFound();
  });
};

export default plugin;
