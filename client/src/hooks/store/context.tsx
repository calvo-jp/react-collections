import * as React from 'react';
import StoreAction from './action';
import StoreState from './state';

const StoreContext = React.createContext<
  [StoreState, React.Dispatch<StoreAction>]
>([{}, function () {}]);

export default StoreContext;
