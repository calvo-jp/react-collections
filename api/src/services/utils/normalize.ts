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
const instructionFn = async (db: Db) =>
  await db.instruction.findFirst({ select: selectables.instruction });
const reviewFn = async (db: Db) =>
  await db.review.findFirst({ select: selectables.review });
const favoriteFn = async (db: Db) =>
  await db.favorite.findFirst({ select: selectables.favorite });

type Callable = (...args: any) => any;
type NonNormalized<T extends Callable> = NonNullable<Awaited<ReturnType<T>>>;

// TODO: add default avatar
const normalizeUser = (data: NonNormalized<typeof userFn>) => {
  const { _count: summary, emailVerifiedAt, ...others } = data;

  return {
    summary,
    emailVerified: emailVerifiedAt instanceof Date,
    emailVerifiedAt,
    ...others,
  };
};

// TODO: add default banner and avatar
const normalizeRecipe = (data: NonNormalized<typeof recipeFn>) => {
  if (!data.tags) data.tags = [];
  if (!data.ingredients) data.ingredients = [];
  if (!data.instructions) data.instructions = [];

  const { _count, reviews, author, ...others } = data;

  const getRating = () => {
    return reviews.reduce((total, review, idx, arr) => {
      const len = arr.length;
      const sum = total + review.rate;

      if (idx + 1 === len) return sum / len;

      return sum;
    }, 0);
  };

  return {
    author: normalizeUser(author),
    summary: {
      ..._count,
      rating: getRating(),
    },
    ...others,
  };
};

const normalizeInstruction = (data: NonNormalized<typeof instructionFn>) => {
  const { recipe, ...others } = data;

  return {
    ...recipe,
    ...others,
  };
};

const normalizeReview = (data: NonNormalized<typeof reviewFn>) => {
  const { author, recipe, ...others } = data;

  return {
    author: author ? normalizeUser(author) : null,
    recipe: normalizeRecipe(recipe),
    ...others,
  };
};

const normalizeFavorite = (data: NonNormalized<typeof favoriteFn>) => {
  const { author, recipe, ...others } = data;

  return {
    author: normalizeUser(author),
    recipe: recipe ? normalizeRecipe(recipe) : null,
    ...others,
  };
};

const normalize = {
  user: normalizeUser,
  recipe: normalizeRecipe,
  instruction: normalizeInstruction,
  review: normalizeReview,
  favorite: normalizeFavorite,
};

export default normalize;
