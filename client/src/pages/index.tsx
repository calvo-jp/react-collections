import Footer from 'layouts/Footer';
import Header from 'layouts/Header';
import SocialLinks from 'layouts/SocialLinks';
import Head from 'next/head';
import * as React from 'react';

const Landing = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Recipes - Find or search amazing recipes</title>
      </Head>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow">
          <Banner />
        </main>

        <Footer />
      </div>
    </React.Fragment>
  );
};

const Banner = () => {
  return (
    <section className="h-[500px] relative">
      <article className="absolute h-full z-20 max-w-[800px] left-0 right-0 mx-auto p-8 flex flex-col justify-center text-white">
        <h2 className="font-bold text-4xl uppercase">Recipes</h2>

        <p className="text-md mt-2">
          Find or share amazing recipes anytime for free
        </p>

        <SocialLinks className="mt-4" />
      </article>

      <GradientOverlay />
      <WavyBorder />
    </section>
  );
};

const GradientOverlay = () => {
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-400 absolute top-0 left-0 w-full h-full" />
  );
};

const WavyBorder = () => {
  return (
    <div className="absolute bottom-0 left-0 w-full overflow-hidden rotate-180">
      <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="block relative h-[83px]"
        style={{ width: 'calc(122% + 1.3px)' }}
      >
        <path
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
          className="fill-white"
        />
      </svg>
    </div>
  );
};

export default Landing;
