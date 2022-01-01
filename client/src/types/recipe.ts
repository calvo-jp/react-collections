import IUser from './user';

interface IRecipe {
  id: number;
  title: string;
  description: string;
  author: IUser;
  ingredients: string[];
  instructions: string[];
  tags: string[];

  /** image url */
  image: string;

  /** video url */
  video?: string;

  /** average rate from 0-5 */
  rating: number;
  createdAt: string;
  updatedAt?: string;
}

export default IRecipe;
