import BookmarkIcon from '@heroicons/react/outline/BookmarkIcon';
import ChartPieIcon from '@heroicons/react/outline/ChartPieIcon';
import ClipboardListIcon from '@heroicons/react/outline/ClipboardListIcon';
import CogIcon from '@heroicons/react/outline/CogIcon';
import LockClosedIcon from '@heroicons/react/outline/LockClosedIcon';
import PencilAltIcon from '@heroicons/react/solid/PencilAltIcon';
import avatar from 'assets/samples/images/avatar.jpg';
import clsx from 'clsx';
import useStoreState from 'hooks/store/useState';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import Button from 'widgets/Button';
import Avatar from './Avatar';
import HelpLinks from './HelpLinks';

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
      <div className="w-navbar flex flex-col items-center h-full py-8 bg-white lg:bg-transparent">
        {/*
         *
         * This element is based on the height of Header.
         * This serves as the margin inorder to properly
         * position the content of Sidebar and
         * to have a consistent ui in mobile and desktop view
         *
         */}
        <div className="h-header" />

        <div className="flex flex-col gap-8">
          <Link passHref href="/users/1">
            <a>
              <Avatar src={avatar} />
            </a>
          </Link>

          <CreateButton />
          <Menu />

          <div>
            <HelpLinks className="max-w-[205px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

const CreateButton = () => {
  const router = useRouter();

  return (
    <Link
      href={'/recipes/new?redirect=' + encodeURIComponent(router.asPath)}
      passHref
    >
      <a className="block">
        <Button
          variant="outlined"
          color="primary"
          label="Create New"
          icon={<PencilAltIcon className="w-5 h-5" />}
          fullWidth
        />
      </a>
    </Link>
  );
};

const Menu = () => {
  const router = useRouter();
  const [, dispatch] = useStoreState();

  const handleClick = () => {
    dispatch({
      type: 'session.logout',
    });

    router.push('/');
  };

  return (
    <nav>
      <ul>
        <li>
          <NavbarLink href="/dashboard" label="Dashboard" icon={ChartPieIcon} />
        </li>
        <li>
          <NavbarLink
            href="/recipes"
            label="Recipes"
            icon={ClipboardListIcon}
          />
        </li>
        <li>
          <NavbarLink href="/bookmarks" label="Bookmarks" icon={BookmarkIcon} />
        </li>
        <li>
          <NavbarLink href="/settings" label="Settings" icon={CogIcon} />
        </li>
        <li>
          <NavbarLink
            label="Logout"
            icon={LockClosedIcon}
            onClick={handleClick}
          />
        </li>
      </ul>
    </nav>
  );
};

interface NavbarLinkProps {
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  label: string;
}

const NavbarLink: React.FC<NavbarLinkProps & React.ComponentProps<'a'>> = ({
  href,
  icon: SVGIcon,
  label,
  children,
  className,
  onClick,
  ...props
}) => {
  const [globalState, dispatch] = useStoreState();

  const router = useRouter();
  const active = router.pathname === href;

  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (onClick) onClick(e);

    if (globalState.navbarOpened) {
      dispatch({
        type: 'navbar.toggle',
      });
    }
  };

  const anchor = (
    <a
      className={clsx(
        'cursor-pointer flex items-center gap-2',
        !active && 'text-slate-600 hover:text-slate-700',
        active && 'text-blue-500',
        className
      )}
      onClick={handleClick}
      {...props}
    >
      <SVGIcon className="w-5 h-5" />
      <div>{label}</div>
    </a>
  );

  if (!href) return anchor;

  return (
    <Link href={href} passHref>
      {anchor}
    </Link>
  );
};

export default Navbar;
