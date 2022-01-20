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
    banner: '/images/8.jpg',
    avatar: '/images/9.jpg',
    author: users[0],
    createdAt: '2021-01-30',
    updatedAt: '2021-01-30',
    summary: {
      rating: 3,
      hearts: 1,
      reviews: 1,
    },
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
    instructions: [
      {
        id: 1,
        recipeId: 2,
        description: 'Slice onions, tomatoes, papaya, etc to tiny bits',
        video: '/videos/2.mp4',
        createdAt: '2021-01-31',
        updatedAt: '2021-01-31',
      },
      {
        id: 2,
        recipeId: 2,
        description: 'Boil water to 120deg heat',
        video: '/videos/1.mp4',
        createdAt: '2021-01-31',
        updatedAt: '2021-01-31',
      },
      {
        id: 3,
        recipeId: 2,
        description: 'Put the fire down',
        createdAt: '2021-01-31',
        updatedAt: '2021-01-31',
      },
    ],
    tags: ['Tinola', 'Chicken'],
    banner: '/images/7.jpg',
    avatar: '/images/8.jpg',
    author: users[1],
    createdAt: '2021-01-30',
    updatedAt: '2021-01-30',
    summary: {
      rating: 4,
      hearts: 1,
      reviews: 1,
    },
  },
];

export default recipes;
