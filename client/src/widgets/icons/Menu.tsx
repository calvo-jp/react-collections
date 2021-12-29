import * as React from "react";

type MenuIconProps = React.SVGProps<SVGSVGElement>;

const MenuIcon: React.FC<MenuIconProps> = ({ children, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      width={16}
      height={16}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );
};

export default MenuIcon;
