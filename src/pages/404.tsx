import HeaderTwo from 'layouts/HeaderTwo';
import Head from 'next/head';
import * as React from 'react';

const NotFound = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Error 404 - Page Not Found</title>
      </Head>

      <div className="flex flex-col min-h-screen">
        <HeaderTwo />

        <main className="flex-grow flex justify-center items-center">
          <div>
            <h1 className="text-9xl font-extrabold text-gray-200 dark:text-zinc-600">
              404
            </h1>
          </div>
        </main>
      </div>
    </React.Fragment>
  );
};

export default NotFound;
