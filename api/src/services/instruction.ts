import type { Instruction as IInstruction, Prisma } from '@prisma/client';
import selectables from './constants/selectables';
import type Db from './types/db';
import type Paginated from './types/paginated';

type Instruction = Omit<IInstruction, 'recipe'>;
type CreateInput = Pick<
  IInstruction,
  'description' | 'image' | 'video' | 'recipeId'
>;
type UpdateInput = Partial<Omit<CreateInput, 'recipeId'>>;
type PagingQuery = Partial<Pick<Paginated, 'page' | 'pageSize' | 'search'>>;
type RecipeQuery = Partial<Pick<IInstruction, 'recipeId'>>;

const service = (db: Db) => {
  const collection = db.instruction;

  const read = {
    id: async (id: number) => {
      const instructions = await collection.findFirst({
        where: { id },
        select: selectables.instruction,
      });

      return instructions;
    },

    async all(
      query?: PagingQuery & RecipeQuery
    ): Promise<Paginated<Instruction>> {
      const { page = 1, pageSize = 50, search, recipeId } = query || {};

      if (search) return await search_({ page, pageSize, search, recipeId });

      const rows = await collection.findMany({
        where: { recipeId },
        select: selectables.instruction,
        skip: pageSize * (page - 1),
        take: pageSize,
      });

      const totalRows = await collection.count();
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

  const search_ = async (data: Required<PagingQuery> & RecipeQuery) => {
    const { search, page, pageSize, recipeId } = data;

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
      select: selectables.instruction,
      skip: pageSize * (page - 1),
      take: pageSize,
      orderBy: {
        _relevance: {
          fields: ['description'],
          search,
          sort: 'asc',
        },
      },
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
  };

  const create = async (data: CreateInput): Promise<Instruction> => {
    const instruction = await collection.create({
      data,
      select: selectables.instruction,
    });

    return instruction;
  };

  const update = async (
    id: number,
    data: UpdateInput
  ): Promise<Instruction> => {
    const recipe = await collection.update({
      data,
      where: { id },
      select: selectables.instruction,
    });

    return recipe;
  };

  const remove = async (id: number) => {
    await collection.delete({ where: { id } });
  };

  const exists = async (id: number) => {
    const count = await collection.count({ where: { id } });
    return count > 0;
  };

  return {
    read,
    create,
    update,
    delete: remove,
    exists,
  };
};

export default service;
