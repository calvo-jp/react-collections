interface TagsProps {
  items: string[];
}

const Tags = (props: TagsProps) => {
  return (
    <ul className="flex flex-wrap gap-1">
      {props.items.map((item) => (
        <li key={item} className="text-sm p-2 bg-blue-100">
          {item}
        </li>
      ))}
    </ul>
  );
};

export default Tags;
