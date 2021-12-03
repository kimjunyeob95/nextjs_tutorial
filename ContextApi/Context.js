import React, { useReducer } from "react";
import cookie from "react-cookies";

export const authContext = React.createContext();

export const indexInitialState = {
  loginFlag: cookie.load("mInfo") ? true : false,
  mInfo: cookie.load("mInfo"),
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
  return <authContext.Provider value={useReducer(indexReducer, indexInitialState)}>{props.children}</authContext.Provider>;
};

export default ContextStore;
