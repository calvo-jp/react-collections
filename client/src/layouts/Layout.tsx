import CloseIcon from '@heroicons/react/solid/XIcon';
import clsx from 'clsx';
import * as React from 'react';
import onScrollReveal from 'utils/onScrollReveal';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  /** remove background color */
  transparent?: boolean;
}

/** base layout */
const Layout: React.FC<LayoutProps> = ({ transparent, children }) => {
  const headerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (headerRef.current) onScrollReveal(headerRef.current);
  }, []);

  return (
    <div className={clsx('min-h-screen', !transparent && 'bg-gray-100')}>
      <div className="sticky top-0 z-40" ref={headerRef}>
        <Header />
      </div>

      <div className="md:flex">
        <div className="bg-black bg-opacity-70 hidden bottom-0 top-0 left-0 right-0 z-50 md:static md:bg-transparent">
          <div className="bg-white w-fit h-full md:bg-transparent">
            <Sidebar />
          </div>
        </div>

        <main className="p-8 grow">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
