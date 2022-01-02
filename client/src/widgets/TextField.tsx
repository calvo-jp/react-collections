import clsx from 'clsx';
import * as React from 'react';

type BaseProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type TextFieldType =
  | 'date'
  | 'datetime'
  | 'email'
  | 'month'
  | 'number'
  | 'password'
  | 'search'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week';

interface TextFieldProps extends BaseProps {
  type?: TextFieldType;
  label?: string;
  error?: boolean;
  errorText?: string;
  fullWidth?: boolean;

  /** WARNING: Feature not implemented yet */
  multiline?: boolean;
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  error,
  errorText,
  fullWidth,
  multiline,
  className,
  ...props
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
    e.preventDefault();

    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <div
      className={clsx(
        'relative',
        fullWidth && 'block w-full',
        !fullWidth && 'inline-block'
      )}
    >
      <label
        htmlFor={props.id}
        onClick={handleClick}
        className={clsx(
          'absolute transition-all duration-100 cursor-text',
          !!props.value && 'text-gray-500 -top-2 left-2 bg-white px-1 text-sm',
          !props.value && 'text-gray-600 top-2 left-3'
        )}
      >
        {label}
      </label>

      <input
        ref={inputRef}
        className={clsx(
          'p-2 w-full border border-gray-300 rounded-md outline-none transition-all duration-300',
          // only add hover styles if no errors
          !error && 'hover:border-gray-400',
          !error && 'focus:ring-4 focus:ring-blue-200 focus:border-blue-400',
          error && 'focus:ring-4 focus:ring-red-200 border-red-400',
          className
        )}
        {...props}
      />

      {errorText && <ErrorText open={error}>{errorText}</ErrorText>}
    </div>
  );
};

interface ErrorTextProps {
  open?: boolean;
}

const ErrorText: React.FC<ErrorTextProps> = ({ open, children }) => {
  return (
    <div
      className={clsx(
        open && 'flex gap-1 items-center mt-1.5 ml-1.5 text-sm text-red-500',
        !open && 'hidden'
      )}
    >
      {children}
    </div>
  );
};

export default TextField;
