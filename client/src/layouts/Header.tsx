import MenuIcon from '@heroicons/react/outline/MenuIcon';
import SearchIcon from '@heroicons/react/outline/SearchIcon';
import BellIcon from '@heroicons/react/solid/BellIcon';
import HomeIcon from '@heroicons/react/solid/HomeIcon';
import PencilAltIcon from '@heroicons/react/solid/PencilAltIcon';
import ViewGridIcon from '@heroicons/react/solid/ViewGridIcon';
import CloseIcon from '@heroicons/react/solid/XIcon';
import clsx from 'clsx';
import useStoreState from 'hooks/store/useState';
import useQuery from 'hooks/useQuery';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import Brand from './Brand';
import Navbar from './Navbar';

interface HeaderProps {
  navbar?: boolean;
}

const Header = (props: HeaderProps) => {
  const hasNavbar = !!props.navbar;

  return (
    <header className="sticky top-0 z-[70] bg-white shadow-md h-[50px] flex items-center justify-between px-3 gap-2">
      <div
        className={clsx(
          'items-center gap-2 md:z-10',
          hasNavbar && 'flex',
          !hasNavbar && 'hidden sm:flex'
        )}
      >
        {hasNavbar && <Hamburger />}

        <div className="hidden sm:block">
          <Brand redirectUrl="/newsfeed" />
        </div>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto">
        <form className="grow bg-gray-100 p-1.5 rounded-full flex items-center gap-2">
          <SearchIcon className="w-4 h-4" />
          <input
            placeholder="Search"
            className="bg-transparent placeholder:opacity-100 placeholder:text-gray-500 outline-none"
          />
        </form>

        <IconButtons />
      </div>

      {
        /*
         *
         * Sidebar is here instead of having it in the Layout is
         * for toggler to still be visible by just increasing its zIndex.
         * This might change in the future if we find a better solution.
         *
         */
        hasNavbar && <Navbar />
      }
    </header>
  );
};

const Hamburger = () => {
  const [globalState, dispatch] = useStoreState();

  const handleClick = () => dispatch({ type: 'navbar.toggle' });

  if (globalState.navbarOpened) {
    return (
      <button className="lg:hidden z-[90]" onClick={handleClick}>
        <CloseIcon className="w-6 h-6 text-gray-400 hover:text-gray-500" />
      </button>
    );
  }

  return (
    <button className="lg:hidden" onClick={handleClick}>
      <MenuIcon className="w-6 h-6 text-gray-400 hover:text-gray-500" />
    </button>
  );
};

const IconButtons = () => {
  const router = useRouter();
  const pathname = router.pathname;
  const redirect = useQuery('redirect').get('redirect');

  const newsfeedPath = '/newsfeed';
  const isInNewsfeed = pathname === newsfeedPath;

  const createRecipePath = '/recipes/new';

  const getAccountHref = () => {
    if (isInNewsfeed) return redirect || '/dashboard';
  };

  return (
    <React.Fragment>
      <IconButton
        icon={PencilAltIcon}
        href={`${createRecipePath}?redirect=${encodeURIComponent(pathname)}`}
        /**
         *
         * this might be unnecessary, but we'll just leave it here
         * just incase we decide to bring this header in create recipe page someday
         *
         */
        active={pathname === createRecipePath}
      />

      <IconButton
        icon={HomeIcon}
        href={`${newsfeedPath}?redirect=${encodeURIComponent(pathname)}`}
        active={isInNewsfeed}
      />

      <IconButton
        icon={ViewGridIcon}
        href={getAccountHref()}
        active={!isInNewsfeed}
      />

      <IconButton icon={BellIcon} />
    </React.Fragment>
  );
};

interface IconButtonProps {
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  href?: string;
  onClick?: () => void;
  active?: boolean;
}

const IconButton = ({
  icon: SVGIcon,
  href,
  onClick,
  active,
}: IconButtonProps) => {
  const Container: React.FC<Record<'className', string>> = (props) => {
    if (!href) return <button onClick={onClick} {...props} />;

    return (
      <Link href={href}>
        <a {...props} onClick={onClick} />
      </Link>
    );
  };

  return (
    <Container
      className={clsx(
        'rounded-full p-1.5',
        !active && 'bg-gray-100 hover:bg-gray-200 text-gray-500',
        active && 'bg-blue-100 text-blue-500'
      )}
    >
      <SVGIcon className="w-7 h-7" />
    </Container>
  );
};

export default Header;
