import { Prisma } from '@prisma/client';
import { hash } from 'bcrypt';
import selectables from './constants/selectables';
import type Db from './types/db';
import type Paginated from './types/paginated';
import normalize from './utils/normalize';

type User = ReturnType<typeof normalize.user>;
type UpdateInput = Partial<Pick<User, 'name' | 'email'>>;
type CreateInput = Required<UpdateInput> & Record<'password', string>;
type PagingQuery = Partial<Pick<Paginated, 'pageSize' | 'page' | 'search'>>;
type Whereable = Pick<User, 'email' | 'id'>;

const service = (database: Db) => {
  const collection = database.user;

  const create = async (data: CreateInput): Promise<User> => {
    const { name, email, password } = data;

    const user = await collection.create({
      data: {
        name,
        email,
        password: await hash(password, 8),
      },
      select: selectables.user,
    });

    return normalize.user(user);
  };

  const read = {
    async by<T extends keyof Whereable>(key: T, value: Whereable[T]) {
      const user = await collection.findFirst({
        where: { [key]: value },
        select: selectables.user,
      });

      if (!user) return null;

      return normalize.user(user);
    },

    async one(id: number): Promise<User | null> {
      return await read.by('id', id);
    },

    async all(query?: PagingQuery): Promise<Paginated<User>> {
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

  // TODO: return null if user does not exists
  const update = async (id: number, data: UpdateInput): Promise<User> => {
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
