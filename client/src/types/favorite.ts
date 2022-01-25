import IRecipe from './recipe';
import IUser from './user';

interface Favorite {
  id: number;
  author: IUser;
  recipe: IRecipe | null;
  createdAt: string;
}

export default Favorite;
