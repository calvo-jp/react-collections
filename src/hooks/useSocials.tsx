import * as React from 'react';
import FacebookIcon from 'widgets/icons/Facebook';
import InstagramIcon from 'widgets/icons/Instagram';
import TwitterIcon from 'widgets/icons/Twitter';
import YoutubeIcon from 'widgets/icons/Youtube';

type SVGIcon = React.FC<React.SVGProps<SVGSVGElement>>;

const useSocials = (): [url: string, icon: SVGIcon][] => [
  ['https://www.facebook.com/recipes', FacebookIcon],
  ['https://www.instagram.com/recipes', InstagramIcon],
  ['https://www.twitter.com/recipes', TwitterIcon],
  ['https://www.youtube.com/recipes', YoutubeIcon],
];

export default useSocials;
