import ChevronLeftIcon from '@heroicons/react/solid/ChevronLeftIcon';
import ChevronRightIcon from '@heroicons/react/solid/ChevronRightIcon';
import * as React from 'react';
import IInstruction from 'types/instruction';
import Instruction from './Instruction';
import VideoPlayer from './VideoPlayer';

interface InstructionsProps {
  items: IInstruction[];
}

const Instructions = ({ items }: InstructionsProps) => {
  const [currentItem, setCurrentItem] = React.useState(items.at(0));
  const [playing, setPlaying] = React.useState(false);

  React.useEffect(() => {
    return () => {
      setCurrentItem(undefined);
      setPlaying(false);
    };
  }, []);

  return (
    <div className="flex gap-2">
      <div className="w-2/3">
        <VideoPlayer data={currentItem} />
      </div>

      <div className="w-1/3">
        <div className="flex flex-col gap-2">
          {items.map((item) => {
            const selected = !!currentItem && currentItem.id === item.id;

            return (
              <Instruction
                key={item.id}
                selected={selected}
                onClick={setCurrentItem}
                {...item}
              />
            );
          })}
        </div>

        {items.length > 5 && (
          <div className="mt-3 flex items-center justify-end gap-2">
            <button>
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <span className="text-sm">Page 3 of 4</span>
            <button>
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Instructions;
