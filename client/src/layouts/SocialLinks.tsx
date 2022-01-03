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

interface SocialsProp extends BaseProps {
  /** gap of icons */
  spacing?: number;
}

const SocialLinks: React.FC<SocialsProp> = ({
  spacing,
  className,
  ...props
}) => {
  return (
    <ul
      className={clsx(
        'flex gap-2 items-center',
        spacing && 'gap-' + spacing,
        className
      )}
      {...props}
    >
      <li>
        <SocialLink href="https://www.facebook.com/recipes">
          <FacebookIcon className="w-6 h-6 fill-white" />
        </SocialLink>
      </li>
      <li>
        <SocialLink href="https://www.instagram.com/recipes">
          <InstagramIcon className="w-6 h-6 fill-white" />
        </SocialLink>
      </li>
      <li>
        <SocialLink href="https://www.twitter.com/recipes">
          <TwitterIcon className="w-6 h-6 fill-white" />
        </SocialLink>
      </li>
      <li>
        <SocialLink href="https://www.youtube.com/recipes">
          <YoutubeIcon className="w-6 h-6 fill-white" />
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
  children,
  className,
  ...props
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noReferrer"
      className={clsx('block', className)}
      {...props}
    >
      {children}
    </a>
  );
};

export default SocialLinks;
