import { Type } from '@sinclair/typebox';
import TUser from './user';

const TRecipe = Type.Object({
  id: Type.Number(),
  name: Type.String(),
  description: Type.String(),
  author: TUser,
  tags: Type.Array(Type.String()),
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
