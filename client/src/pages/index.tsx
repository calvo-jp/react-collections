import clsx from "clsx";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

const Landing = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Recipes - Find or search amazing recipes</title>
      </Head>

      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <section className="h-[500px] relative">
            <div className="absolute h-full z-20 max-w-[800px] left-0 right-0 mx-auto p-8 flex flex-col justify-center text-white">
              <h2 className="font-bold text-4xl uppercase">Recipes</h2>

              <p className="text-xl font-light">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
                quis repellat culpa rem, asperiores soluta.
              </p>

              <div className="flex text-sm mt-6 items-center">
                <h5 className="">Find as here</h5>
                <div className="border-t-2 border-white w-4 mx-4 border-opacity-60" />
                <ul className="flex gap-2 items-center">
                  <li>
                    <a href="#">Facebook</a>
                  </li>
                  <li className="w-[3px] h-[3px] bg-white bg-opacity-60 rounded-full" />

                  <li>
                    <a href="#">Instagram</a>
                  </li>
                  <li className="w-[3px] h-[3px] bg-white bg-opacity-60 rounded-full" />

                  <li>
                    <a href="#">Twitter</a>
                  </li>
                  <li className="w-[3px] h-[3px] bg-white bg-opacity-60 rounded-full" />
                  <li>
                    <a href="#">Youtube</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-cyan-500 to-blue-400 absolute top-0 left-0 w-full h-full" />

            <div className="absolute bottom-0 left-0 w-full overflow-hidden rotate-180">
              <svg
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                className="block relative h-[83px]"
                style={{ width: "calc(122% + 1.3px)" }}
              >
                <path
                  d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                  className="fill-white"
                />
              </svg>
            </div>
          </section>

          <section className="max-w-[1200px] mx-auto mt-10 p-8">
            <div className="flex gap-4 justify-center">
              <Link href="/recipes/1" passHref>
                <a>
                  <Card
                    title="Adobong manok"
                    description="Manamit kg mananam nga manok ni brad sito"
                    image="/images/2.jpg"
                  />
                </a>
              </Link>

              <Link href="/recipes/1" passHref>
                <a>
                  <Card
                    title="Homeburger"
                    description="Delicious hamburger with just pandesal, petsay and meatloaf"
                    image="/images/1.jpg"
                  />
                </a>
              </Link>

              <Link href="/recipes/1" passHref>
                <a>
                  <Card
                    title="Fried egg"
                    description="Korina's stupid fried egg recipe with her pathetic husband shit"
                    image="/images/3.jpg"
                  />
                </a>
              </Link>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </React.Fragment>
  );
};

interface CardProps {
  title: string;
  description: string;
  image: string;
}

const Card = ({ title, description, image }: CardProps) => {
  return (
    <div className="w-[325px] flex flex-col">
      <div className="relative flex-grow h-[325px]">
        <Image
          src={image}
          alt=""
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </div>

      <div className="p-2">
        <div>
          <h3 className="font-bold text-xl">{title}</h3>
          <p className="text-sm">{description}</p>
        </div>

        <Rating value={4} className="mt-2" />
      </div>
    </div>
  );
};

interface RatingProps
  extends Omit<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLSpanElement>,
      HTMLSpanElement
    >,
    "children" | "onChange" | "style"
  > {
  value: number;
  onChange?: (value: number) => void;
}

const Rating = ({ value, onChange, className }: RatingProps) => {
  const handleChange = onChange || function (..._args: any) {};

  return (
    <span className="flex">
      {[1, 2, 3, 4, 5].map((index) => (
        <svg
          key={index}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={clsx(
            "h-5 w-5 cursor-pointer transition-colors duration-300",
            index > value && "text-gray-300 hover:text-amber-400",
            index <= value && "text-amber-500 hover:text-amber-400",
            className
          )}
          onClick={() => handleChange(index)}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
};

const Header = () => {
  return (
    <header className="shadow-md z-10">
      <div className="flex justify-between items-center gap-4 py-2 px-8">
        <Link href="/" passHref>
          <a className="text-xl">Recipe</a>
        </Link>

        <div className="flex items-center gap-4">
          <div className="p-2 border border-gray-200 bg-white flex items-center w-[350px] gap-2">
            <div className="flex-grow">
              <input
                type="search"
                name=""
                id=""
                placeholder="Search"
                className="outline-none w-full"
              />
            </div>

            <div className="h-4 my-auto border-l border-gray-200" />

            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mx-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>

          <nav>
            <ul className="flex gap-4">
              <li>
                <Link href="/login" passHref>
                  <a className="font-light">Login</a>
                </Link>
              </li>
              <li>
                <Link href="/create-account" passHref>
                  <a className="uppercase">Sign up</a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="p-4 px-8 flex items-center justify-between text-sm">
      <p>&copy; Recipes 2021. All rights reserved</p>

      <ul className="flex gap-2 items-center">
        <li>
          <a href="">About</a>
        </li>
        <li className="w-1 h-1 bg-gray-300 rounded-full" />
        <li>
          <a href="">Cookies and Terms</a>
        </li>
        <li className="w-1 h-1 bg-gray-300 rounded-full" />
        <li>
          <a href="">Help</a>
        </li>
      </ul>
    </footer>
  );
};

export default Landing;
