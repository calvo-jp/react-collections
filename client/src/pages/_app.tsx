import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/700.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import * as React from 'react';
import 'tailwindcss/tailwind.css';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <React.Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="url, shortener, url shortener" />
        <meta
          name="description"
          content="Create a shorter and more meaningful url"
        />
      </Head>

      <div className="min-h-screen bg-white text-gray-700 font-sans">
        <Component {...pageProps} />
      </div>
    </React.Fragment>
  );
};

export default MyApp;
