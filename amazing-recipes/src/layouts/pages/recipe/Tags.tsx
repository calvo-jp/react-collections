import PlusIcon from "@heroicons/react/outline/PlusSmIcon";
import * as React from "react";

interface TagsProps {
  items: string[];
  onChange?: (value: string[]) => void;
}

const Tags = (props: TagsProps) => {
  return (
    <ul className="flex flex-wrap items-center gap-1 text-sm">
      {props.items.map((tag) => (
        <li key={tag}>
          <Tag value={tag} />
        </li>
      ))}

      <li>
        <button className="flex items-center gap-1 p-2 text-blue-600 hover:text-blue-700 dark:text-sky-500 dark:hover:text-sky-400">
          <PlusIcon className="h-4 w-4" />
          <span>Add Tag</span>
        </button>
      </li>
    </ul>
  );
};

interface TagProps {
  value: string;
  onChange?: (value: string[]) => void;
}

const Tag = ({ value }: TagProps) => {
  return (
    <div
      className="relative bg-blue-100 p-2 focus:outline-dotted focus:outline-1 dark:bg-zinc-800 dark:text-zinc-100"
      contentEditable
      suppressContentEditableWarning
      spellCheck={false}
      onBlur={(e) => {
        console.log(e.target.textContent);
      }}
    >
      {value}
    </div>
  );
};

export default Tags;
