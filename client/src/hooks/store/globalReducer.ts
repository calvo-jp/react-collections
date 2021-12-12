import GlobalAction from "./GlobalAction";
import GlobalState from "./GlobalState";

type GlobalReducer = (state: GlobalState, action: GlobalAction) => GlobalState;

const globalReducer: GlobalReducer = (state) => {
  return state;
};

export default globalReducer;
