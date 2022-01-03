interface IUser {
  id: number;
  name: string;
  email: string;
  /** avatar url */
  avatar: string;
  createdAt: string;
  updatedAt?: string;
  totalRecipes: number;
  /** number of recipes favorited */
  totalFavorites: number;
  /** number of recipes reviewed */
  totalReviews: number;
}

export default IUser;
