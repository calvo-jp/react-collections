import ChevronLeftIcon from '@heroicons/react/outline/ChevronLeftIcon';
import useQuery from 'hooks/useQuery';
import Link from 'next/link';
import * as React from 'react';

/**
 *
 * header which purpose is to somewhat have a back button
 *
 */
const HeaderTwo: React.FC = ({ children }) => {
  const redirect = useQuery('redirect').get('redirect') || '/';

  return (
    <header className="bg-white shadow-md z-50 sticky top-0 h-header flex items-center justify-between px-3 dark:bg-zinc-800 dark:shadow-none dark:border-b dark:border-zinc-700">
      <Link href={redirect} passHref>
        <a className="flex items-center gap-1">
          <ChevronLeftIcon className="w-5 h-5" />
          <span>Go back</span>
        </a>
      </Link>

      <div>{children}</div>
    </header>
  );
};

export default HeaderTwo;
