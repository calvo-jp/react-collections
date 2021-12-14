import "assets/fonts/source-sans-pro/source-sans-pro.css";
import type { AppProps } from "next/app";
import * as React from "react";
import "tailwindcss/tailwind.css";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default MyApp;
