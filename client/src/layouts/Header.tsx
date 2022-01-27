import BellIcon from '@heroicons/react/solid/BellIcon';
import MenuIcon from '@heroicons/react/solid/MenuIcon';
import useStoreState from 'hooks/store/useState';
import Searchbar from 'layouts/Searchbar';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import Brand from './Brand';

const Header = () => {
  const ref = React.useRef<HTMLElement>(null);
  const router = useRouter();
  const [keyword, setKeyword] = React.useState('');
  const [globalState] = useStoreState();

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
    <header ref={ref} className="bg-white shadow-md">
      <div className="flex justify-between items-center gap-4 p-2 px-3">
        <div className="flex items-center gap-2">
          <button>
            <MenuIcon className="w-4 h-4" />
          </button>

          <Brand />
        </div>

        <div className="flex items-center gap-4">
          <form onSubmit={handleSubmit} className="hidden md:block">
            <Searchbar
              outline="sm"
              className="w-[300px]"
              onReset={handleReset}
              onChange={handleChange}
              value={keyword}
            />
          </form>

          {globalState.authorized && (
            <button className="relative">
              <BellIcon className="w-8 h-8 fill-[#cccccc] hover:fill-[#c4c4c4] transition-all duration-200" />
            </button>
          )}

          {!globalState.authorized && (
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
