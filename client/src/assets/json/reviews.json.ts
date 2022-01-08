import IReview from 'types/review';
import recipes from './recipes.json';
import users from './users.json';

const reviews: IReview[] = [
  {
    id: 1,
    rate: 5,
    body: 'Awesome!!',
    author: users[0],
    recipe: recipes[1],
    createdAt: '2022-01-01 23:05',
  },
  {
    id: 2,
    rate: 5,
    body: 'Good.',
    author: users[1],
    recipe: recipes[2],
    createdAt: '2022-01-01 23:05',
  },
];

export default reviews;
