import { StarIcon } from '@heroicons/react/solid';
import world from 'assets/world.svg';
import Brand from 'layouts/Brand';
import Footer from 'layouts/Footer';
import Searchbar from 'layouts/Searchbar';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import FacebookIcon from 'widgets/icons/Facebook';
import InstagramIcon from 'widgets/icons/Instagram';
import MessengerIcon from 'widgets/icons/Messenger';
import TwitterIcon from 'widgets/icons/Twitter';
import YoutubeIcon from 'widgets/icons/Youtube';

const Landing = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Recipes - Find or search amazing recipes</title>
      </Head>

      <div className="min-h-screen">
        <header className="h-[50px] shadow-md z-20 flex items-center px-8 justify-between">
          <Brand />

          <div className="flex gap-4 items-center">
            <Link href="/login" passHref>
              <a>Log in</a>
            </Link>

            <Link href="/create-account" passHref>
              <a className="border border-blue-400 text-blue-500 p-1 px-4 rounded-md hover:bg-blue-400 hover:text-white">
                Join us
              </a>
            </Link>
          </div>
        </header>

        <main>
          <div className="bg-gradient-to-r from-sky-500 via-blue-400 to-purple-400 p-12 sm:p-16 md:p-24">
            <div className="flex items-center justify-center gap-32 text-white">
              <section className="grow">
                <h1 className="text-5xl font-extrabold">
                  Find or share recipes
                </h1>

                <p className="mt-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Asperiores praesentium necessitatibus neque quam ad placeat
                  harum consequatur porro! Et, iure.
                </p>

                <div className="mt-4 flex gap-2">
                  {[FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon].map(
                    (SVGICon, index) => (
                      <a href="#" key={index}>
                        <SVGICon className="fill-white h-6 w-6" />
                      </a>
                    )
                  )}
                </div>
              </section>

              <section className="relative basis-[400px] grow-0 shrink-0 hidden lg:block">
                <Image src={world} alt="" />
              </section>
            </div>
          </div>

          <div className="max-w-[900px] mx-auto my-16 sticky top-0"></div>
        </main>

        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Landing;
