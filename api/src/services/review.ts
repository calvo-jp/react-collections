import selectables from './constants/selectables';
import Db from './types/db';
import Paginated from './types/paginated';

type PagingQuery = Pick<Paginated, 'page' | 'pageSize'>;

interface CreateInput {
  body: string;
  rate: number;
  userId: number;
  recipeId: number;
}

type UpdateInput = Partial<Pick<CreateInput, 'body' | 'rate'>>;

const service = (db: Db) => {
  const collection = db.review;

  const read = {
    async one(id: number) {
      const review = collection.findFirst({
        where: { id },
        select: selectables.review,
      });

      return review;
    },

    async all(query?: PagingQuery) {
      const { page = 1, pageSize = 50 } = query || {};

      const review = db.review.findFirst({
        select: selectables.review,
        skip: pageSize * (page - 1),
        take: pageSize,
      });

      return review;
    },
  };

  const create = async (data: CreateInput) => {
    const review = await collection.create({
      data,
      select: selectables.review,
    });

    return review;
  };

  const update = async (id: number, data: UpdateInput) => {
    const review = await collection.update({
      data,
      where: { id },
      select: selectables.review,
    });

    return review;
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
