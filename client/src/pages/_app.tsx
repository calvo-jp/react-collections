import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import GlobalProvider from "hooks/store/GlobalProvider";
import type { AppProps } from "next/app";
import Head from "next/head";
import * as React from "react";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const theme = createTheme({
    typography: {
      fontFamily: ["'IBM Plex Sans'", "sans-serif"].join(),
    },
  });

  return (
    <React.Fragment>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <CssBaseline />

      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <GlobalProvider>
            <Component {...pageProps} />
          </GlobalProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default App;
