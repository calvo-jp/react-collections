import { Static, Type } from '@sinclair/typebox';
import { FastifyPluginAsync, RouteShorthandOptions } from 'fastify';
import TPaginated from '../../shared/typebox/paginated';
import TUser from '../../shared/typebox/user';

const TUpdateInput = Type.Partial(Type.Pick(TUser, ['name', 'email']));

const TCreateInput = Type.Intersect([
  Type.Required(TUpdateInput),
  Type.Object({
    password: Type.String({
      minLength: 5,
      maxLength: 100,
    }),
  }),
]);

const THasId = Type.Object({
  id: Type.Number({
    minimum: 1,
  }),
});

const TPaginationQuery = Type.Partial(
  Type.Pick(TPaginated(TUser), ['page', 'pageSize', 'search'])
);

type HasId = Static<typeof THasId>;

interface GetAllRequest {
  Querystring: Static<typeof TPaginationQuery>;
}

interface GetSingleRequest {
  Params: HasId;
}

interface PostRequest {
  Body: Static<typeof TCreateInput>;
}

interface PatchRequest extends GetSingleRequest {
  Body: Static<typeof TUpdateInput>;
}

type SetAvatarRequest = GetSingleRequest;
type UnsetAvatarRequest = GetSingleRequest;

const router: FastifyPluginAsync = async (fastify) => {
  const service = fastify.db.collection.user;

  const readAllOps: RouteShorthandOptions = {
    schema: {
      response: {
        200: TPaginated(TUser),
      },
      querystring: TPaginationQuery,
    },
  };

  fastify.get<GetAllRequest>('/', readAllOps, async (req, reply) => {
    const data = await service.read.all(req.query);
    reply.code(200).send(data);
  });

  const readSingleOps: RouteShorthandOptions = {
    schema: {
      params: THasId,
      response: {
        200: TUser,
      },
    },
  };

  fastify.get<GetSingleRequest>('/:id', readSingleOps, async (req, reply) => {
    const user = await service.read.one(req.params.id);

    if (!user) return reply.notFound();

    reply.code(200).send(user);
  });

  const createOps: RouteShorthandOptions = {
    schema: {
      body: TCreateInput,
      response: {
        201: TUser,
      },
    },
  };

  fastify.post<PostRequest>('/', createOps, async (request, reply) => {
    try {
      const user = await service.create(request.body);
      reply.code(201).send(user);
    } catch (error: any) {
      if (fastify.config.DEBUG) reply.log.error(error);
      reply.badRequest(error.message);
    }
  });

  const updateOps: RouteShorthandOptions = {
    schema: {
      params: THasId,
      body: TUpdateInput,
      response: {
        200: TUser,
      },
    },
  };

  fastify.patch<PatchRequest>('/:id', updateOps, async (request, reply) => {
    try {
      const user = await service.update(request.params.id, request.body);
      reply.code(200).send(user);
    } catch (error) {
      if (fastify.config.DEBUG) reply.log.error(error);
      reply.notFound();
    }
  });

  const setAvatarOps: RouteShorthandOptions = {
    schema: {
      params: THasId,
      response: {
        [204]: TUser,
      },
    },
  };

  fastify.put<SetAvatarRequest>(
    '/:id/avatar',
    setAvatarOps,
    async (request, reply) => {
      const id = request.params.id;

      if (!service.exists({ id })) return reply.notFound();

      const multipart = await request.file();
      const uploaded = await fastify.uploadsManager.upload(multipart);

      if (!uploaded) return reply.internalServerError('Something went wrong');

      const user = await service.update(id, { avatar: uploaded?.name });
      reply.code(202).send(user);
    }
  );

  const unsetAvatarOps: RouteShorthandOptions = {
    schema: {
      params: THasId,
      response: {
        [204]: TUser,
      },
    },
  };

  fastify.delete<UnsetAvatarRequest>(
    '/:id/avatar',
    unsetAvatarOps,
    async (request, reply) => {
      const user = await service.read.one(request.params.id);

      if (!user?.avatar) return reply.notFound();

      await fastify.uploadsManager.delete(user.avatar);
      await service.update(user.id, { avatar: null });

      reply.code(204).send();
    }
  );
};

export default router;
