import IRecipe from './recipe';
import IUser from './user';

interface IBookmark {
  id: number;
  author: IUser;
  recipe: IRecipe | null;
  createdAt: string;
}

export default IBookmark;
