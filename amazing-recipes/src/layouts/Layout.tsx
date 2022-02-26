import clsx from "clsx";
import * as React from "react";
import Header from "./Header";

interface LayoutProps {
  /**
   *
   * remove container's gray background color
   * which is set to be the default
   *
   */
  transparent?: boolean;
}

/** base layout */
const Layout: React.FC<LayoutProps> = ({ transparent, children }) => {
  return (
    <div
      className={clsx(
        "min-h-screen",
        !transparent && "bg-gray-100 dark:bg-zinc-900",
        transparent && "bg-transparent"
      )}
    >
      <Header navbar />

      <div className="flex">
        <div className="hidden shrink-0 grow-0 basis-navbar lg:block" />
        <main className="grow p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
