import type { Instruction, Prisma } from '@prisma/client';
import selectables from './constants/selectables';
import Db from './types/db';
import Paginated from './types/paginated';

type RecipeQuery = Pick<Instruction, 'recipeId'>;
type PagingQuery = Partial<Pick<Paginated, 'page' | 'pageSize' | 'search'>>;
type CreateInput = Pick<Instruction, 'description' | 'recipeId'> &
  Partial<Pick<Instruction, 'image' | 'video'>>;
type UpdateInput = Partial<CreateInput>;

const service = (db: Db) => {
  const collection = db.instruction;

  const read = {
    async one(id: number): Promise<Instruction | null> {
      return await collection.findFirst({
        where: { id },
        select: selectables.instruction,
      });
    },

    async all(
      query?: PagingQuery & Partial<RecipeQuery>
    ): Promise<Paginated<Instruction>> {
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
      };
    },
  };

  const search_ = async (
    query: Required<PagingQuery> & Partial<RecipeQuery>
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

  const create = async (data: CreateInput) => {
    return await collection.create({ data, select: selectables.instruction });
  };

  const update = async (id: number, data: UpdateInput) => {
    return await collection.update({
      data,
      where: { id },
      select: selectables.instruction,
    });
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
