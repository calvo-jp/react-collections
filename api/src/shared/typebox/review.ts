import { Type } from '@sinclair/typebox';
import TRecipe from './recipe';
import TUser from './user';

const TReview = Type.Object({
  id: Type.Number(),
  rate: Type.Number({ minimum: 0, maximum: 5 }),
  body: Type.String({ minLength: 10, maxLength: 50 }),
  author: TUser,
  recipe: TRecipe,
  createdAt: Type.String({ format: 'date-time' }),
  updatedAt: Type.String({ format: 'date-time' }),
});

export default TReview;
