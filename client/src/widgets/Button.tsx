import clsx from 'clsx';
import * as React from 'react';

type BaseProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type Variant = 'primary' | 'secondary';

interface ButtonProps extends BaseProps {
  variant?: Variant;
  fullWidth?: boolean;
}

// TODO: add secondary
const Button: React.FC<ButtonProps> = ({
  variant,
  fullWidth,
  children,
  className,
  ...props
}) => {
  const disabled = props.disabled;
  const primary = variant === 'primary' && !disabled;
  const secondary = variant === 'secondary' && !disabled;

  return (
    <button
      className={clsx(
        'p-2 outline-none rounded-md flex items-center gap-1 justify-center',
        primary &&
          'text-white border border-blue-500 bg-blue-500 focus:ring-4 focus:ring-blue-200',
        secondary &&
          'text-white border border-red-500 bg-red-500 focus:ring-4 focus:ring-red-200',
        disabled && 'bg-gray-100 text-gray-400 cursor-not-allowed',
        fullWidth && 'block w-full',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
