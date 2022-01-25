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

const TCreateInput = Type.Pick(TInstruction, ['description', 'recipeId']);
const TUpdateInput = Type.Partial(Type.Pick(TCreateInput, ['description']));

interface GetAllRequest {
  Querystring: Static<typeof TPaginationQuery>;
}

interface WithIdParams {
  Params: Static<typeof THasId>;
}

type GetSingleRequest = WithIdParams;

interface CreateRequest {
  Body: Static<typeof TCreateInput>;
}

interface UpdateRequest extends WithIdParams {
  Body: Static<typeof TUpdateInput>;
}

type DeleteRequest = WithIdParams;
type SetImageRequest = WithIdParams;
type SetVideoRequest = WithIdParams;
type UnsetImageRequest = WithIdParams;
type UnsetVideoRequest = WithIdParams;

const router: FastifyPluginAsync = async (fastify, ops) => {
  const service = fastify.db.collection.instruction;

  const getAllOps: RouteShorthandOptions = {
    schema: {
      querystring: TPaginationQuery,
      response: {
        200: TPaginated(TInstruction),
      },
    },
  };

  fastify.get<GetAllRequest>('/', getAllOps, async (request) => {
    return await service.read.all(request.query);
  });

  const getByIdOps: RouteShorthandOptions = {
    schema: {
      params: THasId,
      response: {
        200: TInstruction,
      },
    },
  };

  fastify.get<GetSingleRequest>('/:id', getByIdOps, async (request, reply) => {
    const recipe = await service.read.one(request.params.id);

    if (!recipe) return reply.notFound();

    return recipe;
  });

  const createOps: RouteShorthandOptions = {
    preHandler: [fastify.authenticate],
    schema: {
      response: {
        201: TInstruction,
      },
    },
  };

  fastify.post<CreateRequest>('/', createOps, async (request, reply) => {
    const recipe = await fastify.db.collection.recipe.read.one(
      request.body.recipeId
    );

    // recipe does not or no longer exists
    if (!recipe) return reply.notFound();

    // not the author
    if (request.user.id !== recipe.authorId) return reply.forbidden();

    const instruction = await service.create(request.body);
    reply.code(201).send(instruction);
  });

  const updateOps: RouteShorthandOptions = {
    preHandler: [fastify.authenticate],
    schema: {
      params: THasId,
      response: {
        200: TInstruction,
      },
    },
  };

  fastify.patch<UpdateRequest>('/:id', updateOps, async (request, reply) => {
    const instruction = await service.read.one(request.params.id);

    if (!instruction) return reply.notFound();

    // not the owner
    if (instruction.authorId !== request.user.id) return reply.forbidden();

    return await service.update(request.params.id, request.body);
  });

  const delOps: RouteShorthandOptions = {
    preHandler: [fastify.authenticate],
    schema: {
      params: THasId,
    },
  };

  fastify.delete<DeleteRequest>('/:id', delOps, async (request, reply) => {
    const instruction = await service.read.one(request.params.id);

    if (!instruction) return reply.notFound();

    // not owner
    if (instruction.authorId !== request.user.id) return reply.forbidden();

    // delete image
    if (instruction.image)
      await fastify.uploadsManager.delete(instruction.image);

    // delete video
    if (instruction.video)
      await fastify.uploadsManager.delete(instruction.video);

    await service.delete(request.params.id);
    reply.code(204).send();
  });

  const setImageOps: RouteShorthandOptions = {
    preHandler: [fastify.authenticate],
    schema: {
      params: THasId,
      response: {
        200: TInstruction,
      },
    },
  };

  fastify.put<SetImageRequest>(
    '/:id/image',
    setImageOps,
    async (request, reply) => {
      const instruction = await service.read.one(request.params.id);

      if (!instruction) return reply.notFound();

      // delete old image
      if (instruction.image)
        await fastify.uploadsManager.delete(instruction.image);

      const multipart = await request.file();
      const uploaded = await fastify.uploadsManager.upload(multipart);

      return await service.update(request.params.id, {
        image: uploaded.name,
      });
    }
  );

  const unsetImageOps: RouteShorthandOptions = {
    preHandler: [fastify.authenticate],
    schema: {
      params: THasId,
    },
  };

  fastify.delete<UnsetImageRequest>(
    '/:id/image',
    unsetImageOps,
    async (request, reply) => {
      const instruction = await service.read.one(request.params.id);

      if (!instruction?.image) return reply.notFound();

      // not the owner
      if (request.user.id !== instruction.authorId) return reply.forbidden();

      await service.update(request.params.id, { image: null });
      reply.code(204).send();
    }
  );

  const setVideoOps: RouteShorthandOptions = {
    ...setImageOps,
  };

  fastify.put<SetVideoRequest>(
    '/:id/video',
    setVideoOps,
    async (request, reply) => {
      const instruction = await service.read.one(request.params.id);

      if (!instruction) return reply.notFound();

      // delete old video
      if (instruction.video)
        await fastify.uploadsManager.delete(instruction.video);

      const multipart = await request.file();
      const uploaded = await fastify.uploadsManager.upload(multipart);

      return await service.update(request.params.id, {
        video: uploaded.name,
      });
    }
  );

  const unsetVideoOps: RouteShorthandOptions = {
    ...unsetImageOps,
  };

  fastify.delete<UnsetVideoRequest>(
    '/:id/video',
    unsetVideoOps,
    async (request, reply) => {
      const instruction = await service.read.one(request.params.id);

      if (!instruction?.video) return reply.notFound();

      // not the owner
      if (request.user.id !== instruction.authorId) return reply.forbidden();

      await service.update(request.params.id, { video: null });
      reply.code(204).send();
    }
  );
};

export default router;
