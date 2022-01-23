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
    })
  ),
  instructions: Type.Array(TInstruction),
  tags: Type.Array(
    Type.String({
      minLength: 4,
      maxLength: 25,
    })
  ),
  avatar: Type.Union([Type.String(), Type.Null()]),
  banner: Type.Union([Type.String(), Type.Null()]),
  createdAt: Type.String({ format: 'date-time' }),
  updatedAt: Type.String({ format: 'date-time' }),
  summary: Type.Object({
    rating: Type.Number(),
    reviews: Type.Number(),
    hearts: Type.Number(),
  }),
});

export default TRecipe;
