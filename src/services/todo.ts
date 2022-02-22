import { v4 as uuid } from 'uuid';
import ITodo from '../types/todo';

const read = {
  async all(): Promise<ITodo[]> {
    const response = await fetch('http://localhost:3001/todos');
    return await response.json();
  },
  async one(id: string): Promise<ITodo | null> {
    try {
      const response = await fetch('http://localhost:3001/todos/' + id);
      return await response.json();
    } catch (exception) {
      if (import.meta.env.DEV) console.error(exception);

      return null;
    }
  },
};

const create = async (name: string): Promise<ITodo> => {
  const id = uuid();
  const createdAt = Date.now();

  const response = await fetch('http://localhost:3001/todos', {
    method: 'POST',
    body: JSON.stringify({
      id,
      name,
      createdAt,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const todo = await response.json();
  return todo;
};

type UpdateInput = Partial<Pick<ITodo, 'name' | 'complete'>>;

const update = async (id: string, data: UpdateInput) => {
  const response = await fetch('http://localhost:3001/todos/' + id, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const todo = await response.json();
  return todo;
};

const remove = async (id: string) => {
  await fetch('http://localhost:3001/todos/' + id, {
    method: 'DELETE',
  });
};

const todoService = {
  read,
  create,
  update,
  delete: remove,
};

export default todoService;
