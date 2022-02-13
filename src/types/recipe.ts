import IInstruction from './instruction';
import IUser from './user';

interface IRecipe {
  id: number;
  name: string;
  description: string;
  author: IUser;
  ingredients: string[];
  instructions: IInstruction[];
  tags: string[];
  avatar: string | null;
  banner: string | null;
  createdAt: string;
  updatedAt: string;
  summary: {
    rating: number;
    hearts: number;
    reviews: number;
  };
}

export default IRecipe;
