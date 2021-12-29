import Head from "next/head";
import Link from "next/link";
import * as React from "react";
import ChevronLeftIcon from "widgets/icons/ChevronLeft";

const Recipe = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Adobong Manok</title>
      </Head>

      <div>
        <Header />
      </div>
    </React.Fragment>
  );
};

const Header = () => {
  return (
    <header className="bg-white shadow-md z-10">
      <div className="py-4 px-8">
        <Link href="/recipes" passHref>
          <a className="flex items-center gap-1">
            <ChevronLeftIcon />
            Go back
          </a>
        </Link>
      </div>
    </header>
  );
};

export default Recipe;
