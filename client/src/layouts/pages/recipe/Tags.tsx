import PlusIcon from '@heroicons/react/outline/PlusIcon';

interface TagsProps {
  items: string[];
}

const Tags = (props: TagsProps) => {
  return (
    <ul className="flex flex-wrap gap-1 items-center">
      {props.items.map((item) => (
        <li key={item} className="text-sm p-2 bg-blue-100">
          {item}
        </li>
      ))}

      <li>
        <button className="text-sm p-2 flex items-center gap-1 text-blue-500 hover:text-blue-600 ">
          <PlusIcon className="w-4 h-4" />
          <span>Create Tag</span>
        </button>
      </li>
    </ul>
  );
};

export default Tags;
