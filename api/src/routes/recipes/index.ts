import { Static, Type } from '@sinclair/typebox';
import type { FastifyPluginAsync, RouteShorthandOptions } from 'fastify';
import TPaginated from '../../shared/typebox/paginated';
import TRecipe from '../../shared/typebox/recipe';
import TUser from '../../shared/typebox/user';

const THasAuthor = Type.Pick(TUser, ['id']);

const THasId = Type.Pick(TRecipe, ['id']);

const TPaginationQuery = Type.Intersect([
  Type.Partial(Type.Pick(TPaginated(TRecipe), ['page', 'pageSize', 'search'])),
  Type.Partial(THasAuthor),
]);

const TCreateInput = Type.Pick(TRecipe, ['name', 'description']);

type PaginationQuery = Static<typeof TPaginationQuery>;

interface GetAllRequest {
  Querystring: PaginationQuery;
}

interface GetSingleRequest {
  Params: Static<typeof THasId>;
}

interface CreateRequest {
  Body: Static<typeof TCreateInput>;
}

const router: FastifyPluginAsync = async (fastify, ops) => {
  const collection = fastify.db.collection.recipe;

  const getAllOps: RouteShorthandOptions = {
    schema: {
      querystring: TPaginationQuery,
      response: {
        200: TPaginated(Type.Array(TRecipe)),
      },
    },
  };

  fastify.get<GetAllRequest>('/', getAllOps, async (request) => {
    return await collection.read.all(request.query);
  });

  const getSingleOps: RouteShorthandOptions = {
    schema: {
      params: THasId,
      response: {
        200: TRecipe,
      },
    },
  };

  fastify.get<GetSingleRequest>(
    '/:id',
    getSingleOps,
    async (request, reply) => {
      const recipe = await collection.read.one(request.params.id);
      if (!recipe) return reply.notFound();
      return recipe;
    }
  );

  const createOps: RouteShorthandOptions = {
    preHandler: [fastify.authenticate],
    schema: {
      body: TCreateInput,
      response: {
        201: TRecipe,
      },
    },
  };

  fastify.post<CreateRequest>('/', createOps, async (request, reply) => {
    const data = await collection.create({
      ...request.body,
      authorId: request.user.id,
    });

    return reply.code(201).send(data);
  });
};

export default router;
