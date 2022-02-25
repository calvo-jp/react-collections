import ChevronLeftIcon from "@heroicons/react/outline/ChevronLeftIcon";
import useQuery from "hooks/useQuery";
import Link from "next/link";
import * as React from "react";

/**
 *
 * header which purpose is to somewhat have a back button
 *
 */
const HeaderTwo: React.FC = ({ children }) => {
  const redirect = useQuery("redirect").get("redirect") || "/";

  return (
    <header className="sticky top-0 z-50 flex h-header items-center justify-between bg-white px-3 shadow-md dark:border-b dark:border-zinc-700 dark:bg-zinc-800 dark:shadow-none">
      <Link href={redirect} passHref>
        <a className="flex items-center gap-1">
          <ChevronLeftIcon className="h-5 w-5" />
          <span>Go back</span>
        </a>
      </Link>

      <div>{children}</div>
    </header>
  );
};

export default HeaderTwo;
