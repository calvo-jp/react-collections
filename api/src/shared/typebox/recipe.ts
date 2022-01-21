import { Type } from '@sinclair/typebox';
import TInstruction from './instruction';
import TUser from './user';

const TRecipe = Type.Object({
  id: Type.Number(),
  name: Type.String({
    minLength: 4,
    maxLength: 100,
  }),
  description: Type.String({
    minLength: 5,
    maxLength: 100,
  }),
  author: TUser,
  ingredients: Type.Array(
    Type.String({
      minLength: 4,
      maxLength: 100,
    }),
    { default: [] }
  ),
  instructions: Type.Array(TInstruction, { default: [] }),
  tags: Type.Array(
    Type.String({
      minLength: 4,
      maxLength: 25,
    }),
    { default: [] }
  ),
  avatar: Type.Optional(Type.String()),
  banner: Type.Optional(Type.String()),
  createdAt: Type.String({ format: 'date' }),
  updatedAt: Type.String({ format: 'date' }),
  summary: Type.Object({
    rating: Type.Number(),
    reviews: Type.Number(),
    hearts: Type.Number(),
  }),
});

export default TRecipe;
