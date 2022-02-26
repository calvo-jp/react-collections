import CheckIcon from "@heroicons/react/solid/CheckCircleIcon";
import CogIcon from "@heroicons/react/solid/CogIcon";
import ExclamationIcon from "@heroicons/react/solid/ExclamationCircleIcon";
import BellIcon from "@heroicons/react/solid/MailIcon";
import PencilAltIcon from "@heroicons/react/solid/PencilAltIcon";
import UserIcon from "@heroicons/react/solid/UserIcon";
import Layout from "layouts/Layout";
import Head from "next/head";
import * as React from "react";
import Button from "widgets/Button";

const Settings = () => {
  return (
    <Layout>
      <Head>
        <title>Settings</title>
      </Head>

      <div className="flex flex-col gap-4 bg-white p-4 shadow-md dark:bg-zinc-800">
        <GeneralSettings />
        <Subscriptions />
        <DangerZone />
      </div>
    </Layout>
  );
};

const DangerZone = () => {
  return (
    <div>
      <Heading label="Danger Zone" icon={ExclamationIcon} />

      <div className="p-4">
        <Button
          label="Delete Account"
          variant="outlined"
          color="secondary"
          size="sm"
        />
      </div>
    </div>
  );
};

const Subscriptions = () => {
  return (
    <div>
      <Heading label="Subscriptions" icon={BellIcon} />

      <ItemContentWrapper>
        <LabeledCheckbox label="Push" checked />
        <LabeledCheckbox label="SMS" />
        <LabeledCheckbox label="Emails" />
      </ItemContentWrapper>
    </div>
  );
};

const ItemContentWrapper: React.FC = ({ children }) => {
  return <div className="flex flex-col gap-2 p-4">{children}</div>;
};

interface LabeledCheckboxProps {
  label: string;
  checked?: boolean;
  onChange?: (value: boolean) => void;
}

const LabeledCheckbox = ({
  label,
  checked,
  onChange,
}: LabeledCheckboxProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleClick = () => inputRef.current?.click();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange?.(e.target.checked);

  return (
    <div className="flex items-center gap-2">
      <input
        ref={inputRef}
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        className="cursor-pointer checked:accent-green-700"
      />

      <label className="cursor-pointer" onClick={handleClick}>
        {label}
      </label>
    </div>
  );
};

const GeneralSettings = () => {
  return (
    <div>
      <Heading icon={UserIcon} label="General Settings" />

      <ItemContentWrapper>
        <GeneralSettingsItem label="Name" value="JP Calvo">
          <Button
            size="xs"
            color="primary"
            label="Change"
            icon={<PencilAltIcon className="h-3 w-3" />}
            compact
          />
        </GeneralSettingsItem>

        <GeneralSettingsItem
          label="Email"
          value={
            <div className="flex items-center gap-2">
              <div>calvojp92@gmail.com</div>
              <CheckIcon className="h-4 w-4 fill-green-600 dark:fill-green-700" />
            </div>
          }
        >
          <Button
            size="xs"
            color="primary"
            label="Change"
            icon={<PencilAltIcon className="h-3 w-3" />}
            compact
          />
          <Button
            size="xs"
            color="primary"
            label="Verify"
            icon={<CogIcon className="h-3 w-3" />}
            compact
          />
        </GeneralSettingsItem>

        <GeneralSettingsItem label="Password" value="********">
          <Button
            size="xs"
            color="primary"
            label="Change"
            icon={<PencilAltIcon className="h-3 w-3" />}
            compact
          />
        </GeneralSettingsItem>
      </ItemContentWrapper>
    </div>
  );
};

interface GeneralSettingsItemProps {
  label: string;
  value: any;
}

const GeneralSettingsItem: React.FC<GeneralSettingsItemProps> = ({
  label,
  value,
  children,
}) => {
  return (
    <div>
      <small className="text-sm text-gray-500 dark:text-zinc-500">
        {label}
      </small>
      <div>{value}</div>
      <div className="flex gap-2">{children}</div>
    </div>
  );
};

const Heading = ({ icon: SVGIcon, label }: IconedLabel) => {
  return (
    <div className="flex items-center gap-1">
      <SVGIcon className="h-4 w-4" />
      <h4 className="text-sm text-gray-600 dark:text-zinc-300">{label}</h4>
    </div>
  );
};

/** typeof label with icon */
interface IconedLabel {
  icon: (props: React.ComponentProps<"svg">) => JSX.Element;
  label: string;
}

export default Settings;
