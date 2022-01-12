import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    users() {
      return prisma.user.findMany();
    },
  },
};

export default resolvers;
