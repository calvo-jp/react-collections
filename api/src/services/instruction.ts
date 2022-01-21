import { Prisma } from '@prisma/client';
import selectables from './constants/selectables';
import Db from './types/db';
import Paginated from './types/paginated';

type WithRecipe = Record<'recipeId', number>;
type PagingQuery = Partial<Pick<Paginated, 'page' | 'pageSize' | 'search'>>;

const service = (db: Db) => {
  const collection = db.instruction;

  const read = {
    async one(id: number) {
      return await collection.findFirst({
        where: { id },
        select: selectables.instruction,
      });
    },

    async all(query?: PagingQuery & Partial<WithRecipe>) {
      const { page = 1, pageSize = 50, search, recipeId } = query || {};

      if (search) {
        return await search_({
          page,
          pageSize,
          search,
          recipeId,
        });
      }

      const where: Prisma.InstructionWhereInput = {
        recipeId,
      };

      const rows = await collection.findMany({
        where,
        take: pageSize,
        skip: pageSize * (page - 1),
        select: selectables.instruction,
      });

      const totalRows = await collection.count({ where });
      const hasNext = totalRows - pageSize * page > 0;

      return {
        page,
        pageSize,
        rows,
        totalRows,
        hasNext,
        search,
      } as Paginated<typeof rows[number]>;
    },
  };

  const search_ = async (
    query: Required<PagingQuery> & Partial<WithRecipe>
  ) => {
    const { page, pageSize, search, recipeId } = query;

    const where: Prisma.InstructionWhereInput = {
      OR: {
        recipeId,
        description: {
          search,
          mode: 'insensitive',
        },
      },
    };

    const rows = await collection.findMany({
      where,
      take: pageSize,
      skip: pageSize * (page - 1),
      select: selectables.instruction,
    });

    const totalRows = await collection.count({ where });
    const hasNext = totalRows - pageSize * page > 0;

    return {
      page,
      pageSize,
      rows,
      totalRows,
      hasNext,
      search,
    } as Paginated<typeof rows[number]>;
  };

  return {
    read,
  };
};

export default service;
