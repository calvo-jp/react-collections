import PlusIcon from '@heroicons/react/outline/PlusSmIcon';
import CloseIcon from '@heroicons/react/outline/XIcon';
import * as React from 'react';

interface TagsProps {
  items: string[];
  onChange?: (value: string[]) => void;
}

const Tags = (props: TagsProps) => {
  return (
    <ul className="flex flex-wrap gap-1 items-center">
      {props.items.map((item) => (
        <li key={item}>
          <Tag value={item} />
        </li>
      ))}

      <li>
        <button className="text-sm p-2 flex items-center gap-1 text-blue-600 hover:text-blue-700 ">
          <PlusIcon className="w-4 h-4" />
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
      className="text-sm p-2 bg-blue-100 outline-none relative"
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
