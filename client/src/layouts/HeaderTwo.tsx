import ChevronLeftIcon from '@heroicons/react/outline/ChevronLeftIcon';
import Link from 'next/link';
import * as React from 'react';

interface HeaderTwoProps {
  label?: string;
  redirect: string;
}

/** header which purpose is to somewhat have a back button */
const HeaderTwo = ({ redirect, label }: HeaderTwoProps) => {
  return (
    <header className="bg-white shadow-md z-50 sticky top-0 h-[50px] flex items-center px-3">
      <Link href={redirect} passHref>
        <a className="flex items-center gap-1">
          <ChevronLeftIcon className="w-5 h-5" />

          {label}
          {!label && <React.Fragment>Go back</React.Fragment>}
        </a>
      </Link>
    </header>
  );
};

export default HeaderTwo;
