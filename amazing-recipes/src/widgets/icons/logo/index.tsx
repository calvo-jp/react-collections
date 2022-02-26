import clsx from 'clsx';
import * as React from 'react';
import DarkThemeLogoIcon from './DarkThemeLogo';
import LightThemeLogoIcon from './LightThemeLogo';

const LogoIcon: React.FC<React.ComponentProps<'svg'>> = ({
  className,
  ...props
}) => {
  return (
    <React.Fragment>
      <DarkThemeLogoIcon
        className={clsx(className, 'hidden dark:block')}
        {...props}
      />

      <LightThemeLogoIcon
        className={clsx(className, 'dark:hidden block')}
        {...props}
      />
    </React.Fragment>
  );
};

export default LogoIcon;
