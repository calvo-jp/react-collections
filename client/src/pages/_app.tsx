import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalProvider from "hooks/store/GlobalProvider";
import type { AppProps } from "next/app";
import Head from "next/head";
import * as React from "react";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <React.Fragment>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <CssBaseline />

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <GlobalProvider>
          <Component {...pageProps} />
        </GlobalProvider>
      </LocalizationProvider>
    </React.Fragment>
  );
};

export default MyApp;
