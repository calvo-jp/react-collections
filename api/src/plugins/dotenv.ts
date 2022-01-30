import { Static, Type } from '@sinclair/typebox';
import dotenv from 'fastify-env';
import fp from 'fastify-plugin';
import * as fs from 'fs';
import * as path from 'node:path';

const TConfig = Type.Strict(
  Type.Object({
    NODE_ENV: Type.Optional(
      Type.Union([Type.Literal('production'), Type.Literal('development')])
    ),
    PGSQL_DSN: Type.String(),
    REDIS_DSN: Type.String(),
    JWT_SECRET: Type.String(),
  })
);

export default fp(
  async (fastify) => {
    fastify.register(dotenv, {
      schema: TConfig,
      dotenv: true,
    });

    // calculated config or config based on .env vars
    fastify.register(async (server) => {
      const debug = server.config.NODE_ENV === 'development';
      const uploadsDir = path.resolve('src/uploads');

      if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

      // @ts-expect-error
      server.config.DEBUG = debug;

      // @ts-expect-error
      server.config.UPLOADS_DIR = uploadsDir;
    });
  },
  { name: 'dotenv' }
);

type Config = Static<typeof TConfig> & {
  /** `true` if `NODE_ENV` is set to development */
  DEBUG: boolean;
  /** uploaded files directory */
  UPLOADS_DIR: string;
};

declare module 'fastify' {
  interface FastifyInstance {
    config: {
      readonly [P in keyof Config]: Config[P];
    };
  }
}
