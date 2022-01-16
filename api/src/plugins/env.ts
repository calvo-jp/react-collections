import { Static, Type } from '@sinclair/typebox';
import env from 'fastify-env';
import fp from 'fastify-plugin';
import * as path from 'node:path';

const TConfig = Type.Strict(
  Type.Object({
    NODE_ENV: Type.Optional(Type.String()),
    ACCESS_TOKEN_SECRETKEY: Type.String(),
    REDIS_URL: Type.String(),
  })
);

export default fp(async (fastify) => {
  fastify.register(env, {
    schema: TConfig,
    dotenv: true,
  });

  // adding config.DEBUG prop to easily check if NODE_ENV is set to dev
  fastify.addHook('onRegister', async (request) => {
    request.config.UPLOADS_DIR = path.resolve('src/uploads');

    if (request.config.NODE_ENV) {
      const pattern = /^(dev|development|test)$/i;
      request.config.DEBUG = pattern.test(request.config.NODE_ENV);
    }
  });
});

declare module 'fastify' {
  interface FastifyInstance {
    config: Static<typeof TConfig> & {
      DEBUG?: boolean;
      UPLOADS_DIR: string;
    };
  }
}
