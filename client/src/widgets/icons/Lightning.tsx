import clsx from 'clsx';
import * as React from 'react';
import sizes from './constants/sizes';
import defaultSize from './constants/sizes/default';
import Icon from './types/icon';

const LightningIcon: React.FC<Icon> = ({
  size,
  children,
  className,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={clsx(!size && defaultSize, size && sizes[size], className)}
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default LightningIcon;
