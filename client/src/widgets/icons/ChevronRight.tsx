import * as React from "react";

type ChevronRightIconProps = React.SVGProps<SVGSVGElement>;

const ChevronRightIcon: React.FC<ChevronRightIconProps> = ({
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
        d="M15 19l-7-7 7-7"
      />
    </svg>
  );
};

export default ChevronRightIcon;
