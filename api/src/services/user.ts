import { Prisma } from '@prisma/client';
import { hash } from 'bcrypt';
import selectables, { user } from './constants/selectables';
import type Db from './types/db';
import type Paginated from './types/paginated';
import normalize from './utils/normalize';

type User = ReturnType<typeof normalize.user>;
type UpdateInput = Partial<Pick<User, 'name' | 'email' | 'avatar'>>;
type CreateInput = Required<UpdateInput> & Record<'password', string>;
type PagingQuery = Partial<Pick<Paginated, 'pageSize' | 'page' | 'search'>>;
type Whereable = Pick<User, 'email' | 'id'>;

const service = (database: Db) => {
  const collection = database.user;

  const create = async (data: CreateInput): Promise<User> => {
    data.password = await hash(data.password, 8);

    const user = await collection.create({
      data,
      select: selectables.user,
    });

    return normalize.user(user);
  };

  const read = {
    async by<Key extends keyof Whereable>(
      key: Key,
      value: Whereable[Key]
    ): Promise<User | null> {
      const user = await collection.findFirst({
        where: { [key]: value },
        select: selectables.user,
      });

      return user ? normalize.user(user) : null;
    },

    /** read by id */
    one: async (id: number) => await read.by('id', id),

    async all(query?: PagingQuery): Promise<Paginated<User>> {
      const { page = 1, pageSize = 50, search } = query || {};

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

  const avatar = {
    async set(id: number, avatar: string) {
      return await update(id, { avatar });
    },
    async unset(id: number) {
      return await update(id, { avatar: null });
    },
  };

  return {
    read,
    create,
    update,
    delete: remove,
    avatar,
  };
};

export default service;
