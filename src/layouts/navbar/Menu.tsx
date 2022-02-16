import BookmarkIcon from '@heroicons/react/outline/BookmarkIcon';
import ChartPieIcon from '@heroicons/react/outline/ChartPieIcon';
import ClipboardListIcon from '@heroicons/react/outline/ClipboardListIcon';
import CogIcon from '@heroicons/react/outline/CogIcon';
import LockClosedIcon from '@heroicons/react/outline/LockClosedIcon';
import clsx from 'clsx';
import { signOut } from 'firebase/auth';
import useStoreState from 'hooks/store/useState';
import Link from 'next/link';
import { useRouter } from 'next/router';
import firebaseAuth from 'utils/firebase/auth';

const Menu = () => {
  const router = useRouter();
  const [, dispatch] = useStoreState();

  const handleClick = async () => {
    try {
      await signOut(firebaseAuth);
      dispatch({ type: 'session.logout' });
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav>
      <ul>
        <li>
          <MenuLink href="/dashboard">
            <ChartPieIcon className="w-5 h-5" />
            Dashboard
          </MenuLink>
        </li>
        <li>
          <MenuLink href="/recipes">
            <ClipboardListIcon className="w-5 h-5" />
            Recipes
          </MenuLink>
        </li>
        <li>
          <MenuLink href="/bookmarks">
            <BookmarkIcon className="w-5 h-5" />
            Bookmarks
          </MenuLink>
        </li>
        <li>
          <MenuLink href="/settings">
            <CogIcon className="w-5 h-5" />
            Settings
          </MenuLink>
        </li>
        <li>
          <MenuButton onClick={handleClick}>
            <LockClosedIcon className="w-5 h-5" />
            Logout
          </MenuButton>
        </li>
      </ul>
    </nav>
  );
};

const MenuButton: React.FC<React.ComponentProps<'button'>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button className={clsx(getLinkCls(), className)} {...props}>
      {children}
    </button>
  );
};

interface MenuLinkProps extends React.ComponentProps<'a'> {
  href: string;
}

const MenuLink: React.FC<MenuLinkProps> = ({
  href,
  onClick,
  children,
  className,
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

  return (
    <Link href={href} passHref>
      <a
        className={clsx(getLinkCls(active), className)}
        onClick={handleClick}
        {...props}
      >
        {children}
      </a>
    </Link>
  );
};

const getLinkCls = (active?: boolean) => {
  return clsx(
    'cursor-pointer flex items-center gap-2',
    active && 'text-blue-500 dark:text-sky-400',
    !active &&
      'text-gray-600 hover:text-gray-700 dark:text-zinc-300 dark:hover:text-zinc-100'
  );
};

export default Menu;
