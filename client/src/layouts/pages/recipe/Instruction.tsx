import { DotsHorizontalIcon } from '@heroicons/react/outline';
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
      onClick={handleClick}
      className={clsx(
        'cursor-pointer border p-3 flex gap-4 items-center',
        !selected &&
          'border-gray-200 hover:border-gray-300 transition-colors duration-300',
        selected && 'border-green-400'
      )}
    >
      <div className="truncate flex-grow">
        <div className="text-sm truncate">{data.description}</div>
        <div className="text-[13px] text-gray-400">3 mins ago</div>
      </div>

      <button
        className="border border-transparent hover:border-gray-200 rounded-full p-0.5"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <DotsHorizontalIcon className="w-5 h-5" />
      </button>
    </a>
  );
};

export default Instruction;
