import * as React from 'react';
import DarkThemeLogoIcon from './DarkThemeLogo';
import LightThemeLogoIcon from './LightThemeLogo';

const LogoIcon = (props: React.ComponentProps<'svg'>) => {
  return (
    <React.Fragment>
      <DarkThemeLogoIcon {...props} />
      <LightThemeLogoIcon {...props} />
    </React.Fragment>
  );
};

export default LogoIcon;
