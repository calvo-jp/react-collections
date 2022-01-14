import { Static, Type } from '@sinclair/typebox';
import env from 'fastify-env';
import fp from 'fastify-plugin';

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
  fastify.addHook('onRegister', async (r) => {
    const rgx = /^(dev|development|test)$/gi;
    r.config.DEBUG = !!r.config.NODE_ENV && rgx.test(r.config.NODE_ENV);
  });
});

declare module 'fastify' {
  interface FastifyInstance {
    config: Static<typeof TConfig> & Record<'DEBUG', boolean>;
  }
}
