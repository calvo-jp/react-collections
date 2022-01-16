import { Prisma } from '@prisma/client';
import selectables from './constants/selectables';
import Db from './types/db';
import Paginated from './types/paginated';
import normalize from './utils/normalize';

type Recipe = ReturnType<typeof normalize.recipe>;
type PagingQuery = Partial<Pick<Paginated, 'pageSize' | 'page' | 'search'>>;
type CreateInput = Pick<Recipe, 'name' | 'description' | 'authorId'>;
type UpdateInput = Partial<
  Omit<CreateInput, 'authorId'> & Pick<Recipe, 'avatar' | 'banner'>
>;
type Wherable = Pick<Recipe, 'id' | 'authorId'>;

const service = (db: Db) => {
  const collection = db.recipe;

  const read = {
    async by<T extends keyof Wherable>(key: T, value: Wherable[T]) {
      const recipe = await collection.findFirst({
        where: { [key]: value },
        select: selectables.recipe,
      });

      return recipe ? normalize.recipe(recipe) : null;
    },

    /** read by id */
    async one(id: number): Promise<Recipe | null> {
      return await read.by('id', id);
    },

    /** read all or search */
    async all(query?: PagingQuery): Promise<Paginated<Recipe>> {
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

  return {
    read,
    create,
    update,
    delete: remove,
    banner,
    avatar,
  };
};

export default service;
