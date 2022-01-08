import clsx from 'clsx';
import * as React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  /** remove background color */
  transparent?: boolean;
}

/** base layout */
const Layout: React.FC<LayoutProps> = ({ transparent, children }) => {
  return (
    <div className={clsx('min-h-screen', !transparent && 'bg-gray-100')}>
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="p-8 grow">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
