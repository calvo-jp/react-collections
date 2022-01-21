import type { Prisma } from '@prisma/client';
import selectables from './constants/selectables';
import type Db from './types/db';
import type Paginated from './types/paginated';
import normalize from './utils/normalize';

type Recipe = ReturnType<typeof normalize.recipe>;
type PagingQuery = Partial<Pick<Paginated, 'pageSize' | 'page' | 'search'>>;
type AuthorQuery = Partial<Pick<Recipe, 'authorId'>>;
type CreateInput = Pick<Recipe, 'name' | 'description' | 'authorId'>;
type UpdateInput = Partial<
  Omit<CreateInput, 'authorId'> & Pick<Recipe, 'avatar' | 'banner'>
>;

const service = (db: Db) => {
  const collection = db.recipe;

  const read = {
    /** read by id */
    async one(id: number) {
      const recipe = await collection.findFirst({
        where: { id },
        select: selectables.recipe,
      });

      return recipe ? normalize.recipe(recipe) : null;
    },

    /** read all or search */
    async all(query?: PagingQuery & AuthorQuery): Promise<Paginated<Recipe>> {
      const { page = 1, pageSize = 50, search, authorId } = query || {};

      if (search) return await search_({ page, pageSize, search, authorId });

      const where: Prisma.RecipeWhereInput = {
        authorId,
      };

      const recipes = await collection.findMany({
        where,
        select: selectables.recipe,
        skip: pageSize * (page - 1),
        take: pageSize,
      });

      const totalRows = await collection.count({ where });
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

  const search_ = async (data: Required<PagingQuery> & AuthorQuery) => {
    const { search, page, pageSize, authorId } = data;

    const where: Prisma.RecipeWhereInput = {
      OR: {
        authorId,
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
    };

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

  const create = async (data: CreateInput): Promise<Recipe> => {
    const recipe = await collection.create({
      data,
      select: selectables.recipe,
    });

    return normalize.recipe(recipe);
  };

  const update = async (id: number, data: UpdateInput) => {
    const recipe = await collection.update({
      data,
      where: { id },
      select: selectables.recipe,
    });

    return normalize.recipe(recipe);
  };

  const remove = async (id: number) => {
    await collection.delete({ where: { id } });
  };

  const banner = {
    async set(id: number, banner: string) {
      return await update(id, { banner });
    },
    async unset(id: number) {
      return await update(id, { banner: null });
    },
  };

  const avatar = {
    async set(id: number, avatar: string) {
      return await update(id, { avatar });
    },
    async unset(id: number) {
      return await update(id, { avatar: null });
    },
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
    banner,
    avatar,
  };
};

export default service;
