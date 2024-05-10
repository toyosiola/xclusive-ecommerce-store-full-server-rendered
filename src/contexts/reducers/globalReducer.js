import { SET_INITIAL_DETAILS, SET_PRICE } from "../actions";

export default function reducer(state, action) {
  switch (action.type) {
    case SET_INITIAL_DETAILS: {
      const { maxPrice, totalCount } = action.payload;
      return { ...state, maxPrice, totalCount };
    }

    default: {
      throw new Error(`No matching action type: ${action.type}`);
    }
  }
}
