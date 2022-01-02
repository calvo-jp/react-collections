import clsx from 'clsx';
import * as React from 'react';
import StarIcon from './icons/Star';

type IconProps = Parameters<typeof StarIcon>[0];

// prettier-ignore
type SelectedIconProps = Pick<
  IconProps,
  | 'size' 
  | 'width' 
  | 'height' 
  | 'className'
>;

interface RatingProps {
  value?: number;
  onChange?: (value: number) => void;
}

const Rating: React.FC<RatingProps & SelectedIconProps> = ({
  size,
  width,
  height,
  value,
  onChange,
  className,
}) => {
  const currentValue = value || 0;

  const handleChange = (newValue: number) => {
    return function (e: React.MouseEvent<SVGSVGElement, MouseEvent>) {
      e.preventDefault();

      if (onChange) onChange(newValue);
    };
  };

  const numbers = [1, 2, 3, 4, 5];

  return (
    <div className={clsx('flex', className)}>
      {numbers.map((number) => (
        <StarIcon
          key={number}
          size={size}
          width={width}
          height={height}
          onClick={handleChange(number)}
          className={clsx(
            'cursor-pointer transition-colors duration-300',
            number > currentValue && 'fill-gray-300 hover:fill-amber-400',
            number <= currentValue && 'fill-amber-500 hover:fill-amber-400'
          )}
        />
      ))}
    </div>
  );
};

export default Rating;
