import Link from 'next/link';
import * as React from 'react';

const HelpLinks = () => {
  const links: [path: string, label: string][] = [
    ['/about', 'About'],
    ['/terms', 'Cookies and Terms'],
    ['/contact', 'Contact us'],
    ['/help', 'Help'],
  ];

  return (
    <ul className="flex flex-wrap gap-x-2 gap-y-1 items-center text-sm">
      {links.map(([path, label], idx, arr) => {
        const divider = idx + 1 < arr.length;

        return (
          <React.Fragment key={idx}>
            <li>
              <Link href={path} passHref>
                <a className="hover:text-blue-600 dark:hover:text-sky-400">
                  {label}
                </a>
              </Link>
            </li>

            {divider && (
              <li>
                <span className="block w-1 h-1 bg-gray-300 rounded-full" />
              </li>
            )}
          </React.Fragment>
        );
      })}
    </ul>
  );
};

export default HelpLinks;
