import PlusIcon from '@heroicons/react/outline/PlusIcon';
import XIcon from '@heroicons/react/outline/XIcon';
import { Fragment, useEffect, useState } from 'react';
import Todo from '../components/Todo';
import service from '../services';
import ITodo from '../types/todo';

const Landing = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-slate-100 text-slate-700">
      <header className="p-8 pt-16 text-center text-5xl">
        <h1 className="">Todos</h1>
      </header>

      <main className="max-w-screen-md mx-auto p-4 sm:p-6 md:p-8">
        <section>
          <button
            className="flex gap-1 items-center group"
            onClick={() => setOpen(true)}
          >
            <PlusIcon className="h-4 w-4 stroke-blue-400 group-hover:stroke-blue-500" />

            <span className="font-medium text-blue-400 group-hover:text-blue-500">
              Create New
            </span>
          </button>
        </section>

        <section className="mt-4">
          <TodoList />
        </section>
      </main>

      <CreatePopup open={open} onClose={() => setOpen((value) => !value)} />
    </div>
  );
};

interface CreatePopupProps {
  open?: boolean;
  onClose?: () => void;
}

const CreatePopup = ({ open, onClose }: CreatePopupProps) => {
  if (!open) return <Fragment />;

  return (
    <div className="fixed w-full h-full left-0 top-0 bg-black bg-opacity-75 flex items-center justify-center">
      <button className="absolute right-4 top-4 group" onClick={onClose}>
        <XIcon className="w-8 h-8 stroke-gray-300 opacity-30 group-hover:opacity-60 transition-opacity duration-300" />
      </button>

      <div className="w-full h-full bg-white md:w-[600px] md:h-[400px] md:rounded-lg shadow-md"></div>
    </div>
  );
};

const TodoList = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    service.todo.read
      .all()
      .then(setTodos)
      .catch((exception) => {
        if (import.meta.env.DEV) console.error(exception);
      })
      .finally(() => setPending(false));
  }, []);

  return (
    <div id="todos" className="flex flex-col gap-2">
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          data={todo}
          onUpdate={(data) => {
            service.todo.update(todo.id, data);
          }}
          onDelete={() => {
            service.todo.delete(todo.id);
          }}
        />
      ))}
    </div>
  );
};

export default Landing;
