import * as React from 'react';
import StoreContext from './context';

const useStoreState = () => React.useContext(StoreContext);

export default useStoreState;
