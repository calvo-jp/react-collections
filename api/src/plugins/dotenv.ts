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

      server.config.DEBUG = debug;
      server.config.UPLOADS_DIR = uploadsDir;
    });
  },
  { name: 'dotenv' }
);

type Config = Static<typeof TConfig> & {
  DEBUG: boolean;
  UPLOADS_DIR: string;
};

declare module 'fastify' {
  interface FastifyInstance {
    config: Config;
  }
}
