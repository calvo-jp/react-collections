import fp from 'fastify-plugin';
import swagger from 'fastify-swagger';

// TODO: live docs should have a different config
export default fp(
  async (fastify, ops) => {
    fastify.register(swagger, {
      mode: 'dynamic',
      staticCSP: true,
      routePrefix: '/docs',
      exposeRoute: true,
      swagger: {
        info: {
          title: 'Recipes API Documentation',
          description: 'Official API documentation for recipes',
          version: '0.0.1',
          contact: {
            name: 'JP Calvo',
            email: 'calvojp92@gmail.com',
          },
        },
        host: 'localhost:3000',
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json'],
      },
    });
  },
  {
    name: 'swagger',
    dependencies: ['dotenv'],
  }
);
