import DotsHorizontalIcon from '@heroicons/react/outline/DotsVerticalIcon';
import clsx from 'clsx';
import IInstruction from 'types/instruction';

type InstructionProps = IInstruction & {
  selected?: boolean;
  onClick?: (data: IInstruction) => void;
};

const Instruction = ({ onClick, selected, ...data }: InstructionProps) => {
  const handleClick = () => {
    if (onClick) return onClick(data);
  };

  return (
    <a
      key={data.id}
      tabIndex={0}
      onClick={handleClick}
      className={clsx(
        'cursor-pointer border p-3 flex gap-4 items-center group outline-none focus:ring-2 transition-colors duration-300',
        !selected &&
          'border-gray-200 hover:border-gray-300 focus:border-blue-400 focus:ring-blue-200',
        selected && 'border-green-400 focus:ring-green-100'
      )}
    >
      <div className="truncate flex-grow">
        <div className="text-sm truncate">{data.description}</div>
        <div className="text-[13px] text-gray-400">3 mins ago</div>
      </div>

      <button
        className="border border-transparent hover:border-gray-200 rounded-full p-0.5 hidden group-hover:block"
        onClick={(e) => {
          e.stopPropagation();
        }}
        tabIndex={-1}
      >
        <DotsHorizontalIcon className="w-5 h-5" />
      </button>
    </a>
  );
};

export default Instruction;
