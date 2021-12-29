import Brand from "layouts/Brand";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import Button from "widgets/Button";
import BellIcon from "widgets/icons/Bell";
import CameraIcon from "widgets/icons/Camera";
import CogIcon from "widgets/icons/Cog";
import FireIcon from "widgets/icons/Fire";
import GraphIcon from "widgets/icons/Graph";
import HeartIcon from "widgets/icons/Heart";
import LightningIcon from "widgets/icons/Lightning";
import PencilSquareIcon from "widgets/icons/PencilSquare";
import Rating from "widgets/Rating";
import Searchbar from "widgets/Searchbar";

interface Item {
  name: string;
  description: string;
  averageRating?: number;
  image: string;
}

interface Props {
  items: Item[];
}

export const getStaticProps: GetStaticProps = () => {
  const items = [
    {
      name: "Adobong manok",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit." +
        "Earum, in, illo, molestiae accusantium natus recusandae vel nihil " +
        "blanditiis labore minus ut explicabo non architecto eum?",
      image: "/images/3.jpg",
    },
    {
      name: "Tinolang bangus",
      description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit",
      image: "/images/4.jpg",
      averageRating: 4,
    },
    {
      name: "Sinanlag nga bugas",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit," +
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit",
      image: "/images/6.jpg",
      averageRating: 2,
    },
  ];

  return {
    props: { items },
    revalidate: false,
  };
};

const Recipes: NextPage<Props> = ({ items }) => {
  return (
    <React.Fragment>
      <Head>
        <title>Recipes</title>
      </Head>

      <div className="min-h-screen flex flex-col bg-gray-100">
        <Header />

        <main className="flex-grow">
          <div className="flex">
            <section className="p-8 flex flex-col gap-8">
              <Avatar />

              <Button variant="primary" fullWidth>
                <PencilSquareIcon />
                <span>Create New</span>
              </Button>

              <Navbar />

              <Footer />
            </section>

            <section className="p-8 w-full">
              <main className="grid gap-6 grid-cols-1 lg:grid-cols-2 grid-flow-row-dense">
                {items.map((item) => (
                  <Item {...item} key={item.name} />
                ))}
              </main>
            </section>
          </div>
        </main>
      </div>
    </React.Fragment>
  );
};

const Item = ({ name, image, description, averageRating }: Item) => {
  return (
    <article className="bg-white shadow-md" key={name}>
      <div className="w-full h-[250px] relative overflow-hidden">
        <Image
          src={image}
          alt=""
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </div>

      <div className="p-4">
        <h4 className="text-xl">{name}</h4>
        <p className="text-sm text-gray-700 truncate">{description}</p>
        <div className="mt-2">
          <Rating value={averageRating} />
        </div>
      </div>
    </article>
  );
};

const Footer = () => {
  const Divider = () => <li className="w-1 h-1 bg-gray-300 rounded-full" />;

  return (
    <div>
      <ul className="flex flex-wrap gap-1 items-center text-sm max-w-[200px]">
        <li>
          <a>About</a>
        </li>
        <Divider />
        <li>
          <a>Cookies and Terms</a>
        </li>
        <Divider />
        <li>
          <a>Contact us</a>
        </li>
        <Divider />
        <li>
          <a>Help</a>
        </li>
      </ul>
    </div>
  );
};

const Avatar = () => {
  return (
    <div className="w-[200px] h-[200px] relative">
      <div className="relative w-full h-full rounded-full overflow-hidden">
        <Image
          src="/images/pp.jpg"
          alt=""
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </div>

      <button className="z-10 absolute right-1 bottom-1 bg-gradient-to-r from-cyan-500 to-blue-300 rounded-full p-1 border-4 border-gray-100">
        <CameraIcon className="h-8 w-8 fill-white" />
      </button>
    </div>
  );
};

const Hamburger = () => {
  return (
    <button>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
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
  const unwrapped = (
    <a href="#" className="flex items-center gap-2 text-lg" {...props}>
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

export default Recipes;
