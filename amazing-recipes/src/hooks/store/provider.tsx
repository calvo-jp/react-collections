import * as React from 'react';
import StoreContext from './context';
import storeReducer from './reducer';
import StoreState from './state';

const initializer = () => {
  const state: StoreState = {};

  // window needs to be checked since this is initially run on server
  if (typeof window === 'object') {
    // place all client code here

    const currentUser = localStorage.getItem('current_user');

    if (!!currentUser) {
      state.currentUser = JSON.parse(currentUser);
      state.authorized = true;
    }
  }

  return state;
};

const StoreProvider: React.FC = ({ children }) => {
  const value = React.useReducer(storeReducer, {}, initializer);

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export default StoreProvider;
