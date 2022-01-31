import MenuIcon from '@heroicons/react/outline/MenuIcon';
import BellIcon from '@heroicons/react/solid/BellIcon';
import CloseIcon from '@heroicons/react/solid/XIcon';
import useStoreState from 'hooks/store/useState';
import Searchbar from 'layouts/Searchbar';
import { useRouter } from 'next/router';
import * as React from 'react';
import Brand from './Brand';
import Sidebar from './Navbar';

interface HeaderProps {
  sidebar?: boolean;
}

const Header = (props: HeaderProps) => {
  const router = useRouter();
  const [keyword, setKeyword] = React.useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (keyword.trim().length === 0) return setKeyword('');

    const params = new URLSearchParams();
    params.append('origin', router.asPath);
    params.append('keyword', keyword);
    router.push('/search?' + params.toString());
  };

  const handleReset = () => setKeyword('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setKeyword(e.target.value);

  React.useEffect(() => {
    return () => setKeyword('');
  }, []);

  return (
    <header className="sticky top-0 z-[70] bg-white shadow-md h-[50px] flex items-center justify-between px-3 gap-2">
      <div className="flex items-center gap-2 z-[90]">
        {props.sidebar && <Hamburger />}

        <div className="hidden sm:block">
          <Brand />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
        <form onSubmit={handleSubmit} className="grow">
          <Searchbar
            className="w-full"
            onReset={handleReset}
            onChange={handleChange}
            value={keyword}
          />
        </form>

        <div className="flex items-center gap-2">
          <IconButton icon={BellIcon} />
        </div>
      </div>

      {
        /*
         *
         * Sidebar is here instead of having it in the Layout is
         * for toggler to still be visible by just increasing its zIndex.
         * This might change in the future if we find a better solution.
         *
         */
        props.sidebar && <Sidebar />
      }
    </header>
  );
};

const Hamburger = () => {
  const [globalState, dispatch] = useStoreState();

  const handleClick = () => dispatch({ type: 'navbar.toggle' });

  if (globalState.navbarOpened) {
    return (
      <button className="md:hidden" onClick={handleClick}>
        <CloseIcon className="w-6 h-6 text-gray-400 hover:text-gray-500" />
      </button>
    );
  }

  return (
    <button className="md:hidden" onClick={handleClick}>
      <MenuIcon className="w-6 h-6 text-gray-400 hover:text-gray-500" />
    </button>
  );
};

interface IconButtonProps {
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
}

const IconButton = ({ icon: SVGIcon }: IconButtonProps) => {
  return (
    <button className="">
      <SVGIcon className="w-8 h-8 fill-gray-300 hover:fill-gray-400 transition-all duration-200" />
    </button>
  );
};

export default Header;
