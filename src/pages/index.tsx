import ArrowRightIcon from '@heroicons/react/solid/ArrowRightIcon';
import wallpaper from 'assets/wallpaper.jpg';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import LogoIcon from 'widgets/icons/logo';

const Landing = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Amazing Recipes - Find or search amazing recipes</title>
      </Head>

      <div className="min-h-screen relative flex flex-col">
        <BackgroundGradient />
        <BackgroundImage />

        <header className="flex justify-between z-10 p-8">
          <Link href="/" passHref>
            <a>
              <LogoIcon />
            </a>
          </Link>

          <div>
            <Link href="/login" passHref>
              <a className="text-lg">Login</a>
            </Link>
          </div>
        </header>

        <main className="grow flex items-center z-10 p-8">
          <section className="max-w-xl">
            <Article />
          </section>
        </main>

        <footer className="z-10 relative py-4 px-8 flex justify-between items-center">
          <FooterBackgroundGradient />

          <div className="text-sm">&copy; Amazing Recipes {currentYear}</div>
        </footer>
      </div>
    </React.Fragment>
  );
};

const FooterBackgroundGradient = () => {
  return (
    <div className="bg-gradient-to-r from-black to-sky-500 absolute w-full h-full left-0 top-0 opacity-25 -z-10" />
  );
};

const currentYear = new Date().getFullYear();

const BackgroundImage = () => {
  return (
    <div className="absolute w-full h-full top-0 left-0 -z-[1] [transform:rotateY(180deg)]">
      <Image
        src={wallpaper}
        alt=""
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        draggable={false}
      />
    </div>
  );
};

const BackgroundGradient = () => {
  return (
    <div className="absolute w-full h-full left-0 top-0 bg-black bg-opacity-80" />
  );
};

const Article = () => {
  return (
    <section className="">
      <h1 className="text-4xl md:text-5xl font-extrabold">
        Find or share recipes
      </h1>

      <p className="mt-2 md:text-lg font-semilight">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam,
        eveniet placeat rem dolor amet iure?
      </p>

      <div>
        <Link href="/create-account" passHref>
          <a className="flex gap-4 items-center w-fit bg-black bg-opacity-50 p-3 px-6 mt-4 rounded-full ">
            <span>Register now</span>
            <ArrowRightIcon className="w-4 h-4" />
          </a>
        </Link>
      </div>
    </section>
  );
};

export default Landing;
