import BellIcon from '@heroicons/react/solid/BellIcon';
import MenuIcon from '@heroicons/react/solid/MenuIcon';
import Link from 'next/link';
import * as React from 'react';
import onScrollReveal from 'utils/onScrollReveal';
import Searchbar from 'widgets/Searchbar';
import Brand from './Brand';

class HeaderProps {
  /** this will be removed once globalState is available */
  authorized?: boolean;
}

const Header = (props: HeaderProps) => {
  const ref = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (ref.current) onScrollReveal(ref.current);
  }, []);

  return (
    <header ref={ref} className="bg-white shadow-md sticky top-0 z-50">
      <div className="flex justify-between items-center gap-4 p-2 pl-3">
        <div className="flex items-center gap-2">
          <button>
            <MenuIcon className="w-4 h-4" />
          </button>

          <Brand />
        </div>

        <div className="flex items-center gap-4">
          <Searchbar className="w-[300px]" />

          {!props.authorized && (
            <nav>
              <ul className="flex gap-4">
                <li>
                  <Link href="/login" passHref>
                    <a>Login</a>
                  </Link>
                </li>
                <li>
                  <Link href="/create-account" passHref>
                    <a className="uppercase">Sign up</a>
                  </Link>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
