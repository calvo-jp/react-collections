import ArrowRightIcon from "@heroicons/react/solid/ArrowRightIcon";
import wallpaper from "assets/wallpaper.jpg";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import LogoIcon from "widgets/icons/logo";
import DarkThemeLogoIcon from "widgets/icons/logo/DarkThemeLogo";

const Landing = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Amazing Recipes - Find or search amazing recipes</title>
      </Head>

      <div className="relative flex min-h-screen flex-col text-zinc-200">
        <BackgroundGradient />
        <BackgroundImage />

        <header className="z-10 flex justify-between p-8">
          <Link href="/" passHref>
            <a>
              <DarkThemeLogoIcon />
            </a>
          </Link>

          <div>
            <Link href="/login" passHref>
              <a className="text-lg">Login</a>
            </Link>
          </div>
        </header>

        <main className="z-10 flex grow items-center p-8">
          <section className="max-w-xl">
            <Article />
          </section>
        </main>

        <Footer />
      </div>
    </React.Fragment>
  );
};

const FooterBackgroundGradient = () => {
  return (
    <div className="absolute left-0 top-0 -z-10 h-full w-full bg-gradient-to-r from-black to-sky-500 opacity-25" />
  );
};

const currentYear = new Date().getFullYear();

const BackgroundImage = () => {
  return (
    <div className="absolute top-0 left-0 -z-[1] h-full w-full [transform:rotateY(180deg)]">
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
    <div className="absolute left-0 top-0 h-full w-full bg-black bg-opacity-80" />
  );
};

const Footer = () => {
  return (
    <footer className="relative z-10 flex items-center justify-between py-4 px-8">
      <FooterBackgroundGradient />

      <div className="text-sm">&copy; Amazing Recipes {currentYear}</div>
    </footer>
  );
};

const Article = () => {
  return (
    <section className="">
      <h1 className="text-4xl font-extrabold md:text-5xl">
        Find or share recipes
      </h1>

      <p className="mt-2 font-semilight md:text-lg">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam,
        eveniet placeat rem dolor amet iure?
      </p>

      <div>
        <Link href="/create-account" passHref>
          <a className="mt-4 flex w-fit items-center gap-4 rounded-full bg-black bg-opacity-50 p-3 px-6 ">
            <span>Register now</span>
            <ArrowRightIcon className="h-4 w-4" />
          </a>
        </Link>
      </div>
    </section>
  );
};

export default Landing;
