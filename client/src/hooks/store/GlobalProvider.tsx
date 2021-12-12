import * as React from 'react';
import GlobalContext from './GlobalContext';
import globalReducer from './globalReducer';

const GlobalProvider: React.FC = ({ children }) => {
  const value = React.useReducer(globalReducer, {});

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export default GlobalProvider;
