import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import Rating from "widgets/Rating";
import Searchbar from "widgets/Searchbar";

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

              <p className="text-xl">
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
              <WavyBorder />
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

const WavyBorder = () => {
  return (
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
  );
};

interface CardProps {
  title: string;
  description: string;
  image: string;
}

const Card: React.FC<CardProps> = ({ title, description, image }) => {
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
          <h3 className="text-xl">{title}</h3>
          <p className="text-sm">{description}</p>
        </div>

        <div className="mt-2">
          <Rating value={5} />
        </div>
      </div>
    </div>
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
          <Searchbar className="w-[300px]" />

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
