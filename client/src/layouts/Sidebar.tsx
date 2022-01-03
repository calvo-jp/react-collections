import avatar from 'assets/images/avatar.jpg';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import Button from 'widgets/Button';
import CameraIcon from 'widgets/icons/Camera';
import CogIcon from 'widgets/icons/Cog';
import FireIcon from 'widgets/icons/Fire';
import GraphIcon from 'widgets/icons/Graph';
import HeartIcon from 'widgets/icons/Heart';
import LightningIcon from 'widgets/icons/Lightning';
import PencilSquareIcon from 'widgets/icons/PencilSquare';
import HelpLinks from './HelpLinks';

const Sidebar = () => {
  return (
    <section className="p-8 flex flex-col gap-8">
      <Avatar />

      <Button variant="primary" fullWidth>
        <PencilSquareIcon size="sm" />
        Create New
      </Button>

      <Navbar />

      <div>
        <HelpLinks className="max-w-[200px]" />
      </div>
    </section>
  );
};

const Avatar = () => {
  return (
    <div className="w-[200px] h-[200px] relative">
      <div className="relative w-full h-full rounded-full overflow-hidden">
        <Image
          src={avatar}
          alt=""
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </div>

      <button className="z-10 absolute right-1 bottom-1 bg-gradient-to-r from-cyan-500 h-12 w-12 to-blue-400 rounded-full border-4 border-gray-100 flex items-center justify-center group">
        <CameraIcon className="w-4 h-4 fill-white group-hover:w-8 group-hover:h-8 transition-all duration-100" />
      </button>
    </div>
  );
};

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavbarLink
            href="/dashboard"
            icon={<GraphIcon size="sm" />}
            label="Dashboard"
          />
        </li>
        <li>
          <NavbarLink
            href="/recipes"
            icon={<FireIcon size="sm" />}
            label="Recipes"
          />
        </li>
        <li>
          <NavbarLink
            href="/favorites"
            icon={<HeartIcon size="sm" />}
            label="Favorites"
          />
        </li>
        <li>
          <NavbarLink
            href="/settings"
            icon={<CogIcon size="sm" />}
            label="Settings"
          />
        </li>
        <li>
          <NavbarLink icon={<LightningIcon size="sm" />} label="Logout" />
        </li>
      </ul>
    </nav>
  );
};

type NavbarBaseProps = React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

interface NavbarLinkProps extends NavbarBaseProps {
  icon?: JSX.Element;
  label?: string;
}

const NavbarLink: React.FC<NavbarLinkProps> = ({
  href,
  icon,
  label,
  children,
  className,
  ...props
}) => {
  const router = useRouter();
  const active = router.pathname === href;

  const anchor = (
    <a
      className={clsx(
        'cursor-pointer flex items-center gap-2 text-lg',
        !active && 'hover:text-orange-500',
        active && 'text-blue-500',
        className
      )}
      {...props}
    >
      {icon}
      {label}
      {children}
    </a>
  );

  if (!href) return anchor;

  return (
    <Link href={href} passHref>
      {anchor}
    </Link>
  );
};

export default Sidebar;
