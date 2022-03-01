import clsx from "clsx";
import { useRouter } from "next/router";
import * as React from "react";

enum Status {
  waiting,
  started,
  complte,
}

const Loader = () => {
  const router = useRouter();
  const [status, setStatus] = React.useState(Status.waiting);

  const handleStart = () => setStatus(Status.started);
  const handleComplete = () => {
    setStatus(Status.complte);
    setTimeout(() => setStatus(Status.waiting), 100);
  };

  React.useEffect(() => {
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, [router.events]);

  return (
    <div
      className={clsx(
        "fixed top-0 left-0 z-50 h-[3px] bg-gradient-to-r from-yellow-300 to-orange-400 transition-all duration-30",
        status === Status.waiting && "hidden",
        status === Status.started && "w-1/2",
        status === Status.complte && "w-full"
      )}
    />
  );
};

export default Loader;
