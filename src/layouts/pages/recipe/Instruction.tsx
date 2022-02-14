import DotsHorizontalIcon from '@heroicons/react/outline/DotsVerticalIcon';
import clsx from 'clsx';
import IInstruction from 'types/instruction';
import VideoPlayer from './VideoPlayer';

type InstructionProps = IInstruction & {
  selected?: boolean;
  onClick?: (data: IInstruction) => void;
};

const Instruction = ({ onClick, selected, ...data }: InstructionProps) => {
  const handleClick = () => {
    if (onClick) return onClick(data);
  };

  return (
    <div>
      <div className="sm:hidden">
        <VideoPlayer data={data} caption={false} />
      </div>

      <div
        key={data.id}
        tabIndex={0}
        onClick={handleClick}
        className={clsx(
          'cursor-pointer sm:border py-3 sm:px-3 flex gap-4 items-center group outline-none sm:focus:ring-2 transition-colors duration-300',
          !selected &&
            'border-gray-200 hover:border-gray-300 focus:border-blue-400 focus:ring-blue-200 dark:border-zinc-800 dark:hover:border-zinc-700 dark:focus:ring-sky-900 dark:focus:ring-opacity-20 dark:focus:border-sky-900',
          selected &&
            'border-green-400 focus:ring-green-100 dark:border-green-900 dark:focus:ring-green-900 dark:focus:ring-opacity-20'
        )}
      >
        <div className="truncate flex-grow">
          <div className="text-sm truncate">{data.description}</div>
          <div className="text-[13px] text-gray-400">3 mins ago</div>
        </div>

        <button
          tabIndex={-1}
          className="border border-transparent hover:border-gray-200 rounded-full p-0.5 block sm:hidden sm:group-hover:block"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <DotsHorizontalIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Instruction;
