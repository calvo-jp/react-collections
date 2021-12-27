import GlobalProvider from "hooks/store/GlobalProvider";
import type { AppProps } from "next/app";
import Head from "next/head";
import * as React from "react";
import "tailwindcss/tailwind.css";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <React.Fragment>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <GlobalProvider>
        <Component {...pageProps} />
      </GlobalProvider>
    </React.Fragment>
  );
};

export default MyApp;
