import CameraIcon from '@heroicons/react/solid/CameraIcon';
import ChartPieIcon from '@heroicons/react/solid/ChartPieIcon';
import CogIcon from '@heroicons/react/solid/CogIcon';
import FireIcon from '@heroicons/react/solid/FireIcon';
import HeartIcon from '@heroicons/react/solid/HeartIcon';
import LightningBoltIcon from '@heroicons/react/solid/LightningBoltIcon';
import PencilAltIcon from '@heroicons/react/solid/PencilAltIcon';
import avatar from 'assets/images/avatar.jpg';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import Button from 'widgets/Button';
import HelpLinks from './HelpLinks';

const Sidebar: React.FC<React.ComponentProps<'section'>> = ({
  className,
  ...props
}) => {
  return (
    <section className={clsx('p-8 flex flex-col gap-8', className)} {...props}>
      <Avatar />
      <CreateButton />
      <Navbar />
      <Footer />
    </section>
  );
};

const CreateButton = () => {
  return (
    <Link href="/recipes/new" passHref>
      <a>
        <Button variant="primary" fullWidth>
          <PencilAltIcon className="w-5 h-5" />
          Create New
        </Button>
      </a>
    </Link>
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
        <CameraIcon className="fill-white w-7 h-7 group-hover:w-8 group-hover:h-8 transition-all duration-100" />
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
            icon={<ChartPieIcon className="w-5 h-5" />}
            label="Dashboard"
          />
        </li>
        <li>
          <NavbarLink
            href="/recipes"
            icon={<FireIcon className="w-5 h-5" />}
            label="Recipes"
          />
        </li>
        <li>
          <NavbarLink
            href="/favorites"
            icon={<HeartIcon className="w-5 h-5" />}
            label="Favorites"
          />
        </li>
        <li>
          <NavbarLink
            href="/settings"
            icon={<CogIcon className="w-5 h-5" />}
            label="Settings"
          />
        </li>
        <li>
          <NavbarLink
            icon={<LightningBoltIcon className="w-5 h-5" />}
            label="Logout"
          />
        </li>
      </ul>
    </nav>
  );
};

interface NavbarLinkProps {
  icon?: JSX.Element;
  label?: string;
}

const NavbarLink: React.FC<NavbarLinkProps & React.ComponentProps<'a'>> = ({
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

const Footer = () => {
  return <HelpLinks className="max-w-[200px]" />;
};

export default Sidebar;
