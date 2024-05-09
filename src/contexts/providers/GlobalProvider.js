import { createContext, useContext, useReducer } from "react";
import reducer from "../reducers/globalReducer";

const initialState = {
  maxPrice: 0,
  totalCount: 0,
};

const GlobalContext = createContext();

export default function GlobalProvider({ children }) {
  const [state, dispatch] = useReducer(initialState, reducer);
  return (
    <GlobalContext.Provider value={{ ...state }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
