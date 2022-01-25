import type { Favorite, Prisma } from '@prisma/client';
import selectables from './constants/selectables';
import Db from './types/db';
import Paginated from './types/paginated';
import normalize from './utils/normalize';

type AuthorQuery = Pick<Favorite, 'authorId'>;
type RecipeQuery = Pick<Favorite, 'recipeId'>;

type PaginationQuery = Partial<
  Pick<Paginated, 'page' | 'pageSize'> & AuthorQuery & RecipeQuery
>;

type CreateInput = {
  authorId: number;
  recipeId: number;
};

const service = (db: Db) => {
  const collection = db.favorite;

  const read = {
    async all(query?: PaginationQuery) {
      const { page = 1, pageSize = 50, authorId, recipeId } = query || {};

      const where: Prisma.FavoriteWhereInput = {
        AND: {
          authorId,
          recipeId,
        },
      };

      const favorites = await collection.findMany({
        where,
        select: selectables.favorite,
        take: pageSize,
        skip: pageSize * (page - 1),
      });

      const rows = favorites.map(normalize.favorite);
      const totalRows = await collection.count({ where });
      const hasNext = totalRows - pageSize * page > 0;

      return {
        page,
        pageSize,
        rows,
        totalRows,
        hasNext,
      };
    },
    async one(id: number) {
      const data = await collection.findFirst({
        where: { id },
        select: selectables.favorite,
      });

      if (!data) return null;

      return normalize.favorite(data);
    },
  };

  const create = async (data: CreateInput) => {
    const favorite = await collection.create({
      data,
      select: selectables.favorite,
    });

    return favorite;
  };

  const remove = async (id: number) => {
    await collection.delete({ where: { id } });
  };

  const exists = async (where: Prisma.FavoriteWhereInput) => {
    const count = await collection.count({
      where,
      take: 1,
    });

    return count > 0;
  };

  return {
    read,
    create,
    delete: remove,
    exists,
  };
};

export default service;
