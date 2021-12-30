import avatar from "assets/images/avatar.jpg";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "widgets/Button";
import CameraIcon from "widgets/icons/Camera";
import CogIcon from "widgets/icons/Cog";
import FireIcon from "widgets/icons/Fire";
import GraphIcon from "widgets/icons/Graph";
import HeartIcon from "widgets/icons/Heart";
import LightningIcon from "widgets/icons/Lightning";
import PencilSquareIcon from "widgets/icons/PencilSquare";

const Sidebar = () => {
  return (
    <section className="p-8 flex flex-col gap-8 sticky top-0">
      <Avatar />

      <Button variant="primary" fullWidth>
        <PencilSquareIcon />
        Create New
      </Button>

      <Navbar />
      <Footer />
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

const Footer = () => {
  const Divider = () => <li className="w-1 h-1 bg-gray-300 rounded-full" />;

  return (
    <div>
      <ul className="flex flex-wrap gap-1 items-center text-sm max-w-[200px]">
        <li>
          <FooterLink href="/about">About</FooterLink>
        </li>
        <Divider />
        <li>
          <FooterLink href="/cookies-and-terms">Cookies and Terms</FooterLink>
        </li>
        <Divider />
        <li>
          <FooterLink href="/contact-us">Contact us</FooterLink>
        </li>
        <Divider />
        <li>
          <FooterLink href="/help">Help</FooterLink>
        </li>
      </ul>
    </div>
  );
};

interface FooterLinkProps {
  href: string;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, children }) => {
  return (
    <Link href={href} passHref>
      <a className="hover:text-blue-600">{children}</a>
    </Link>
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

type NavbarItemProps = Omit<
  React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >,
  "className" | "style"
>;

const NavbarLink: React.FC<NavbarItemProps> = ({
  href,
  children,
  ...props
}) => {
  const router = useRouter();
  const active = router.pathname === href;

  const unwrapped = (
    <a
      href="#"
      className={clsx(
        "flex items-center gap-2 text-lg",
        !active && "hover:text-orange-500",
        active && "text-blue-500"
      )}
      {...props}
    >
      {children}
    </a>
  );

  if (!href) return unwrapped;

  return (
    <Link href={href} passHref>
      {unwrapped}
    </Link>
  );
};

export default Sidebar;
