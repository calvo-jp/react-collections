import * as React from "react";
import GlobalContext from "./GlobalContext";

const useGlobalState = () => React.useContext(GlobalContext);

export default useGlobalState;
