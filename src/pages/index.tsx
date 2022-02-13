import ArrowRightIcon from '@heroicons/react/solid/ArrowRightIcon';
import logo from 'assets/logo.png';
import wallpaper from 'assets/wallpaper.jpg';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

const Landing = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Recipes - Find or search amazing recipes</title>
      </Head>

      <div className="min-h-screen relative text-white flex flex-col p-8 px-12">
        <BackgroundGradient />
        <BackgroundImage />

        <header className="flex items-center justify-between">
          <div>
            <Image src={logo} alt="" width={48} height={48} />
          </div>

          <div>
            <Link href="/login" passHref>
              <a className="text-lg">Login</a>
            </Link>
          </div>
        </header>

        <main className="grow flex items-center">
          <section className="max-w-xl">
            <Article />
          </section>
        </main>
      </div>
    </React.Fragment>
  );
};

const BackgroundImage = () => {
  return (
    <div className="absolute w-full h-full top-0 left-0 opacity-10 -z-[1] [transform:rotateY(180deg)]">
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
    <div className="absolute w-full h-full top-0 left-0 bg-gradient-to-r from-sky-800 via-blue-600 to-purple-400 -z-[2]" />
  );
};

const Article = () => {
  return (
    <section>
      <h1 className="text-5xl font-extrabold">Find or share recipes</h1>

      <p className="mt-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
        praesentium necessitatibus neque quam ad placeat harum consequatur
        porro! Et, iure.
      </p>

      <div>
        <Link href="/create-account" passHref>
          <a className="flex gap-4 items-center w-fit bg-black bg-opacity-30 p-3 px-6 mt-4 rounded-full ">
            <span>Register now</span>
            <ArrowRightIcon className="w-4 h-4" />
          </a>
        </Link>
      </div>
    </section>
  );
};

export default Landing;
