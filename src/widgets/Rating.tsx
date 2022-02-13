import StarIcon from '@heroicons/react/solid/StarIcon';
import clsx from 'clsx';
import * as React from 'react';

type Size = 'sm' | 'md' | 'lg' | 'xl' | 'lg';

interface RatingProps {
  size?: Size;
  value?: number;
  /** onChange won't work if this is set to true */
  readonly?: boolean;
  onChange?: (value: number) => void;
}

const Rating: React.FC<RatingProps> = ({
  size = 'md',
  value,
  readonly,
  onChange,
}) => {
  const currentValue = value || 0;

  const handleChange = (newValue: number) => {
    return function () {
      if (!readonly && onChange) onChange(newValue);
    };
  };

  const numbers = new Array(5).fill(1).map((one, index) => index + one);

  return (
    <div className="flex w-fit -mx-0.5">
      {numbers.map((number) => (
        <StarIcon
          key={number}
          onClick={handleChange(number)}
          className={clsx(
            'transition-colors duration-300',
            size === 'sm' && 'w-4 h-4',
            size === 'md' && 'w-5 h-5',
            size === 'lg' && 'w-7 h-7',
            size === 'xl' && 'w-9 h-9',
            number > currentValue ? 'fill-gray-300' : 'fill-amber-500',
            !readonly && 'cursor-pointer hover:fill-amber-400'
          )}
        />
      ))}
    </div>
  );
};

export default Rating;
