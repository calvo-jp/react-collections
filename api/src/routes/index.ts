import { Type } from '@sinclair/typebox';
import type { FastifyPluginAsync, RouteShorthandOptions } from 'fastify';

const ResponseSchema = Type.Object({
  title: Type.String(),
  version: Type.String(),
  repository: Type.String(),
  author: Type.Object({
    name: Type.String(),
    email: Type.String(),
    github: Type.String(),
    twitter: Type.String(),
    facebook: Type.String(),
    portfolio: Type.String(),
  }),
});

const index: FastifyPluginAsync = async (fastify) => {
  const cfg: RouteShorthandOptions = {
    schema: {
      response: {
        200: ResponseSchema,
      },
    },
  };

  fastify.get('/', cfg, async (request, reply) => {
    reply.code(200).send({
      title: 'recipes',
      version: '0.0.1',
      repository: 'https://github.com/calvo-jp/recipes',
      author: {
        name: 'jp calvo',
        email: 'calvojp92@gmail.com',
        github: 'https://github.com/calvo-jp',
        twitter: 'https://twitter.com/calvo__jp',
        facebook: 'https://facebook.com/calvojp',
        portfolio: 'https://calvo-jp.vercel.app',
      },
    });
  });
};

export default index;
