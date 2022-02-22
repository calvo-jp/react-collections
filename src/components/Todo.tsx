import CheckIcon from '@heroicons/react/outline/CheckIcon';
import ClockIcon from '@heroicons/react/outline/ClockIcon';
import XIcon from '@heroicons/react/outline/XIcon';
import clsx from 'clsx';
import ITodo from '../types/todo';
import dateFormatter from '../utils/dateFormatter';

type UpdateInput = Partial<Pick<ITodo, 'name' | 'complete'>>;

interface TodoProps {
  data: ITodo;
  onDelete: () => void;
  onUpdate: (data: UpdateInput) => void;
}

const Todo = ({ data, onUpdate, onDelete }: TodoProps) => {
  return (
    <div className="p-4 flex justify-between items-center shadow-md gap-4 bg-white rounded-md">
      <button
        onClick={() => {
          onUpdate({
            complete: !data.complete,
          });
        }}
      >
        <CheckIcon
          className={clsx(
            'h-6 w-6 transition-colors duration-300',
            data.complete && 'stroke-green-400',
            !data.complete && 'stroke-gray-300 hover:stroke-green-400'
          )}
        />
      </button>

      <div className="grow">
        <p
          contentEditable
          suppressContentEditableWarning
          spellCheck={false}
          className="outline-none"
          onBlur={(e) => {
            const value = e.target.textContent;

            if (value && value !== data.name) onUpdate({ name: value });
          }}
        >
          {data.name}
        </p>

        <div className="flex items-center gap-1">
          <ClockIcon className="h-4 w-4 stroke-slate-400" />
          <p className="text-xs text-gray-400">
            {dateFormatter.format(data.createdAt)}
          </p>
        </div>
      </div>

      <button onClick={onDelete}>
        <XIcon className="h-6 w-6 text-gray-300 hover:text-red-400 transition-colors duration-300" />
      </button>
    </div>
  );
};

export default Todo;
