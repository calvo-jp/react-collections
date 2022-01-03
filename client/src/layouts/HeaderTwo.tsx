import ChevronLeftIcon from '@heroicons/react/solid/ChevronLeftIcon';
import Link from 'next/link';
import * as React from 'react';
import onScrollReveal from 'utils/onScrollReveal';

interface HeaderTwoProps {
  url: string;
  label: string;
}

/** header which purpose is to somewhat have a back button */
const HeaderTwo = ({ url, label }: HeaderTwoProps) => {
  const ref = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (ref.current) onScrollReveal(ref.current);
  }, []);

  return (
    <header
      ref={ref}
      className="bg-white shadow-md z-50 sticky top-0 transition-all duration-300"
    >
      <div className="py-4 px-3">
        <Link href={url} passHref>
          <a className="flex items-center gap-1">
            <ChevronLeftIcon className="w-5 h-5" />
            {label}
          </a>
        </Link>
      </div>
    </header>
  );
};

export default HeaderTwo;
