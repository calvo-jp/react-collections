import IUser from './user';

interface IPlace {
  id: number;
  url: string;
  title?: string;
  description?: string;
  image?: string;
  keywords: string[];
  author: IUser;
  createdAt: string;
  updatedAt?: string;
}

export default IPlace;
