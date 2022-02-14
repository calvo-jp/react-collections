import StarIcon from '@heroicons/react/solid/StarIcon';
import clsx from 'clsx';

const Summary = () => {
  return (
    <div className="w-fit bg-gradient-to-r from-orange-400 to-yellow-500 p-4 shadow-md text-center dark:from-orange-600 dark:to-yellow-700">
      <div className="text-white">Average Rating</div>

      <Rating value={1} />
    </div>
  );
};

interface RatingProps {
  value?: number;
  onChange?: (value: number) => void;
}

const Rating = (props: RatingProps) => {
  const { value = 0, onChange = function () {} } = props;

  return (
    <div className="flex mt-1.5">
      {Array(5)
        .fill(null)
        .map((_, idx) => idx)
        .map((n) => (
          <StarIcon
            key={n}
            onClick={() => onChange(n)}
            className={clsx(
              'w-8 h-8 cursor-pointer',
              n < value ? 'text-white' : 'text-amber-600'
            )}
          />
        ))}
    </div>
  );
};

export default Summary;
