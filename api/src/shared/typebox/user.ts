import { Type } from '@sinclair/typebox';

const TUser = Type.Object({
  id: Type.Number(),
  name: Type.String({
    minLength: 4,
    maxLength: 50,
  }),
  email: Type.String({
    format: 'email',
    maxLength: 255,
  }),
  avatar: Type.Optional(Type.String()),
  createdAt: Type.String({ format: 'date' }),
  updatedAt: Type.String({ format: 'date' }),
  summary: Type.Object({
    recipes: Type.Number(),
    reviews: Type.Number(),
    favorites: Type.Number(),
  }),
});

export default TUser;
