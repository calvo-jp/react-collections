import CloseIcon from '@heroicons/react/solid/XIcon';
import clsx from 'clsx';
import * as React from 'react';

type Variant = 'info' | 'success' | 'warning' | 'error';

interface AlertProps {
  open?: boolean;
  variant?: Variant;
  onClose?: () => void;
}

const Alert: React.FC<AlertProps & React.ComponentProps<'div'>> = ({
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
        error && 'border-l-4 border-red-300 bg-red-100 text-red-500',
        success && 'border-l-4 border-green-300 bg-green-100 text-green-800',
        warning && 'border-l-4 border-yellow-300 bg-yellow-100 text-yellow-800',
        !open && 'hidden',
        className
      )}
      {...props}
    >
      <div className="flex-grow flex items-center gap-1">
        <div>{children}</div>
      </div>

      {onClose && (
        <button onClick={onClose} tabIndex={-1}>
          <CloseIcon className="w-5 h-5 opacity-30 hover:opacity-60 transition-opacity duration-200" />
        </button>
      )}
    </div>
  );
};

export default Alert;
