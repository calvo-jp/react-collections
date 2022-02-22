import PlusIcon from '@heroicons/react/outline/PlusIcon';
import { v4 as uuid } from 'uuid';
import Todo from '../components/Todo';
import ITodo from '../types/todo';

const Landing = () => {
  return (
    <div className="min-h-screen w-full bg-slate-100 text-slate-700">
      <header className="p-8 pt-16 text-center text-5xl">
        <h1 className="">Todos</h1>
      </header>

      <main className="max-w-screen-md mx-auto p-4 sm:p-6 md:p-8">
        <section>
          <a href="/login.html" className="flex gap-1 items-center group">
            <PlusIcon className="h-4 w-4 stroke-blue-400 group-hover:stroke-blue-500" />

            <span className="font-medium text-blue-400 group-hover:text-blue-500">
              Create New
            </span>
          </a>
        </section>

        <section className="mt-4">
          <div id="todos" className="flex flex-col gap-2">
            {todos.map((todo) => (
              <Todo key={todo.id} data={todo} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

const todos: ITodo[] = [
  { id: uuid(), name: 'My first todo', createdAt: new Date(), complete: true },
  { id: uuid(), name: 'My second todo', createdAt: new Date() },
];

export default Landing;
