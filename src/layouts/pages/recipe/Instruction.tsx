import DotsHorizontalIcon from "@heroicons/react/outline/DotsVerticalIcon";
import clsx from "clsx";
import IInstruction from "types/instruction";
import VideoPlayer from "./VideoPlayer";

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
          "group flex cursor-pointer items-center gap-4 py-3 outline-none transition-colors duration-300 sm:border sm:px-3 sm:focus:ring-2",
          !selected &&
            "border-gray-200 hover:border-gray-300 focus:border-blue-400 focus:ring-blue-200 dark:border-zinc-800 dark:hover:border-zinc-700 dark:focus:border-sky-900 dark:focus:ring-sky-900 dark:focus:ring-opacity-20",
          selected &&
            "border-green-400 focus:ring-green-100 dark:border-green-900 dark:focus:ring-green-900 dark:focus:ring-opacity-20"
        )}
      >
        <div className="flex-grow truncate">
          <div className="truncate text-sm">{data.description}</div>
          <div className="text-[13px] text-gray-400 dark:text-zinc-400">
            3 mins ago
          </div>
        </div>

        <button
          tabIndex={-1}
          className="block rounded-full border border-transparent p-0.5 hover:border-gray-200 dark:hover:border-zinc-800 sm:hidden sm:group-hover:block"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <DotsHorizontalIcon className="h-5 w-5 dark:stroke-zinc-500" />
        </button>
      </div>
    </div>
  );
};

export default Instruction;
