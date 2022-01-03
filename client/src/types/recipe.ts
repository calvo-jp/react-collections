import IUser from './user';

interface IRecipe {
  id: number;
  name: string;
  description: string;
  author: IUser;
  ingredients: string[];
  instructions: Instruction[];
  tags: string[];
  /** image url */
  image: string;
  /** image banner */
  cover: string;
  /** average rate from 0-5 */
  rating: number;
  createdAt: string;
  updatedAt?: string;
}

interface Instruction {
  description: string;
  attachment?: Attachment;
}

interface Attachment {
  src: string;
  type: AttachmentType;
}

type AttachmentType = 'image' | 'video';

export default IRecipe;
