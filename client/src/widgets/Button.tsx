import clsx from 'clsx';
import * as React from 'react';

type Variant = 'primary' | 'secondary';

interface ButtonProps {
  variant?: Variant;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps & React.ComponentProps<'button'>> = ({
  variant,
  fullWidth,
  children,
  className,
  ...props
}) => {
  const disabled = props.disabled;
  const primary = variant === 'primary' && !disabled;
  const secondary = variant === 'secondary' && !disabled;
  const colored = variant && !disabled;

  return (
    <button
      className={clsx(
        'p-2 outline-none rounded-md flex items-center gap-1 justify-center',
        colored && 'text-white border focus:ring-4',
        primary && 'border-blue-500 bg-blue-500 focus:ring-blue-200',
        secondary && 'border-red-500 bg-red-500 focus:ring-red-200',
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
