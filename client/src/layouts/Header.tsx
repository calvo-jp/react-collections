import BellIcon from '@heroicons/react/solid/BellIcon';
import MenuIcon from '@heroicons/react/solid/MenuIcon';
import useStoreState from 'hooks/store/useState';
import Searchbar from 'layouts/Searchbar';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import Brand from './Brand';
import Sidebar from './Sidebar';

const Header = () => {
  const router = useRouter();
  const [keyword, setKeyword] = React.useState('');
  const [globalState, dispatch] = useStoreState();

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

  const handleClick = () => {
    dispatch({
      type: 'navbar.toggle',
    });
  };

  React.useEffect(() => {
    return () => setKeyword('');
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white shadow-md h-[50px] flex items-center justify-between px-3">
      <div className="flex items-center gap-2">
        <button className="md:hidden z-[60]" onClick={handleClick}>
          <MenuIcon className="w-4 h-4" />
        </button>

        <Brand />
      </div>

      <div className="flex items-center gap-4">
        <form onSubmit={handleSubmit} className="hidden sm:block">
          <Searchbar
            outline="sm"
            className="w-[300px]"
            onReset={handleReset}
            onChange={handleChange}
            value={keyword}
          />
        </form>

        {globalState.authorized && (
          <div className="flex items-center gap-2">
            <IconButton icon={BellIcon} />
          </div>
        )}

        {!globalState.authorized && (
          <nav>
            <ul className="flex gap-3">
              <li>
                <Link href="/login" passHref>
                  <a>Login</a>
                </Link>
              </li>

              <li>
                <Link href="/create-account" passHref>
                  <a>Sign up</a>
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>

      <Sidebar mobile />
    </header>
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
