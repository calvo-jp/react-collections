import avatar from "assets/images/avatar.jpg";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import Button from "widgets/Button";
import CameraIcon from "widgets/icons/Camera";
import CogIcon from "widgets/icons/Cog";
import FireIcon from "widgets/icons/Fire";
import GraphIcon from "widgets/icons/Graph";
import HeartIcon from "widgets/icons/Heart";
import LightningIcon from "widgets/icons/Lightning";
import PencilSquareIcon from "widgets/icons/PencilSquare";
import HelpLinks from "./HelpLinks";

const Sidebar = () => {
  return (
    <section className="p-8 flex flex-col gap-8">
      <Avatar />

      <Button variant="primary" fullWidth>
        <PencilSquareIcon />
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
        <CameraIcon className="h-7 w-7 fill-white group-hover:w-8 group-hover:h-8 transition-all duration-100" />
      </button>
    </div>
  );
};

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavbarLink href="/dashboard">
            <GraphIcon className="w-5 h-5" />
            Dashboard
          </NavbarLink>
        </li>
        <li>
          <NavbarLink href="/recipes">
            <FireIcon className="w-5 h-5" />
            Recipes
          </NavbarLink>
        </li>
        <li>
          <NavbarLink href="/favorites">
            <HeartIcon className="w-5 h-5" />
            Favorites
          </NavbarLink>
        </li>
        <li>
          <NavbarLink href="/settings">
            <CogIcon className="w-5 h-5" />
            Settings
          </NavbarLink>
        </li>
        <li>
          <NavbarLink>
            <LightningIcon className="w-5 h-5" />
            Logout
          </NavbarLink>
        </li>
      </ul>
    </nav>
  );
};

type NavbarLinkProps = React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

const NavbarLink: React.FC<NavbarLinkProps> = ({
  href,
  children,
  className,
  ...props
}) => {
  const router = useRouter();
  const active = router.pathname === href;

  const jsx = (applyActiveCls?: boolean) => (
    <a
      className={clsx(
        "cursor-pointer flex items-center gap-2 text-lg",
        !applyActiveCls && "hover:text-orange-500",
        applyActiveCls && "text-blue-500",
        className
      )}
      {...props}
    >
      {children}
    </a>
  );

  if (!href || href === "#") return jsx();

  return (
    <Link href={href} passHref>
      {jsx(active)}
    </Link>
  );
};

export default Sidebar;
