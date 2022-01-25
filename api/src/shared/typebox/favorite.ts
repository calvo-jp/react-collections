import { Type } from '@sinclair/typebox';
import TRecipe from './recipe';
import TUser from './user';

const TFavorite = Type.Object({
  id: Type.Number(),
  author: TUser,
  recipe: TRecipe,
  createdAt: Type.String({ format: 'date-time' }),
});

export default TFavorite;
