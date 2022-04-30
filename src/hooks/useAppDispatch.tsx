import React from "react";
import { DispatchContext } from "src/store/context";

export const useAppDispatch = () => {
  const context = React.useContext(DispatchContext);
  if (context === undefined) {
    throw new Error(`useAppDispatch must be used within a DispatchProvider`);
  }
  return context;
};
