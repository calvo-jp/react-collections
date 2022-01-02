import clsx from 'clsx';
import * as React from 'react';
import sizes from './constants/sizes';
import defaultSize from './constants/sizes/default';
import Icon from './types/icon';

const MenuIcon: React.FC<Icon> = ({ size, children, className, ...props }) => {
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
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );
};

export default MenuIcon;
