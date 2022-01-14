import { Prisma } from '@prisma/client';

//
//  This constants will keep our http responses consistent
//  across different endpoints.
//

export const user = Prisma.validator<Prisma.UserSelect>()({
  _count: {
    select: {
      recipes: true,
      reviews: true,
      favorites: true,
    },
  },
  id: true,
  name: true,
  email: true,
  avatar: true,
  createdAt: true,
  updatedAt: true,
});

export const recipe = Prisma.validator<Prisma.RecipeSelect>()({
  id: true,
  name: true,
  description: true,
  banner: true,
  avatar: true,
  createdAt: true,
  updatedAt: true,
  author: {
    select: user,
  },
  reviews: {
    select: {
      rate: true,
    },
  },
  _count: {
    select: {
      reviews: true,
      hearts: true,
    },
  },
});

const selectables = {
  user,
  recipe,
};

export default selectables;
