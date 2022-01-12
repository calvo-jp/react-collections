import { Prisma, PrismaClient, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const client = new PrismaClient();

const selectables = Prisma.validator<Prisma.UserSelect>()({
  _count: {
    select: {
      recipes: true,
      reviews: true,
    },
  },
  id: true,
  name: true,
  email: true,
  avatar: true,
  createdAt: true,
  updatedAt: true,
});

type CreateUser = Pick<User, 'name' | 'email' | 'password'>;

class DuplicateEmailError extends Error {
  constructor(message?: string) {
    super(message);

    this.name = 'DuplicateEmailError';
  }
}

export const create = async ({ name, email, password }: CreateUser) => {
  const exists = await client.user.count({
    where: {
      email: {
        equals: email,
        mode: 'insensitive',
      },
    },
  });

  if (exists > 0) throw new DuplicateEmailError('Email already in use');

  const user = await client.user.create({
    data: {
      name,
      email,
      password: await bcrypt.hash(password, 8),
    },
    select: selectables,
  });

  return user;
};
