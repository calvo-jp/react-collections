import CogIcon from '@heroicons/react/solid/CogIcon';
import ExclamationCircleIcon from '@heroicons/react/solid/ExclamationCircleIcon';
import PencilAltIcon from '@heroicons/react/solid/PencilAltIcon';
import * as React from 'react';
import Button from 'widgets/Button';

const Settings = () => {
  return (
    <div className="flex flex-col gap-4">
      <Item icon={CogIcon} label="General Settings">
        <div>
          <div className="text-sm text-gray-500">Name</div>
          <div>Tinolang Manok</div>
          <div className="text-blue-500">
            <a href="" className="flex items-center gap-1">
              <PencilAltIcon className="w-3 h-3" />
              <span className="text-[13px]">Change</span>
            </a>
          </div>
        </div>

        <div className="mt-3 truncate">
          <div className="text-sm text-gray-500">Description</div>
          <div className="truncate">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa
            nulla nobis inventore eum ratione esse maiores! Sint non itaque
            doloribus!
          </div>
          <div className="text-blue-500">
            <a href="" className="flex items-center gap-1">
              <PencilAltIcon className="w-3 h-3" />
              <span className="text-[13px]">Change</span>
            </a>
          </div>
        </div>
      </Item>

      <Item icon={ExclamationCircleIcon} label="Danger Zone">
        <Button
          variant="outlined"
          size="sm"
          color="secondary"
          label="Delete Recipe"
        />
      </Item>
    </div>
  );
};

interface ItemProps {
  label: any;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
}

const Item: React.FC<ItemProps> = ({ icon: SVGIcon, label, children }) => {
  return (
    <div>
      <div className="flex items-center gap-1">
        <SVGIcon className="w-4 h-4" />
        <div className="text-sm">{label}</div>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
};

export default Settings;
