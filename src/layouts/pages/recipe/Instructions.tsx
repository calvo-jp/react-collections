import PlusIcon from "@heroicons/react/outline/PlusIcon";
import * as React from "react";
import IInstruction from "types/instruction";
import Button from "widgets/Button";
import Instruction from "./Instruction";
import VideoPlayer from "./VideoPlayer";

interface InstructionsProps {
  items: IInstruction[];
}

const Instructions = ({ items }: InstructionsProps) => {
  const [currentItem, setCurrentItem] = React.useState(items.at(0));

  React.useEffect(() => {
    return () => {
      setCurrentItem(undefined);
    };
  }, []);

  // TODO: mobile ui

  return (
    <div>
      <div className="sm:hidden"></div>

      <div className="sm:flex sm:gap-3">
        <div className="hidden sm:block sm:w-2/3">
          <VideoPlayer data={currentItem} caption />
        </div>

        <div className="sm:w-1/3">
          <div className="flex flex-col gap-2">
            <div className="mb-1 sm:mb-0">
              <Button
                variant="outlined"
                color="primary"
                label="Add Instruction"
                icon={<PlusIcon className="h-4 w-4" />}
                size="sm"
                fullWidth
              />
            </div>

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
    </div>
  );
};

export default Instructions;
