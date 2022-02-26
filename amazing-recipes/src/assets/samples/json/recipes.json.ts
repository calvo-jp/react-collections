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
    banner: '/media/images/8.jpg',
    avatar: '/media/images/9.jpg',
    author: users[0],
    createdAt: '2021-10-25',
    updatedAt: '2021-10-28',
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
        image: null,
        video: '/media/videos/2.mp4',
        createdAt: '2021-01-31',
        updatedAt: '2021-01-31',
      },
      {
        id: 2,
        recipeId: 2,
        description: 'Boil water to 120deg heat',
        video: '/media/videos/1.mp4',
        image: null,
        createdAt: '2021-01-31',
        updatedAt: '2021-01-31',
      },
      {
        id: 3,
        recipeId: 2,
        image: null,
        video: null,
        description: 'Put the fire down',
        createdAt: '2021-01-31',
        updatedAt: '2021-01-31',
      },
    ],
    tags: ['Tinola', 'Chicken'],
    banner: '/media/images/7.jpg',
    avatar: '/media/images/8.jpg',
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
