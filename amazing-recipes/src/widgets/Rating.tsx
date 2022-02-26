import StarIcon from "@heroicons/react/solid/StarIcon";
import clsx from "clsx";
import * as React from "react";

type Size = "sm" | "md" | "lg" | "xl" | "lg";

interface RatingProps {
  size?: Size;
  value?: number;
  /** onChange won't work if this is set to true */
  readonly?: boolean;
  onChange?: (value: number) => void;
}

const Rating: React.FC<RatingProps> = ({
  size = "md",
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
    <div className="-mx-0.5 flex w-fit">
      {numbers.map((number) => (
        <StarIcon
          key={number}
          onClick={handleChange(number)}
          className={clsx(
            "transition-colors duration-300",
            size === "sm" && "h-4 w-4",
            size === "md" && "h-5 w-5",
            size === "lg" && "h-7 w-7",
            size === "xl" && "h-9 w-9",
            number > currentValue ? "fill-gray-300" : "fill-amber-500",
            !readonly && "cursor-pointer hover:fill-amber-400"
          )}
        />
      ))}
    </div>
  );
};

export default Rating;
