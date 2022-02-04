import MenuIcon from '@heroicons/react/outline/MenuIcon';
import SearchIcon from '@heroicons/react/outline/SearchIcon';
import BellIcon from '@heroicons/react/solid/BellIcon';
import HomeIcon from '@heroicons/react/solid/HomeIcon';
import CloseIcon from '@heroicons/react/solid/XIcon';
import useStoreState from 'hooks/store/useState';
import Link from 'next/link';
import * as React from 'react';
import Brand from './Brand';
import Navbar from './Navbar';

interface HeaderProps {
  sidebar?: boolean;
}

const Header = (props: HeaderProps) => {
  return (
    <header className="sticky top-0 z-[70] bg-white shadow-md h-[50px] flex items-center justify-between px-3 gap-2">
      <div className="flex items-center gap-2 md:z-10">
        {props.sidebar && <Hamburger />}

        <div className="hidden sm:block">
          <Brand redirect="/newsfeed" />
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

        <IconButton icon={HomeIcon} href="/newsfeed" />
        <IconButton icon={BellIcon} />
      </div>

      {
        /*
         *
         * Sidebar is here instead of having it in the Layout is
         * for toggler to still be visible by just increasing its zIndex.
         * This might change in the future if we find a better solution.
         *
         */
        props.sidebar && <Navbar />
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

interface IconButtonProps {
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  href?: string;
  onClick?: () => void;
}

const IconButton = ({ icon: SVGIcon, href, onClick }: IconButtonProps) => {
  const Container: React.FC<Record<'className', string>> = (props) => {
    if (!href) return <button onClick={onClick} {...props} />;

    return (
      <Link href={href}>
        <a {...props} />
      </Link>
    );
  };

  return (
    <Container className="bg-gray-100 hover:bg-gray-200 rounded-full p-1.5">
      <SVGIcon className="w-7 h-7 fill-gray-500" />
    </Container>
  );
};

export default Header;
