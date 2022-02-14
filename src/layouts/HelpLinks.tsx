import clsx from 'clsx';
import NextLink from 'next/link';
import * as React from 'react';

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const sizes: Record<Size, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-md',
  lg: 'text-lg',
  xl: 'text-xl',
};

interface HelpLinksProps {
  /** controls fontsize */
  size?: Size;

  /** controls gap of links */
  spacing?: number;
}

const HelpLinks: React.FC<HelpLinksProps & React.ComponentProps<'ul'>> = ({
  size,
  spacing,
  className,
  ...props
}) => {
  return (
    <ul
      className={clsx(
        'flex flex-wrap gap-x-2 gap-y-1 items-center',
        !spacing && 'gap-2',
        spacing && 'gap-' + spacing,
        !size && sizes.sm,
        size && sizes[size],
        className
      )}
      {...props}
    >
      <li>
        <Link href="/about">About</Link>
      </li>
      <li>
        <Divider />
      </li>
      <li>
        <Link href="/cookies-and-terms">Cookies and Terms</Link>
      </li>
      <li>
        <Divider />
      </li>
      <li>
        <Link href="/contact-us">Contact us</Link>
      </li>
      <li>
        <Divider />
      </li>
      <li>
        <Link href="/help">Help</Link>
      </li>
    </ul>
  );
};

interface LinkProps {
  href: string;
}

const Link: React.FC<LinkProps> = ({ href, children }) => {
  return (
    <NextLink href={href} passHref>
      <a className="hover:text-blue-600 dark:hover:text-sky-400">{children}</a>
    </NextLink>
  );
};

const Divider = () => {
  return <div className="w-1 h-1 bg-gray-300 rounded-full" />;
};

export default HelpLinks;
