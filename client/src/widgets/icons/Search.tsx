import clsx from 'clsx';
import * as React from 'react';
import sizes from './constants/sizes';
import defaultSize from './constants/sizes/default';
import Icon from './types/icon';

const SearchIcon: React.FC<Icon> = ({
  size,
  children,
  className,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className={clsx(!size && defaultSize, size && sizes[size], className)}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
};

export default SearchIcon;
