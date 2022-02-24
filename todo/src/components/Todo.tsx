import CheckIcon from '@heroicons/react/outline/CheckIcon';
import ClockIcon from '@heroicons/react/outline/ClockIcon';
import XIcon from '@heroicons/react/outline/XIcon';
import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import ITodo from '../types/todo';
import dateFormatter from '../utils/dateFormatter';

type UpdateInput = Partial<Pick<ITodo, 'name' | 'complete'>>;

interface TodoProps {
  data: ITodo;
  readonly?: boolean;
  onDelete?: () => void;
  onUpdate?: (data: UpdateInput) => void;
}

const Todo = ({
  data,
  readonly,
  onUpdate = noop,
  onDelete = noop,
}: TodoProps) => {
  const inputRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const input = inputRef.current;

    if (!!input) {
      input.addEventListener('blur', () => {
        const value = input.textContent;

        if (value && value !== data.name) onUpdate({ name: value });
      });

      input.addEventListener('keydown', (e) => {
        const code = e.code.toUpperCase();

        switch (code) {
          case 'ESCAPE':
            input.textContent = data.name;
            input.blur();
            break;
          case 'ENTER':
          case 'NUMPADENTER':
            input.blur();
          default:
            break;
        }
      });
    }
  }, []);

  return (
    <div className="p-4 flex justify-between items-center shadow-md gap-4 bg-white rounded-md">
      <button
        disabled={readonly}
        onClick={() => {
          onUpdate({
            complete: !data.complete,
          });
        }}
      >
        <CheckIcon
          className={clsx(
            'h-6 w-6 transition-colors duration-300',
            readonly && 'text-gray-200 cursor-not-allowed',
            !readonly && data.complete && 'stroke-green-400',
            !readonly &&
              !data.complete &&
              'stroke-gray-300 hover:stroke-green-400'
          )}
        />
      </button>

      <div className="grow">
        <p
          ref={inputRef}
          contentEditable={!readonly}
          suppressContentEditableWarning
          spellCheck={false}
          className="outline-none"
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

      <button onClick={onDelete} disabled={readonly}>
        <XIcon
          className={clsx(
            'h-6 w-6',
            readonly && 'stroke-gray-200 cursor-not-allowed',
            !readonly &&
              'stroke-gray-300 hover:stroke-red-400 transition-colors duration-300'
          )}
        />
      </button>
    </div>
  );
};

function noop() {}

export default Todo;
