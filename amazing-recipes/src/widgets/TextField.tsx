import ExclamationIcon from "@heroicons/react/solid/ExclamationCircleIcon";
import clsx from "clsx";
import * as React from "react";

type BaseProps = Omit<React.ComponentProps<"input">, "placeholder">;

type TextFieldType =
  | "date"
  | "datetime"
  | "email"
  | "month"
  | "number"
  | "password"
  | "search"
  | "tel"
  | "text"
  | "time"
  | "url"
  | "week";

interface TextFieldProps extends BaseProps {
  type?: TextFieldType;
  label?: string;
  error?: boolean;
  /** Message to show when error is true */
  helperText?: string;
  fullWidth?: boolean;
  /** WARNING: Feature not implemented yet */
  multiline?: boolean;
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  error,
  helperText,
  fullWidth,
  multiline,
  className,
  onChange,
  ...props
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  // whether input has a value
  const [empty, setEmpty] = React.useState(!props.value);

  // focus textfield whenever label is click
  const handleClick = (e: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
    e.preventDefault();
    inputRef.current?.focus();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmpty(e.target.value.length === 0);
    onChange?.(e);
  };

  React.useEffect(() => {
    setEmpty(!props.value);
    return () => setEmpty(true);
  }, [props.value]);

  return (
    <div
      className={clsx(
        "relative",
        fullWidth && "block w-full",
        !fullWidth && "inline-block",
        className
      )}
    >
      <label
        htmlFor={props.id}
        onClick={handleClick}
        className={clsx(
          "absolute cursor-text transition-all duration-100",
          !empty &&
            "-top-2 left-2 bg-white px-1 text-sm text-gray-500 dark:bg-zinc-900 dark:text-zinc-500",
          empty && "top-2 left-3 text-gray-600 dark:text-zinc-400"
        )}
      >
        {label}
      </label>

      <input
        ref={inputRef}
        className={clsx(
          "w-full rounded-md border bg-transparent p-2 outline-none transition-all duration-300",
          !error &&
            "border-gray-300 hover:border-gray-400 dark:border-zinc-700 dark:hover:border-zinc-600",
          !error &&
            "focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:border-sky-900 dark:focus:ring-sky-900 dark:focus:ring-opacity-20",
          error &&
            "border-red-400 focus:ring-2 focus:ring-red-200 dark:border-red-800 dark:focus:ring-red-600 dark:focus:ring-opacity-20"
        )}
        onChange={handleChange}
        {...props}
      />

      {!!helperText && error && (
        <div className="mt-1 flex items-center gap-1">
          <ExclamationIcon className="block h-4 w-4 fill-red-400" />
          <span className="text-sm text-red-500 dark:text-red-400">
            {helperText}
          </span>
        </div>
      )}
    </div>
  );
};

export default TextField;
