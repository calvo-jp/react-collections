import { Static, Type } from '@sinclair/typebox';
import env from 'fastify-env';
import fp from 'fastify-plugin';

const TConfig = Type.Strict(
  Type.Object({
    NODE_ENV: Type.Optional(Type.String()),
    ACCESS_TOKEN_SECRETKEY: Type.String(),
    REDIS_HOST: Type.String(),
    REDIS_PORT: Type.Number(),
  })
);

export default fp(async (fastify) => {
  fastify.register(env, {
    schema: TConfig,
    dotenv: true,
  });

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
