import { Prisma, Recipe } from '@prisma/client';
import selectables from './constants/selectables';
import Db from './types/db';
import Paginated from './types/paginated';
import normalize from './utils/normalize';

type CreateInput = Pick<Recipe, 'name' | 'description'>;
type UpdateInput = CreateInput;
type PagingQuery = Partial<Pick<Paginated, 'pageSize' | 'page' | 'search'>>;

const service = (db: Db) => {
  const collection = db.recipe;

  const read = {
    /** read by id */
    async one(id: number) {
      const recipe = await collection.findFirst({
        select: selectables.recipe,
        where: {
          id,
        },
      });

      if (!recipe) return null;

      return normalize.recipe(recipe);
    },

    /** read all or search */
    async all(
      query?: PagingQuery
    ): Promise<Paginated<ReturnType<typeof normalize.recipe>>> {
      const { page = 1, pageSize = 50, search } = query || {};

      if (search) return await search_({ page, pageSize, search });

      const recipes = await collection.findMany({
        select: selectables.recipe,
        skip: pageSize * (page - 1),
        take: pageSize,
      });

      const totalRows = await collection.count();
      const hasNext = totalRows - pageSize * page > 0;
      const rows = recipes.map(normalize.recipe);

      return {
        page,
        pageSize,
        rows,
        totalRows,
        hasNext,
      };
    },
  };

  const search_ = async (data: Required<PagingQuery>) => {
    const { search, page, pageSize } = data;

    const where = Prisma.validator<Prisma.RecipeWhereInput>()({
      OR: {
        name: {
          search,
          mode: 'insensitive',
        },
        description: {
          search,
          mode: 'insensitive',
        },
        tags: {
          hasSome: search,
        },
      },
    });

    const recipes = await collection.findMany({
      where,
      select: selectables.recipe,
      skip: pageSize * (page - 1),
      take: pageSize,
      orderBy: {
        _relevance: {
          fields: ['name', 'description', 'tags'],
          search,
          sort: 'asc',
        },
      },
    });

    const rows = recipes.map(normalize.recipe);
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

  const create = (data: CreateInput) => {};
  const update = (id: number, data: UpdateInput) => {};

  return {
    read,
    create,
    update,
  };
};

export default service;
