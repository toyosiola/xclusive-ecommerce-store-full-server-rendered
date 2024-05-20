"use client";

import { createContext, useContext, useReducer } from "react";
import reducer from "../reducers/globalReducer";
import { SET_INITIAL_DETAILS, SET_PRICE } from "../actions";

const GlobalContext = createContext();

export default function GlobalProvider({ children, user }) {
  const initialState = {
    user,
    maxPrice: 0,
    totalCount: 0,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  // function setInitialDetails({ maxPrice, totalCount }) {
  //   dispatch({ type: SET_INITIAL_DETAILS, payload: { maxPrice, totalCount } });
  // }

  return (
    <GlobalContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
