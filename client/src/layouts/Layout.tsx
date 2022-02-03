import clsx from 'clsx';
import * as React from 'react';
import Header from './Header';

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
        'min-h-screen',
        !transparent && 'bg-gray-100',
        transparent && 'bg-transparent'
      )}
    >
      <Header sidebar />

      <div className="flex">
        {/*
         *
         * This element is based on the height of Sidebar
         * which is invoked in the Header.
         * This serves as the margin inorder for the main
         * to be fully visible in medium breakpoint
         * and won't be covered by the Sidebar
         * which is positioned fixed
         *
         */}
        <div className="hidden lg:block basis-[265px] shrink-0 grow-0" />

        <main className="p-4 md:p-6 lg:p-8 grow">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
