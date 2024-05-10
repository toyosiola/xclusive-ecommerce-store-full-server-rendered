"use client";

import { createContext, useContext, useReducer } from "react";
import reducer from "../reducers/globalReducer";
import { SET_INITIAL_DETAILS, SET_PRICE } from "../actions";

const initialState = {
  maxPrice: 0,
  totalCount: 0,
};

const GlobalContext = createContext();

export default function GlobalProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function setInitialDetails({ maxPrice, totalCount }) {
    dispatch({ type: SET_INITIAL_DETAILS, payload: { maxPrice, totalCount } });
  }

  function setPriceLimit(price) {
    dispatch({ type: SET_PRICE, payload: price });
  }

  return (
    <GlobalContext.Provider
      value={{ ...state, setPriceLimit, setInitialDetails }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
