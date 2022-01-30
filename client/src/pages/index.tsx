import Brand from 'layouts/Brand';
import Footer from 'layouts/Footer';
import Head from 'next/head';
import Link from 'next/link';
import * as React from 'react';

const Landing = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Recipes - Find or search amazing recipes</title>
      </Head>

      <div className="min-h-screen flex flex-col">
        <header className="h-[50px] shadow-md z-10 flex items-center px-8 justify-between">
          <Brand />

          <div className="flex gap-4 items-center">
            <Link href="/login" passHref>
              <a>Login</a>
            </Link>

            <Link href="/create-account" passHref>
              <a className="border-2 border-blue-400 text-blue-500 p-1 px-4 rounded-md font-bold hover:bg-blue-400 hover:text-white">
                Sign up
              </a>
            </Link>
          </div>
        </header>

        <main className="flex-grow"></main>

        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Landing;
