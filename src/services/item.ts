import { v4 as uuid } from 'uuid';
import IItem from '../types/item';

const read = {
  async all(): Promise<IItem[]> {
    const response = await fetch('http://localhost:3001/items');
    return await response.json();
  },
  async one(id: string): Promise<IItem | null> {
    const response = await fetch('http://localhost:3001/items/' + id);
    if (!response.ok) return null;
    return await response.json();
  },
};

type CreateInput = Pick<IItem, 'amount' | 'description' | 'type'>;

const create = async (data: CreateInput): Promise<IItem> => {
  const item: IItem = {
    id: uuid(),
    createdAt: Date.now(),
    ...data,
  };

  const response = await fetch('http://localhost:3001/items', {
    method: 'POST',
    body: JSON.stringify(item),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return await response.json();
};

type UpdateInput = Partial<CreateInput>;

const update = async (id: string, data: UpdateInput): Promise<IItem | null> => {
  const response = await fetch('http://localhost:3001/items/' + id, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) return null;
  return await response.json();
};

const remove = async (id: string) => {
  const response = await fetch('http://localhost:3001/items/' + id, {
    method: 'DELETE',
  });

  if (!response.ok) throw new Error('Something went wrong.');
};

const todoService = {
  read,
  create,
  update,
  delete: remove,
};

export default todoService;
