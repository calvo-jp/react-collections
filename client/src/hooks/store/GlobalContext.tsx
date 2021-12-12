import * as React from 'react';
import GlobalAction from './GlobalAction';
import GlobalState from './GlobalState';

const GlobalContext = React.createContext<
  [GlobalState, React.Dispatch<GlobalAction>]
>([{}, function () {}]);

export default GlobalContext;
