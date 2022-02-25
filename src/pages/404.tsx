import HeaderTwo from "layouts/HeaderTwo";
import Head from "next/head";
import * as React from "react";

const NotFound = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Error 404 - Page Not Found</title>
      </Head>

      <div className="flex min-h-screen flex-col">
        <HeaderTwo />

        <main className="flex flex-grow items-center justify-center">
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
