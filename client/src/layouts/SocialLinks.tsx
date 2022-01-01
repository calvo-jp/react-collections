import clsx from 'clsx';
import * as React from 'react';
import FacebookIcon from 'widgets/icons/Facebook';
import InstagramIcon from 'widgets/icons/Instagram';
import TwitterIcon from 'widgets/icons/Twitter';
import YoutubeIcon from 'widgets/icons/Youtube';

type BaseProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLUListElement>,
  HTMLUListElement
>;

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

interface SocialsProp extends BaseProps {
  /** size of icons */
  size?: Size;

  /** true to set icons to black */
  dark?: boolean;

  /** gap of icons */
  spacing?: number;
}

const sizes = {
  xs: 'w-4 h-4',
  sm: 'w-5 h-5',
  md: 'w-6 h-6',
  lg: 'w-7 h-7',
  xl: 'w-8 h-8',
  xxl: 'w-9 h-9',
};

const SocialLinks: React.FC<SocialsProp> = ({
  size,
  dark,
  spacing,
  className,
  ...props
}) => {
  /** icon classes */
  const iconClsnms = clsx([
    // color
    dark && 'fill-black',
    !dark && 'fill-white',

    // size
    !size && sizes.md,
    size && sizes[size],
  ]);

  return (
    <ul
      className={clsx(
        'flex gap-2 items-center',
        spacing && 'gap-'.concat(spacing.toString()),
        className
      )}
      {...props}
    >
      <li>
        <SocialLink href="https://www.facebook.com/recipes">
          <FacebookIcon className={iconClsnms} />
        </SocialLink>
      </li>
      <li>
        <SocialLink href="https://www.instagram.com/recipes">
          <InstagramIcon className={iconClsnms} />
        </SocialLink>
      </li>
      <li>
        <SocialLink href="https://www.twitter.com/recipes">
          <TwitterIcon className={iconClsnms} />
        </SocialLink>
      </li>
      <li>
        <SocialLink href="https://www.youtube.com/recipes">
          <YoutubeIcon className={iconClsnms} />
        </SocialLink>
      </li>
    </ul>
  );
};

type SocialLinkProps = React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

const SocialLink: React.FC<SocialLinkProps> = ({
  href,
  className,
  children,
  ...props
}) => {
  return (
    <a
      href={href}
      className={clsx('block', className)}
      target="_blank"
      rel="noReferrer"
      {...props}
    >
      {children}
    </a>
  );
};

export default SocialLinks;
