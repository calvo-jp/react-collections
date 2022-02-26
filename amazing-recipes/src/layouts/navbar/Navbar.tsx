import avatar from "assets/samples/images/avatar.jpg";
import clsx from "clsx";
import useStoreState from "hooks/store/useState";
import Link from "next/link";
import * as React from "react";
import Avatar from "../Avatar";
import CreateButton from "./CreateButton";
import HelpLinks from "./HelpLinks";
import Menu from "./Menu";

const Navbar = () => {
  const [globalState] = useStoreState();

  const opened = globalState.navbarOpened;

  return (
    <div
      className={clsx(
        "fixed top-0 left-0 z-[80] h-full w-full bg-black bg-opacity-60 md:z-0 lg:block lg:w-fit lg:bg-transparent",
        !opened && "hidden",
        opened && "block"
      )}
    >
      <div className="flex h-full w-navbar flex-col items-center border-r border-transparent bg-white py-8 dark:border-zinc-800 dark:bg-zinc-900 lg:bg-transparent dark:lg:border-transparent">
        <div className="h-header" />

        <div className="flex flex-col gap-8">
          <Link passHref href="/users/1">
            <a>
              <Avatar src={avatar} />
            </a>
          </Link>

          <CreateButton />
          <Menu />

          <div className="max-w-[205px]">
            <HelpLinks />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
