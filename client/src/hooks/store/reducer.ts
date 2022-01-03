import StoreAction from './action';
import StoreState from './state';

type StoreReducer = (state: StoreState, action: StoreAction) => StoreState;

const storeReducer: StoreReducer = (state, payload) => {
  return state;
};

export default storeReducer;
