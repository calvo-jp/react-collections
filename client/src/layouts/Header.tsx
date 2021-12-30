import BellIcon from "widgets/icons/Bell";
import MenuIcon from "widgets/icons/Menu";
import Searchbar from "widgets/Searchbar";
import Brand from "./Brand";

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
              <BellIcon className="h-8 w-8 fill-slate-300" />
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
      <MenuIcon />
    </button>
  );
};

export default Header;
