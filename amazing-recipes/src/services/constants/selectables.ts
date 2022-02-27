import { Prisma } from "@prisma/client";

const user = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  name: true,
  email: true,
  avatar: true,
  _count: {
    select: {
      recipes: true,
      reviews: true,
      bookmarks: true,
    },
  },
  emailVerifiedAt: true,
  createdAt: true,
  updatedAt: true,
});

const recipe = Prisma.validator<Prisma.RecipeSelect>()({
  id: true,
  name: true,
  description: true,
  cover: true,
  authorId: true,
  author: {
    select: user,
  },
  createdAt: true,
  updatedAt: true,
  _count: {
    select: {
      bookmarks: true,
      reviews: true,
    },
  },
  ingredients: true,
  instructions: true,
});

const review = Prisma.validator<Prisma.ReviewSelect>()({
  id: true,
  rate: true,
  body: true,
  authorId: true,
  author: {
    select: user,
  },
  recipeId: true,
  recipe: {
    select: recipe,
  },
  createdAt: true,
  updatedAt: true,
});

const bookmark = Prisma.validator<Prisma.BookmarkSelect>()({
  id: true,
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
  bookmark,
};

export default selectables;
