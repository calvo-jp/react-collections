import clsx from "clsx";
import * as React from "react";

type BaseProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type Variant = "primary" | "secondary";

interface ButtonProps extends BaseProps {
  variant?: Variant;
}

const Button: React.FC<ButtonProps> = ({
  variant,
  children,
  className,
  ...props
}) => {
  const primary = variant === "primary";

  return (
    <button
      className={clsx(
        "p-2 outline-none",
        !props.disabled &&
          primary &&
          "text-white border border-blue-500 bg-blue-500 focus:ring-4 focus:ring-blue-200",
        props.disabled && "bg-gray-100 text-gray-400 cursor-not-allowed",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
