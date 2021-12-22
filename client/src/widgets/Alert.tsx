import clsx from 'clsx';
import * as React from 'react';

type BaseProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

type Variant = 'info' | 'success' | 'warning' | 'error';

interface AlertProps extends BaseProps {
  open?: boolean;
  variant?: Variant;
  onClose?: () => void;
}

const Alert: React.FC<AlertProps> = ({
  open,
  variant,
  onClose,
  children,
  className,
  ...props
}) => {
  const info = variant === 'info';
  const error = variant === 'error';
  const success = variant === 'success';
  const warning = variant === 'warning';

  return (
    <div
      className={clsx(
        'p-3 text-sm flex items-center',
        info && 'border-l-4 border-blue-300 bg-blue-100 text-gray-800',
        error && 'border-l-4 border-red-300 bg-red-100 text-red-800',
        success && 'border-l-4 border-green-300 bg-green-100 text-green-800',
        warning && 'border-l-4 border-yellow-300 bg-yellow-100 text-yellow-800',
        !open && 'hidden',
        className
      )}
      {...props}
    >
      <div className="flex-grow">{children}</div>

      {!!onClose && <CloseButton tabIndex={-1} onClick={onClose} />}
    </div>
  );
};

const CloseButton: React.FC<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
> = (props) => {
  return (
    <button {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-5 h-5 opacity-30 hover:opacity-60 transition-opacity duration-200"
      >
        <path
          fillRule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
};

export default Alert;
