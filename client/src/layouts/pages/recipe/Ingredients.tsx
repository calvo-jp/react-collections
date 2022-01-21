interface IngredientsProps {
  items: string[];
}

const Ingredients = (props: IngredientsProps) => {
  return (
    <ul className="list-disc pl-4">
      {props.items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
};

export default Ingredients;
