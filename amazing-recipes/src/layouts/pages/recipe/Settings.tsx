import ExclamationCircleIcon from "@heroicons/react/solid/ExclamationCircleIcon";
import * as React from "react";
import Button from "widgets/Button";

const Settings = () => {
  return (
    <div className="flex flex-col gap-4">
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
  icon: (props: React.ComponentProps<"svg">) => JSX.Element;
}

const Item: React.FC<ItemProps> = ({ icon: SVGIcon, label, children }) => {
  return (
    <div>
      <div className="flex items-center gap-1">
        <SVGIcon className="h-4 w-4" />
        <div className="text-sm">{label}</div>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
};

export default Settings;
