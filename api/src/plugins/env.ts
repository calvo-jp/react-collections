import { Static, Type } from '@sinclair/typebox';
import env from 'fastify-env';
import fp from 'fastify-plugin';
import * as path from 'node:path';

// prettier-ignore
const TConfig = Type.Strict(
  Type.Object({
    NODE_ENV: Type.Optional(
      Type.Union([
        Type.Literal('production'), 
        Type.Literal('development')
      ])
    ),
    ACCESS_TOKEN_SECRETKEY: Type.String(),
    REDIS_URL: Type.String(),
    TZ: Type.String(),
  })
);

export default fp(
  async (fastify) => {
    fastify.register(env, {
      schema: TConfig,
      dotenv: true,
    });

    // calculated config or config based on .env vars
    fastify.register(async (server) => {
      server.config.DEBUG = server.config.NODE_ENV === 'development';
      server.config.UPLOADS_DIR = path.resolve('src/uploads');
    });
  },
  { name: 'dotenv' }
);

declare module 'fastify' {
  interface FastifyInstance {
    config: Static<typeof TConfig> & {
      DEBUG: boolean;
      UPLOADS_DIR: string;
    };
  }
}
