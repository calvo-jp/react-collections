import type { FastifyPluginAsync } from 'fastify';

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', async function (request, reply) {
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
