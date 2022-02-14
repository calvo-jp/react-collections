import clsx from 'clsx';
import { useRouter } from 'next/router';
import * as React from 'react';

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
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);
  }, [router.events]);

  return (
    <div
      className={clsx(
        'fixed h-[3px] top-0 left-0 z-[999] bg-gradient-to-r from-cyan-500 to-blue-300 transition-all duration-300 dark:from-sky-600 dark:to-blue-400',
        status === Status.waiting && 'hidden',
        status === Status.started && 'w-1/2',
        status === Status.complte && 'w-full'
      )}
    />
  );
};

export default Loader;
