import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import selectables from './constants/selectables';
import type Db from './types/db';
import type Paginated from './types/paginated';
import normalize from './utils/normalize';

type CreateInput = Pick<User, 'name' | 'email' | 'password'>;
type UpdateInput = Partial<Pick<CreateInput, 'name' | 'email'>>;
type PagingQuery = Partial<Pick<Paginated, 'pageSize' | 'page' | 'search'>>;

type IUser = ReturnType<typeof normalize.user>;

const service = (database: Db) => {
  const collection = database.user;

  const emailIsTaken = async (email: string) => {
    const owner = await collection.count({
      take: 1,
      where: {
        email: {
          equals: email,
          mode: 'insensitive',
        },
      },
    });

    return owner > 0;
  };

  const create = async (data: CreateInput): Promise<IUser> => {
    const { name, email, password } = data;

    if (await emailIsTaken(email)) {
      // TODO
    }

    const user = await collection.create({
      data: {
        name,
        email,
        password: await bcrypt.hash(password, 8),
      },
      select: selectables.user,
    });

    return normalize.user(user);
  };

  const read = {
    async one(id: number): Promise<IUser | null> {
      const user = await collection.findFirst({
        where: { id },
        select: selectables.user,
      });

      if (!user) return null;

      return normalize.user(user);
    },

    async all(query?: PagingQuery): Promise<Paginated<IUser>> {
      const { page = 1, pageSize = 50, search } = query || {};

      // fulltext search
      if (search) return await search_({ page, pageSize, search });

      const users = await collection.findMany({
        select: selectables.user,
        skip: pageSize * (page - 1),
        take: pageSize,
      });

      const totalRows = await collection.count();
      const hasNext = totalRows - pageSize * page > 0;
      const rows = users.map(normalize.user);

      return {
        page,
        pageSize,
        rows,
        totalRows,
        hasNext,
      };
    },
  };

  const search_ = async ({ page, pageSize, search }: Required<PagingQuery>) => {
    const where = Prisma.validator<Prisma.UserWhereInput>()({
      OR: {
        name: {
          search,
          mode: 'insensitive',
        },
        email: {
          search,
          mode: 'insensitive',
        },
      },
    });

    const users = await collection.findMany({
      select: selectables.user,
      where,
      skip: pageSize * (page - 1),
      take: pageSize,
      orderBy: {
        _relevance: {
          fields: ['name', 'email'],
          search,
          sort: 'asc',
        },
      },
    });

    const rows = users.map(normalize.user);
    const totalRows = await collection.count({ where });
    const hasNext = totalRows - pageSize * page > 0;

    return {
      page,
      pageSize,
      rows,
      totalRows,
      hasNext,
      search,
    };
  };

  const update = async (id: number, data: UpdateInput): Promise<IUser> => {
    const user = await collection.update({
      where: { id },
      data,
      select: selectables.user,
    });

    return normalize.user(user);
  };

  const remove = async (id: number) => {
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
