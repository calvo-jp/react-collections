import * as React from 'react';
import StoreContext from './context';
import storeReducer from './reducer';

const StoreProvider: React.FC = ({ children }) => {
  const value = React.useReducer(storeReducer, {});

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export default StoreProvider;
