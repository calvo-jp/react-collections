import * as React from 'react';
import GlobalContext from './GlobalContext';

const useGlobalState = () => {
  return React.useContext(GlobalContext);
};

export default useGlobalState;
