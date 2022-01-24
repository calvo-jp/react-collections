import { Static, Type } from '@sinclair/typebox';
import type { FastifyPluginAsync, RouteShorthandOptions } from 'fastify';
import TPaginated from '../../shared/typebox/paginated';
import TRecipe from '../../shared/typebox/recipe';

const THasAuthor = Type.Object({
  authorId: Type.Number(),
});

const THasId = Type.Pick(TRecipe, ['id']);

const TPaginationQuery = Type.Intersect([
  Type.Partial(Type.Pick(TPaginated(TRecipe), ['page', 'pageSize', 'search'])),
  Type.Partial(THasAuthor),
]);

const TCreateInput = Type.Intersect([
  Type.Pick(TRecipe, ['name', 'description']),
  Type.Partial(Type.Pick(TRecipe, ['ingredients', 'tags'])),
]);

const TUpdateInput = Type.Partial(
  Type.Pick(TRecipe, ['name', 'description', 'tags', 'ingredients'])
);

type PaginationQuery = Static<typeof TPaginationQuery>;

interface GetAllRequest {
  Querystring: PaginationQuery;
}

interface GetSingleRequest {
  Params: Static<typeof THasId>;
}

interface PatchRequest {
  Params: Static<typeof THasId>;
  Body: Static<typeof TUpdateInput>;
}

interface CreateRequest {
  Body: Static<typeof TCreateInput>;
}

interface DeleteRequest {
  Params: Static<typeof THasId>;
}

const router: FastifyPluginAsync = async (fastify, ops) => {
  const service = fastify.db.collection.recipe;

  const getAllOps: RouteShorthandOptions = {
    schema: {
      querystring: TPaginationQuery,
      response: {
        200: TPaginated(TRecipe),
      },
    },
  };

  fastify.get<GetAllRequest>('/', getAllOps, async (request) => {
    return await service.read.all(request.query);
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
      const recipe = await service.read.one(request.params.id);
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
    const data = await service.create({
      ...request.body,
      authorId: request.user.id,
    });

    return reply.code(201).send(data);
  });

  const updateOps: RouteShorthandOptions = {
    preHandler: [fastify.authenticate],
    schema: {
      params: THasId,
      body: TUpdateInput,
      response: {
        200: TRecipe,
      },
    },
  };

  fastify.patch<PatchRequest>('/:id', updateOps, async (request, reply) => {
    const recipe = await service.read.one(request.params.id);

    if (!recipe) return reply.notFound();

    // not the author or owner of the recipe
    if (recipe.authorId !== request.user.id) return reply.forbidden();

    try {
      return await service.update(request.params.id, request.body);
    } catch (error) {
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
    const recipe = await service.read.one(request.params.id);

    if (!recipe) return reply.notFound();

    // not the author or owner of the recipe
    if (recipe.authorId !== request.user.id) return reply.forbidden();

    // delete avatar
    if (recipe.avatar) await fastify.uploadsManager.delete(recipe.avatar);
    // delete banner
    if (recipe.banner) await fastify.uploadsManager.delete(recipe.banner);

    recipe.instructions.map(async (instruction) => {
      if (instruction.image)
        await fastify.uploadsManager.delete(instruction.image);
      if (instruction.video)
        await fastify.uploadsManager.delete(instruction.video);
    });

    await service.delete(recipe.id);
    reply.code(204).send();
  });

  fastify.put('/:id/avatar', async (request, reply) => {});

  fastify.put('/:id/banner', async (request, reply) => {});
};

export default router;
