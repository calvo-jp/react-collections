import BellIcon from '@heroicons/react/solid/BellIcon';
import MenuIcon from '@heroicons/react/solid/MenuIcon';
import Searchbar from 'widgets/Searchbar';
import Brand from './Brand';

const Header = () => {
  return (
    <header className="bg-white shadow-md z-10">
      <div className="flex justify-between items-center gap-4 py-2 px-8">
        <div className="flex items-center gap-2">
          <Hamburger />
          <Brand />
        </div>

        <div className="flex items-center gap-4">
          <Searchbar className="w-[300px]" />

          <div className="flex gap-2">
            <button>
              <BellIcon className="w-8 h-8 fill-slate-300" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

const Hamburger = () => {
  return (
    <button>
      <MenuIcon className="w-4 h-4" />
    </button>
  );
};

export default Header;
