import * as React from 'react';
import FacebookIcon from 'widgets/icons/Facebook';
import InstagramIcon from 'widgets/icons/Instagram';
import TwitterIcon from 'widgets/icons/Twitter';
import YoutubeIcon from 'widgets/icons/Youtube';

type SVGIcon = React.FC<React.SVGProps<SVGSVGElement>>;

const SocialLinks = () => {
  const items: [string, SVGIcon][] = [
    ['https://www.facebook.com/recipes', FacebookIcon],
    ['https://www.instagram.com/recipes', InstagramIcon],
    ['https://www.twitter.com/recipes', TwitterIcon],
    ['https://www.youtube.com/recipes', YoutubeIcon],
  ];

  return (
    <ul className="flex gap-2 items-center">
      {items.map(([href, icon]) => (
        <li key={href}>
          <SocialLink href={href} icon={icon} />
        </li>
      ))}
    </ul>
  );
};

interface SocialLinkProps {
  href: string;
  icon: SVGIcon;
}

const SocialLink = ({ href, icon: SocialIcon }: SocialLinkProps) => {
  return (
    <a href={href} target="_blank" rel="noReferrer" className="block">
      {<SocialIcon className="w-6 h-6 fill-white" />}
    </a>
  );
};

export default SocialLinks;
