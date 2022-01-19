import Instruction from './instruction';
import IUser from './user';

interface IRecipe {
  id: number;
  name: string;
  description: string;
  author: IUser;
  ingredients: string[];
  instructions: Instruction[];
  tags: string[];
  avatar: string;
  banner: string;
  createdAt: string;
  updatedAt: string;
  summary: {
    rating: number;
    hearts: number;
    reviews: number;
  };
}

export default IRecipe;
