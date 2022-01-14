import { Static, Type } from '@sinclair/typebox';
import { FastifyPluginAsync, RouteShorthandOptions } from 'fastify';
import services from '../../services';
import TPaginated from '../../shared/typebox/paginated';
import TUser from '../../shared/typebox/user';

const TUpdateInput = Type.Pick(TUser, ['name', 'email']);

const TCreateInput = Type.Intersect([
  TUpdateInput,
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

const plugin: FastifyPluginAsync = async (fastify) => {
  const service = services.init(fastify.prisma).get('user');

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

  fastify.post<PostRequest>('/', createOps, async (req, reply) => {
    const user = await service.create(req.body);
    reply.code(201).send(user);
  });

  const updateOps: RouteShorthandOptions = {
    schema: {
      params: THasId,
      body: TUpdateInput,
      response: {
        200: TUser,
      },
    },
    preValidation: [fastify.authenticate],
  };

  fastify.patch<PatchRequest>('/:id', updateOps, async (req, reply) => {
    const user = await service.update(req.params.id, req.body);
    reply.code(200).send(user);
  });
};

export default plugin;
