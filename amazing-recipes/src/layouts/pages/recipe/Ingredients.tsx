import PlusIcon from "@heroicons/react/outline/PlusSmIcon";

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

      <button className="mt-2 flex items-center gap-1 text-sm text-blue-600 dark:text-sky-500 dark:hover:text-sky-400">
        <PlusIcon className="h-4 w-4" />
        <span>Add Ingredient</span>
      </button>
    </div>
  );
};

export default Ingredients;
