import selectables from './constants/selectables';
import Db from './types/db';
import Paginated from './types/paginated';
import normalize from './utils/normalize';

type Review = ReturnType<typeof normalize.review>;
type PagingQuery = Pick<Paginated, 'page' | 'pageSize'>;

type CreateInput = {
  body: string;
  rate: number;
  userId: number;
  recipeId: number;
};

type UpdateInput = Partial<Pick<CreateInput, 'body' | 'rate'>>;
type Whereable = Pick<Review, 'id' | 'authorId' | 'recipeId'>;

const service = (db: Db) => {
  const collection = db.review;

  const read = {
    async by<T extends keyof Whereable>(
      key: T,
      value: Whereable[T]
    ): Promise<Review | null> {
      const review = await collection.findFirst({
        where: { [key]: value },
        select: selectables.review,
      });

      if (!review) return null;

      return normalize.review(review);
    },

    one: async (id: number): Promise<Review | null> => await read.by('id', id),

    async all(query?: PagingQuery): Promise<Paginated<Review>> {
      const { page = 1, pageSize = 50 } = query || {};

      const reviews = await collection.findMany({
        select: selectables.review,
        skip: pageSize * (page - 1),
        take: pageSize,
      });

      const totalRows = await collection.count();
      const hasNext = totalRows - pageSize * page > 0;
      const rows = reviews.map(normalize.review);

      return {
        page,
        pageSize,
        rows,
        totalRows,
        hasNext,
      };
    },
  };

  const create = async (data: CreateInput): Promise<Review> => {
    const review = await collection.create({
      data,
      select: selectables.review,
    });

    return normalize.review(review);
  };

  const update = async (id: number, data: UpdateInput): Promise<Review> => {
    const review = await collection.update({
      data,
      where: { id },
      select: selectables.review,
    });

    return normalize.review(review);
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
