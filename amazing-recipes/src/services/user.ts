import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import selectables from "./constants/selectables";

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

  const generateDefaultAvatar = (email: string) => {
    const hash = crypto.createHash("md5").update(email).digest("hex");
    return `https://www.gravatar.com/avatar/${hash}?s=275&d=retro`;
  };

  const create = async (data: CreateInput) => {
    const user = await collection.create({
      data: { ...data, avatar: generateDefaultAvatar(data.email) },
      select: selectables.user,
    });

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
