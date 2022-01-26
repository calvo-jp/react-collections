import PlusIcon from '@heroicons/react/outline/PlusIcon';

interface IngredientsProps {
  items: string[];
}

const Ingredients = (props: IngredientsProps) => {
  return (
    <div>
      <ul className="list-disc pl-4">
        {props.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <button className="text-sm flex items-center gap-1 text-blue-600 mt-2">
        <PlusIcon className="w-4 h-4" />
        <span>Add Ingredient</span>
      </button>
    </div>
  );
};

export default Ingredients;
