import clsx from "clsx";
import Link from "next/link";
import * as React from "react";

type BaseProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLUListElement>,
  HTMLUListElement
>;

type Size = "sm" | "md" | "lg" | "xl";

interface HelpLinksProps extends BaseProps {
  /** controls fontsize */
  size?: Size;
}

const sizes = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-md",
  lg: "text-lg",
  xl: "text-xs",
};

const HelpLinks: React.FC<HelpLinksProps> = ({ size, className, ...props }) => {
  return (
    <ul
      className={clsx(
        "flex flex-wrap gap-x-2 gap-y-1 items-center text-sm",
        !size && sizes.sm,
        size && sizes[size],
        className
      )}
    >
      <li>
        <FooterLink href="/about">About</FooterLink>
      </li>
      <li>
        <FooterLinkDivider />
      </li>
      <li>
        <FooterLink href="/cookies-and-terms">Cookies and Terms</FooterLink>
      </li>
      <li>
        <FooterLinkDivider />
      </li>
      <li>
        <FooterLink href="/contact-us">Contact us</FooterLink>
      </li>
      <li>
        <FooterLinkDivider />
      </li>
      <li>
        <FooterLink href="/help">Help</FooterLink>
      </li>
    </ul>
  );
};

interface FooterLinkProps {
  href: string;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, children }) => {
  return (
    <Link href={href} passHref>
      <a className="hover:text-blue-600">{children}</a>
    </Link>
  );
};

const FooterLinkDivider = () => {
  return <div className="w-1 h-1 bg-gray-300 rounded-full" />;
};

export default HelpLinks;
