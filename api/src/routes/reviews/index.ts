import { Static, Type } from '@sinclair/typebox';
import type { FastifyPluginAsync, RouteShorthandOptions } from 'fastify';
import TPaginated from '../../shared/typebox/paginated';
import TReview from '../../shared/typebox/review';

const TAuthorQuery = Type.Object({ authorId: Type.Number() });
const TRecipeQuery = Type.Object({ recipeId: Type.Number() });

const TPaginationQuery = Type.Intersect([
  Type.Partial(Type.Pick(TPaginated(TReview), ['page', 'pageSize'])),
  Type.Partial(TAuthorQuery),
  Type.Partial(TRecipeQuery),
]);

const THasId = Type.Object({ id: Type.Number() });

const TCreateInput = Type.Object({
  rate: Type.Number({
    minimum: 1,
    maximum: 0,
  }),
  body: Type.String({
    minLength: 3,
    maxLength: 255,
  }),
  recipeId: Type.Number(),
});

const TUpdateInput = Type.Partial(Type.Pick(TCreateInput, ['body', 'rate']));

interface ReadAllRequest {
  Querystring: Static<typeof TPaginationQuery>;
}

interface ReadSingleRequest {
  Params: Static<typeof THasId>;
}

interface CreateRequest {
  Body: Static<typeof TCreateInput>;
}

interface UpdateRequest {
  Params: Static<typeof THasId>;
  Body: Static<typeof TUpdateInput>;
}

interface DeleteRequest {
  Params: Static<typeof THasId>;
}

const router: FastifyPluginAsync = async (fastify, ops) => {
  const service = fastify.db.collection.review;

  const readAllOps: RouteShorthandOptions = {
    schema: {
      tags: ['reviews'],
      querystring: TPaginationQuery,
      response: {
        200: TPaginated(TReview),
      },
    },
  };

  fastify.get<ReadAllRequest>('/', readAllOps, async (request, reply) => {
    return await service.read.all(request.query);
  });

  const readByIdOps: RouteShorthandOptions = {
    schema: {
      tags: ['reviews'],
      params: THasId,
      response: {
        200: TReview,
      },
    },
  };

  fastify.get<ReadSingleRequest>(
    '/:id',
    readByIdOps,
    async (request, reply) => {
      const review = await service.read.one(request.params.id);

      if (!review) return reply.notFound();

      reply.code(200).send(review);
    }
  );

  const createOps: RouteShorthandOptions = {
    preHandler: [fastify.authenticate],
    schema: {
      tags: ['reviews'],
      body: TCreateInput,
      response: {
        201: TReview,
      },
    },
  };

  fastify.post<CreateRequest>('/', createOps, async (request, reply) => {
    const authorId = request.user.id;
    const recipeId = request.body.recipeId;

    const exists = await service.exists({ authorId, recipeId });

    if (exists) reply.badRequest('Item already reviewed');

    try {
      const review = await service.create({
        ...request.body,
        authorId,
      });

      reply.code(201).send(review);
    } catch (e) {
      reply.code(400).send(e);
    }
  });

  const updateOps: RouteShorthandOptions = {
    preHandler: [fastify.authenticate],
    schema: {
      tags: ['reviews'],
      params: THasId,
      response: {
        200: TReview,
      },
    },
  };

  fastify.patch<UpdateRequest>('/:id', updateOps, async (request, reply) => {
    const review = await service.read.one(request.params.id);

    if (!review) return reply.notFound();

    // not owner
    if (review.authorId !== request.user.id) return reply.forbidden();

    return await service.update(review.id, { ...request.body });
  });

  const delOps: RouteShorthandOptions = {
    preHandler: [fastify.authenticate],
    schema: {
      tags: ['reviews'],
      params: THasId,
    },
  };

  fastify.delete<DeleteRequest>('/:id', delOps, async (request, reply) => {
    const review = await service.read.one(request.params.id);

    if (!review) return reply.notFound();

    // not owner
    if (review.authorId !== request.user.id) return reply.forbidden();

    await service.delete(review.id);
    reply.code(204).send();
  });
};

export default router;
