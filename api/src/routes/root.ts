import { Type } from '@sinclair/typebox';
import type { FastifyPluginAsync, RouteShorthandOptions } from 'fastify';

const ResponseOK = Type.Object({
  name: Type.String(),
  description: Type.String(),
  version: Type.String(),
  repository: Type.String(),
  author: Type.Object({
    name: Type.String(),
    email: Type.String(),
    github: Type.String(),
    twitter: Type.String(),
    facebook: Type.String(),
  }),
});

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  const config: RouteShorthandOptions = {
    schema: {
      response: {
        200: ResponseOK,
      },
    },
  };

  fastify.get('/', config, async (request, reply) => {
    reply.code(200).send({
      name: 'Pets',
      description: 'Buy or sell a pet',
      version: '0.0.1',
      repository: 'https://github.com/calvo-jp/pets',
      author: {
        name: 'JP Calvo',
        email: 'calvojp92@gmail.com',
        github: 'https://github.com/calvo-jp',
        twitter: 'https://twitter.com/calvo__jp',
        facebook: 'https://facebook.com/calvojp',
      },
    });
  });
};

export default root;
