import { PrismaClient } from "@prisma/client";
import selectables from "constants/selectables";

interface CreateInput {
  name: string;
  email: string;
  password: string;
}

type UpdateInput = Partial<Omit<CreateInput, "password">>;

const service = (db: PrismaClient) => {
  const collection = db.user;

  const read = {
    async all() {
      const users = await collection.findMany({ select: selectables.user });

      return users;
    },

    async one(id: string) {
      const user = await collection.findUnique({
        where: { id },
        select: selectables.user,
      });

      return user;
    },
  };

  const create = async (data: CreateInput) => {
    const user = await collection.create({ data, select: selectables.user });

    return user;
  };

  const update = async (id: string, data: UpdateInput) => {
    const user = await collection.update({
      where: { id },
      data,
      select: selectables.user,
    });

    return user;
  };

  const remove = async (id: string) => {
    await collection.delete({ where: { id } });
  };

  return {
    read,
    create,
    update,
    delete: remove,
  };
};

export default service;
