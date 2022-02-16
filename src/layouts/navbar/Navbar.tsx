import avatar from 'assets/samples/images/avatar.jpg';
import clsx from 'clsx';
import useStoreState from 'hooks/store/useState';
import Link from 'next/link';
import * as React from 'react';
import Avatar from '../Avatar';
import CreateButton from './CreateButton';
import HelpLinks from './HelpLinks';
import Menu from './Menu';

const Navbar = () => {
  const [globalState] = useStoreState();

  const opened = globalState.navbarOpened;

  return (
    <div
      className={clsx(
        'fixed lg:block bg-black lg:bg-transparent bg-opacity-60 top-0 left-0 w-full h-full lg:w-fit z-[80] md:z-0',
        !opened && 'hidden',
        opened && 'block'
      )}
    >
      <div className="w-navbar flex flex-col items-center h-full py-8 bg-white lg:bg-transparent border-r border-transparent dark:bg-zinc-900 dark:border-zinc-800 dark:lg:border-transparent">
        <div className="h-header" />

        <div className="flex flex-col gap-8">
          <Link passHref href="/users/1">
            <a>
              <Avatar src={avatar} />
            </a>
          </Link>

          <CreateButton />
          <Menu />

          <div className="max-w-[205px]">
            <HelpLinks />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
