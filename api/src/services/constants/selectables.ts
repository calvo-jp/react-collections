import { Prisma } from '@prisma/client';

//
//  These constants will keep our http responses consistent
//  across different endpoints.
//

const user = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  name: true,
  email: true,
  emailVerifiedAt: true,
  avatar: true,
  password: true,
  createdAt: true,
  updatedAt: true,
  _count: {
    select: {
      recipes: true,
      reviews: true,
      favorites: true,
    },
  },
});

const recipe = Prisma.validator<Prisma.RecipeSelect>()({
  id: true,
  name: true,
  description: true,
  banner: true,
  avatar: true,
  createdAt: true,
  updatedAt: true,
  authorId: true,
  author: {
    select: user,
  },
  ingredients: true,
  instructions: true,
  tags: true,
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

const review = Prisma.validator<Prisma.ReviewSelect>()({
  id: true,
  body: true,
  rate: true,
  createdAt: true,
  updatedAt: true,
  authorId: true,
  author: {
    select: user,
  },
  recipeId: true,
  recipe: {
    select: recipe,
  },
});

const selectables = {
  user,
  recipe,
  review,
};

export default selectables;
