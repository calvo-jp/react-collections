import { FastifyPluginAsync } from 'fastify';

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', async (request, reply) => {
    reply.code(200).send({
      title: 'recipes',
      version: '0.0.1',
      repository: 'https://github.com/calvo-jp/recipes',
      author: {
        name: 'jp calvo',
        email: 'calvojp92@gmail.com',
        github: 'https://github.com/calvo-jp',
      },
    });
  });
};

export default root;
