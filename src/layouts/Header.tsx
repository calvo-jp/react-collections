import SearchIcon from '@heroicons/react/outline/SearchIcon';
import BellIcon from '@heroicons/react/solid/BellIcon';
import HomeIcon from '@heroicons/react/solid/HomeIcon';
import MenuIcon from '@heroicons/react/solid/MenuIcon';
import PencilAltIcon from '@heroicons/react/solid/PencilAltIcon';
import ViewGridIcon from '@heroicons/react/solid/ViewGridIcon';
import CloseIcon from '@heroicons/react/solid/XIcon';
import clsx from 'clsx';
import useStoreState from 'hooks/store/useState';
import useQuery from 'hooks/useQuery';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import LogoIcon from 'widgets/icons/logo';
import Navbar from './navbar';

interface HeaderProps {
  navbar?: boolean;
}

const Header = (props: HeaderProps) => {
  const hasNavbar = !!props.navbar;

  return (
    <header className="sticky top-0 z-[70] bg-white shadow-md h-header flex items-center justify-between px-3 gap-1 sm:gap-2 dark:bg-zinc-800 dark:shadow-none dark:border-b dark:border-zinc-700">
      <div
        className={clsx(
          'items-center gap-2 md:z-10',
          hasNavbar && 'flex',
          !hasNavbar && 'hidden sm:flex'
        )}
      >
        {hasNavbar && <Hamburger />}

        <Link href="/newsfeed" passHref>
          <a className="hidden sm:block">
            <LogoIcon />
          </a>
        </Link>
      </div>

      <div className="flex items-center gap-1 sm:gap-2 w-full sm:w-auto">
        <Searchbar />

        <IconButtons />
      </div>

      {hasNavbar && <Navbar />}
    </header>
  );
};

const Searchbar = () => {
  return (
    <form className="grow bg-gray-100 p-1 sm:p-1.5 rounded-full flex items-center gap-2 dark:bg-zinc-700">
      <SearchIcon className="w-4 h-4" />
      <input
        placeholder="Search"
        className="bg-transparent placeholder:opacity-100 placeholder:text-gray-500 outline-none"
      />
    </form>
  );
};

const Hamburger = () => {
  const [globalState, dispatch] = useStoreState();

  const handleClick = () => dispatch({ type: 'navbar.toggle' });

  if (globalState.navbarOpened) {
    return (
      <button className="lg:hidden z-[90]" onClick={handleClick}>
        <CloseIcon className="w-6 h-6 fill-gray-400 hover:fill-gray-500 dark:fill-zinc-500 dark:hover:fill-zinc-400" />
      </button>
    );
  }

  return (
    <button className="lg:hidden" onClick={handleClick}>
      <MenuIcon className="w-6 h-6 fill-gray-400 hover:fill-gray-500 dark:fill-zinc-400 dark:hover:fill-zinc-300" />
    </button>
  );
};

const IconButtons = () => {
  const router = useRouter();
  const pathname = router.asPath;
  const encodedPathname = encodeURIComponent(router.asPath);
  const redirect = useQuery('redirect').get('redirect');

  const newsfeedPath = '/newsfeed';
  const createRecipePath = '/recipes/new';

  const isInNewsfeed = pathname.startsWith(newsfeedPath);

  const getAccountHref = () => {
    if (isInNewsfeed) return !!redirect ? redirect : '/dashboard';
  };

  return (
    <React.Fragment>
      <IconButton
        icon={PencilAltIcon}
        href={`${createRecipePath}?redirect=${encodedPathname}`}
        active={pathname.startsWith(createRecipePath)}
      />

      <IconButton
        icon={HomeIcon}
        href={`${newsfeedPath}?redirect=${encodedPathname}`}
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
        'rounded-full p-1 sm:p-1.5',
        !active &&
          'bg-gray-100 hover:bg-gray-200 dark:bg-zinc-700 dark:hover:bg-zinc-600',
        active && 'bg-blue-100 dark:bg-sky-500'
      )}
    >
      <SVGIcon
        className={clsx(
          'w-6 h-6 sm:w-7 sm:h-7',
          !active && 'fill-gray-500 dark:fill-zinc-300',
          active && 'fill-blue-500 dark:fill-white'
        )}
      />
    </Container>
  );
};

export default Header;
