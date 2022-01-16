//
// WARNING: Shitty codes ahead
//

import selectables from '../constants/selectables';
import Db from '../types/db';

//
//  This will mutate every results fetched from db
//  to match whatever http responses we want.
//  This also helps keeping http responses consistent.
//

// TODO: maybe make these block even shorter
const userFn = async (db: Db) =>
  await db.user.findFirst({ select: selectables.user });
const recipeFn = async (db: Db) =>
  await db.recipe.findFirst({ select: selectables.recipe });
const reviewFn = async (db: Db) =>
  await db.review.findFirst({ select: selectables.review });

// TODO: add default avatar
const normalizeUser = (
  data: NonNullable<Awaited<ReturnType<typeof userFn>>>
) => {
  const { _count: summary, emailVerifiedAt, ...etc } = data;

  return {
    summary,
    emailVerified: !!emailVerifiedAt,
    emailVerifiedAt,
    ...etc,
  };
};

// TODO: add default banner and avatar
const normalizeRecipe = (
  data: NonNullable<Awaited<ReturnType<typeof recipeFn>>>
) => {
  const { _count, reviews, author, ...etc } = data;

  return {
    author: normalizeUser(author),
    summary: {
      ..._count,
      // manually calculating average instead of _avg to lessen db queries
      rating:
        reviews.reduce((total, review) => total + review.rate, 0) /
        reviews.length,
    },
    ...etc,
  };
};

const normalizeReview = (
  data: NonNullable<Awaited<ReturnType<typeof reviewFn>>>
) => {
  const { author, recipe, ...etc } = data;

  return {
    author: author ? normalizeUser(author) : null,
    recipe: normalizeRecipe(recipe),
    ...etc,
  };
};

const normalize = {
  user: normalizeUser,
  recipe: normalizeRecipe,
  review: normalizeReview,
};

export default normalize;
