import IRecipe from './recipe';
import IUser from './user';

interface IReview {
  id: number;
  rate: number;
  body: string;
  author: IUser;
  recipe: IRecipe;
  createdAt: string;
  updatedAt?: string;
}

export default IReview;
