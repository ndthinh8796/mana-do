import React, { createContext, Dispatch, FC, useReducer } from "react";
import { AppActions } from "./actions";
import reducer, { AppState, initialState } from "./reducer";

export const StateContext = createContext<AppState>(initialState);
export const DispatchContext = createContext<Dispatch<AppActions>>(() => {});

export const ContextProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
