"use client";

import { createContext, useContext, useReducer } from "react";
import reducer from "../reducers/globalReducer";

const GlobalContext = createContext();

export default function GlobalProvider({ children, user }) {
  const initialState = {
    user,
    maxPrice: 0,
    cartCount: 0,
    totalCount: 0,
    wishlistCount: 0,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
