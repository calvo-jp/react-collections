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
    <React.Fragment>
      <Header />

      <div className={clsx('min-h-screen flex', !transparent && 'bg-gray-100')}>
        <Sidebar />

        <main className="p-8 grow">{children}</main>
      </div>
    </React.Fragment>
  );
};

export default Layout;
