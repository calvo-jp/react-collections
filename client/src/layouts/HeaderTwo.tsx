import ChevronLeftIcon from '@heroicons/react/solid/ChevronLeftIcon';
import Link from 'next/link';
import * as React from 'react';

interface HeaderTwoProps {
  url: string;
  label?: string;
}

/** header which purpose is to somewhat have a back button */
const HeaderTwo = ({ url, label }: HeaderTwoProps) => {
  return (
    <header className="bg-white shadow-md z-50 sticky top-0 transition-all duration-300">
      <div className="py-4 px-3 w-fit">
        <Link href={url} passHref>
          <a className="flex items-center gap-1">
            <ChevronLeftIcon className="w-5 h-5" />

            {label}
            {!label && <React.Fragment>Go back</React.Fragment>}
          </a>
        </Link>
      </div>
    </header>
  );
};

export default HeaderTwo;
