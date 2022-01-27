/* eslint-disable react-hooks/rules-of-hooks */
import React, { useReducer } from "react";
import { useCookies } from "react-cookie";
export const authContext = React.createContext();

export const indexInitialState = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  return {
    loginFlag: cookies.mInfo ? true : false,
    mInfo: cookies.mInfo ? cookies.mInfo : false,
  };
};

export const indexReducer = (state, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "login": {
      return {
        loginFlag: true,
        mInfo: action.mInfo,
      };
    }
    case "logout": {
      return {
        loginFlag: false,
        mInfo: "",
      };
    }
  }
};

const ContextStore = (props) => {
  return <authContext.Provider value={useReducer(indexReducer, indexInitialState())}>{props.children}</authContext.Provider>;
};

export default ContextStore;
