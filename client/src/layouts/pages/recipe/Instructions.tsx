import PlusIcon from '@heroicons/react/outline/PlusIcon';
import * as React from 'react';
import IInstruction from 'types/instruction';
import Button from 'widgets/Button';
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
          <Button
            variant="outlined"
            color="primary"
            label="Add Instruction"
            icon={<PlusIcon className="w-4 h-4" />}
            size="sm"
          />

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
      </div>
    </div>
  );
};

export default Instructions;
