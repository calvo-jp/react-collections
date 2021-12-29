import * as React from "react";

type ChevronLeftIconProps = React.SVGProps<SVGSVGElement>;

const ChevronLeftIcon: React.FC<ChevronLeftIconProps> = ({
  children,
  ...props
}) => {
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
        d="M9 5l7 7-7 7"
      />
    </svg>
  );
};

export default ChevronLeftIcon;
