import clsx from 'clsx';
import * as React from 'react';

// prettier-ignore
type Color =
  | 'primary'
  | 'secondary';

// prettier-ignore
type Variant =
  | 'outlined'
  | 'contained';

// prettier-ignore
type Size = 
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl";

type BaseProps = Omit<
  React.ComponentProps<'button'>,
  'className' | 'style' | 'children'
>;

interface ButtonProps extends BaseProps {
  /** NOTICE: This does not automatically set the icon size */
  size?: Size;
  icon?: any;
  label?: string;
  color?: Color;
  variant?: Variant;
  fullWidth?: boolean;
  /** removes padding */
  compact?: boolean;
  /** WARNING: Not implemented yet */
  loading?: boolean;
}

const Button = (props: ButtonProps) => {
  const {
    icon,
    size = 'md',
    label,
    color,
    variant,
    loading,
    compact,
    fullWidth,
    disabled,
    ...all
  } = props;

  const primary = !disabled && color === 'primary';
  const secondary = !disabled && color === 'secondary';
  const contained = !disabled && variant === 'contained';
  const outlined = !disabled && variant === 'outlined';

  return (
    <button
      disabled={disabled}
      className={clsx(
        'outline-none rounded-md transition-all duration-300',
        // align for button with icon
        'flex items-center gap-1 justify-center',
        // padding for non-compact
        !compact && 'p-2',
        // size
        size === 'xs' && 'text-[13px]',
        size === 'sm' && 'text-sm',
        size === 'md' && 'text-md',
        size === 'lg' && 'text-lg',
        size === 'xl' && 'text-xl',
        // with variant
        variant && 'focus:ring-4',
        // contained
        contained && 'text-white',
        contained &&
          primary &&
          'border-blue-500 bg-blue-500 focus:ring-blue-200',
        contained &&
          secondary &&
          'border-red-500 bg-red-500 focus:ring-red-200',
        // outlined
        outlined && 'border',
        outlined &&
          primary &&
          'border-blue-400 text-blue-500 focus:ring-blue-200',
        outlined &&
          secondary &&
          'border-red-400 text-red-500 focus:ring-red-200',
        // color without variant
        !variant && primary && 'text-blue-500',
        !variant && secondary && 'text-red-500',
        // disabled
        disabled && 'bg-gray-100 text-gray-400 cursor-not-allowed',
        // full width
        fullWidth && 'block w-full'
      )}
      {...all}
    >
      <div>{icon}</div>
      <div>{label}</div>
    </button>
  );
};

export default Button;
