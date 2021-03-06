interface IUser {
  id: number;
  name: string;
  email: string;
  emailVerified: boolean;
  emailVerifiedAt: string | null;
  avatar: string;
  createdAt: string;
  updatedAt: string;
  summary: {
    recipes: number;
    reviews: number;
    favorites: number;
  };
}

export default IUser;
