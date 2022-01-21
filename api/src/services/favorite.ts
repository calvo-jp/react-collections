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
  };

  return {
    read,
  };
};

export default service;
