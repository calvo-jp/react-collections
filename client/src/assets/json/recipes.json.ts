import IRecipe from 'types/recipe';

const items: IRecipe[] = [
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
    rating: 3,
    author: {
      id: 1,
      name: 'JP Calvo',
      email: 'calvojp92@gmail.com',
      avatar: '',
      createdAt: '2021-01-15',
      totalRecipes: 4,
      totalFavorites: 0,
      totalReviews: 0,
    },
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
    image: '/images/9.jpg',
    rating: 4,
    author: {
      id: 1,
      name: 'JP Calvo',
      email: 'calvojp92@gmail.com',
      avatar: '',
      createdAt: '2021-01-15',
      totalRecipes: 2,
      totalFavorites: 0,
      totalReviews: 0,
    },
    createdAt: '2021-01-30',
  },
];

export default items;
