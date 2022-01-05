import '@fontsource/m-plus-code-latin/100.css';
import '@fontsource/m-plus-code-latin/200.css';
import '@fontsource/m-plus-code-latin/300.css';
import '@fontsource/m-plus-code-latin/400.css';
import '@fontsource/m-plus-code-latin/500.css';
import '@fontsource/m-plus-code-latin/600.css';
import '@fontsource/m-plus-code-latin/700.css';
import StoreProvider from 'hooks/store/provider';
import Loader from 'layouts/Loader';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import * as React from 'react';
import 'tailwindcss/tailwind.css';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <React.Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Find or share amazing recipes anytime for free"
        />
        <meta
          name="keywords"
          content={[
            'recipe',
            'how to',
            'share',
            'cook',
            'food',
            'find',
            'free',
            'chef',
            'tasty',
            'amazing',
            'delicious',
          ].join()}
        />
      </Head>

      <StoreProvider>
        <Loader />
        <Component {...pageProps} />
      </StoreProvider>
    </React.Fragment>
  );
};

export default App;
