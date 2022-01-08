import IRecipe from 'types/recipe';
import users from './users.json';

const recipes: IRecipe[] = [
  {
    id: 1,
    name: 'Adobong manok',
    description:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa nulla nobis inventore eum ratione esse maiores! Sint non itaque doloribus!',
    ingredients: [
      '16kg Chicken',
      '3pk Silver swan',
      '10pcs garlic',
      '4pk baby oil',
    ],
    instructions: [],
    tags: [
      'Adobo',
      'Manamit',
      'BrownKaayo',
      'AriPagd',
      'COVID19',
      'HappyNewYear2022',
    ],
    image: '/images/8.jpg',
    cover: '/images/9.jpg',
    rating: 3,
    author: users[0],
    createdAt: '2021-01-30',
  },
  {
    id: 2,
    name: 'Tinolang manok',
    description:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa nulla nobis inventore eum ratione esse maiores! Sint non itaque doloribus!',
    ingredients: [
      '16kg Chicken',
      '1pc mineral water',
      '10pcs garlic',
      '4pk baby oil',
    ],
    instructions: [],
    tags: ['Tinola', 'Chicken'],
    image: '/images/7.jpg',
    cover: '/images/8.jpg',
    rating: 4,
    author: users[1],
    createdAt: '2021-01-30',
  },
];

export default recipes;
