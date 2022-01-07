import * as React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {}

/** base layout */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <React.Fragment>
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="p-8 grow">{children}</main>
      </div>
    </React.Fragment>
  );
};

export default Layout;
