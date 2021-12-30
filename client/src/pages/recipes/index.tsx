import avatar from "assets/images/avatar.jpg";
import clsx from "clsx";
import Brand from "layouts/Brand";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import Button from "widgets/Button";
import BellIcon from "widgets/icons/Bell";
import CameraIcon from "widgets/icons/Camera";
import CogIcon from "widgets/icons/Cog";
import FireIcon from "widgets/icons/Fire";
import GraphIcon from "widgets/icons/Graph";
import HeartIcon from "widgets/icons/Heart";
import LightningIcon from "widgets/icons/Lightning";
import MenuIcon from "widgets/icons/Menu";
import PencilSquareIcon from "widgets/icons/PencilSquare";
import Rating from "widgets/Rating";
import Searchbar from "widgets/Searchbar";

interface Item {
  id: number;
  name: string;
  description: string;
  averageRating?: number;
  image: string;
}

interface Props {
  items: Item[];
}

export const getStaticProps: GetStaticProps = async () => {
  const items = [
    {
      id: 1,
      name: "Adobong manok",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit." +
        "Earum, in, illo, molestiae accusantium natus recusandae vel nihil " +
        "blanditiis labore minus ut explicabo non architecto eum?",
      image: "/images/3.jpg",
    },
    {
      id: 2,
      name: "Tinolang bangus",
      description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit",
      image: "/images/4.jpg",
      averageRating: 4,
    },
    {
      id: 3,
      name: "Sinanlag nga bugas",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit," +
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit",
      image: "/images/6.jpg",
      averageRating: 2,
    },
  ];

  return {
    props: {
      items,
    },
    revalidate: false,
  };
};

const Recipes: NextPage<Props> = ({ items }) => {
  return (
    <React.Fragment>
      <Head>
        <title>Recipes</title>
      </Head>

      <div className="min-h-screen bg-gray-100">
        <Header />

        <main className="flex-grow">
          <div className="flex">
            <Sidebar />

            <section className="p-8 flex-grow">
              <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 grid-flow-row-dense">
                {items.map((item) => (
                  <Item {...item} key={item.id} />
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </React.Fragment>
  );
};

const Item: React.FC<Item> = ({
  id,
  name,
  image,
  description,
  averageRating,
}) => {
  return (
    <Link href={"/recipes/".concat(id.toString())} passHref>
      <a
        className="bg-white shadow-md group hover:ring-4 hover:ring-blue-200"
        key={name}
      >
        <figure className="w-full h-[250px] relative overflow-hidden">
          <div className="absolute w-full h-full z-20 top-0 left-0 bg-black bg-opacity-50 hidden group-hover:flex items-center justify-center" />

          <Image
            src={image}
            alt=""
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </figure>

        <article className="p-4">
          <h4 className="text-xl">{name}</h4>
          <p className="text-sm text-gray-700 truncate">{description}</p>

          <div className="mt-2">
            <Rating value={averageRating} />
          </div>
        </article>
      </a>
    </Link>
  );
};

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

export default Recipes;
