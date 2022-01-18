import IUser from 'types/user';

const users: IUser[] = [
  {
    id: 1,
    name: 'JP Calvo',
    email: 'calvojp92@gmail.com',
    avatar: '',
    summary: {
      favorites: 26,
      recipes: 103,
      reviews: 32,
    },
    emailVerified: false,
    createdAt: '2020-01-10 13:00',
    updatedAt: '2020-01-10 13:00',
  },
  {
    id: 2,
    name: 'Mary Williams',
    email: 'marywilliams@yahoo.com',
    avatar: '',
    summary: {
      favorites: 89,
      recipes: 21,
      reviews: 44,
    },
    emailVerified: false,
    createdAt: '2021-04-10 13:00',
    updatedAt: '2021-04-10 13:00',
  },
];

export default users;
