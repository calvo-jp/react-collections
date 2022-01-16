import { Static, Type } from '@sinclair/typebox';
import env from 'fastify-env';
import fp from 'fastify-plugin';

// prettier-ignore
const TConfig = Type.Strict(
  Type.Object({
    NODE_ENV: Type.Optional(
      Type.Union([
        Type.Literal('production'), 
        Type.Literal('development')
      ])
    ),
    DEBUG: Type.Optional(Type.Boolean()),
    ACCESS_TOKEN_SECRETKEY: Type.String(),
    REDIS_URL: Type.String(),
    TZ: Type.String(),
  })
);

export default fp(async (fastify, ops) => {
  fastify.register(env, {
    schema: TConfig,
    dotenv: true,
  });
});

declare module 'fastify' {
  interface FastifyInstance {
    config: Static<typeof TConfig>;
  }
}
