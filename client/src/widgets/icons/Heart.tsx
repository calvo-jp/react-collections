import clsx from 'clsx';
import * as React from 'react';
import sizes from './constants/sizes';
import defaultSize from './constants/sizes/default';
import Icon from './types/icon';

const HeartIcon: React.FC<Icon> = ({ size, children, className, ...props }) => {
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
        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default HeartIcon;
