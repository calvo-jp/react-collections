import Footer from 'layouts/Footer';
import Header from 'layouts/Header';
import Head from 'next/head';
import * as React from 'react';

const NotFound = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Error 404 - Page Not Found</title>
      </Head>

      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow flex justify-center items-center">
          <div className="text-9xl font-bold text-gray-300">4O4</div>
        </main>

        <Footer />
      </div>
    </React.Fragment>
  );
};

export default NotFound;
