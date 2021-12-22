import "assets/fonts/source-sans-pro/source-sans-pro.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import * as React from "react";
import "tailwindcss/tailwind.css";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <React.Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Component {...pageProps} />
    </React.Fragment>
  );
};

export default MyApp;
