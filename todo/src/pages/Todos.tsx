import ArrowRightIcon from '@heroicons/react/outline/ArrowRightIcon';
import ClockIcon from '@heroicons/react/outline/ClockIcon';
import PlusIcon from '@heroicons/react/outline/PlusIcon';
import XIcon from '@heroicons/react/outline/XIcon';
import clsx from 'clsx';
import React, { Fragment, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import Header from '../components/Header';
import Todo from '../components/Todo';
import service from '../services';
import ITodo from '../types/todo';
import dateFormatter from '../utils/dateFormatter';

// TODO: add loader when pending
const Todos = () => {
  const [open, setOpen] = useState(false);
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
    <div className="min-h-screen w-full bg-slate-100 text-slate-700 font-sans font-400">
      <Header />

      <main className="max-w-screen-md mx-auto p-4 sm:p-6 md:p-8">
        <section>
          <button
            className="flex gap-1 items-center group gradient-text"
            onClick={() => setOpen(true)}
          >
            <PlusIcon className="h-4 w-4 stroke-blue-400" />

            <span className="">Create New</span>
          </button>
        </section>

        <section className="mt-4">
          <TodoList
            items={todos}
            onUpdate={(todo) => {
              setTodos((array) =>
                array.map((t) => (t.id === todo.id ? todo : t))
              );
            }}
            onDelete={(todo) => {
              setTodos((array) => array.filter((i) => i.id !== todo.id));
            }}
          />
        </section>
      </main>

      {!!open && (
        <CreateTodoForm
          onClose={() => setOpen((value) => !value)}
          onCreate={(todo) => {
            setTodos((array) => [todo, ...array]);
            setOpen(false);
          }}
        />
      )}
    </div>
  );
};

interface CreatePopupProps {
  onCreate: (todo: ITodo) => void;
  onClose?: () => void;
}

const CreateTodoForm = ({ onClose, onCreate }: CreatePopupProps) => {
  const [error, setError] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    return () => {
      setName('');
      setError(false);
    };
  }, []);

  return (
    <div className="fixed w-full h-full left-0 top-0 bg-black bg-opacity-75 flex items-center justify-center">
      <button className="absolute right-4 top-4 group" onClick={onClose}>
        <XIcon className="w-8 h-8 stroke-gray-300 opacity-30 group-hover:opacity-60 transition-opacity duration-300" />
      </button>

      <div className="w-full h-full bg-white md:w-[600px] md:h-[400px] md:rounded-lg shadow-md flex items-center">
        <div className="w-[80%] mx-auto">
          <Timestamp />

          <form
            className="flex gap-1 items-center mt-1"
            noValidate
            onSubmit={(e) => {
              e.preventDefault();

              if (name.length < 3) return setError(true);

              service.todo
                .create(name)
                .then(onCreate)
                .catch((exception) => {
                  if (import.meta.env.DEV) console.error(exception);
                });
            }}
          >
            <input
              className={clsx(
                'border rounded-md w-full p-1.5 outline-none transition-all duration-300 placeholder:text-gray-500',
                error && 'border-red-400 focus:ring-2 focus:ring-red-100',
                !error &&
                  'border-gray-300 hover:border-gray-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-100 '
              )}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoFocus
              placeholder="eg. Buy milk"
            />

            <button
              type="submit"
              className="p-2 rounded-full outline-none group"
            >
              <ArrowRightIcon className="w-4 h-4 stroke-gray-400 group-hover:stroke-gray-500 group-focus:stroke-sky-500 transition-all duration-300" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const Timestamp = () => {
  const [date, setDate] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => {
      setDate(Date.now());
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return (
    <div className="text-gray-500 text-sm flex items-center gap-1">
      <ClockIcon className="w-4 h-4" />

      <span>{dateFormatter.format(date)}</span>
    </div>
  );
};

interface TodoListProps {
  items: ITodo[];
  onUpdate: (todo: ITodo) => void;
  onDelete: (todo: ITodo) => void;
}

const TodoList = ({ items, onUpdate, onDelete }: TodoListProps) => {
  return (
    <div className="flex flex-col gap-2">
      {items.length === 0 && <EmptyTodo />}

      {items.map((todo) => (
        <Todo
          key={todo.id}
          data={todo}
          onUpdate={(data) => {
            service.todo
              .update(todo.id, data)
              .then(onUpdate)
              .catch((exception) => {
                if (import.meta.env.DEV) console.error(exception);
              });
          }}
          onDelete={() => {
            service.todo
              .delete(todo.id)
              .then(() => onDelete(todo))
              .catch((exception) => {
                if (import.meta.env.DEV) console.error(exception);
              });
          }}
        />
      ))}
    </div>
  );
};

const EmptyTodo = () => {
  return (
    <Todo
      readonly
      data={{
        id: uuid(),
        name: 'Create first todo',
        createdAt: Date.now(),
      }}
    />
  );
};

export default Todos;
