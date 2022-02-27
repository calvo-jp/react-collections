import { PrismaClient } from "@prisma/client";

let connection: PrismaClient;

const database = {
  async connect() {
    if (!connection) {
      connection = new PrismaClient();
      await connection.$connect();
    }

    return connection;
  },

  async disconnect() {
    if (connection) await connection.$disconnect();
  },
};

export default database;
