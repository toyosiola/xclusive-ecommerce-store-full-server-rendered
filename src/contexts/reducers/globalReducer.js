import { SET_BAG_COUNT, SET_INITIAL_DETAILS, SET_USER } from "../actions";

export default function reducer(state, action) {
  switch (action.type) {
    case SET_INITIAL_DETAILS: {
      const { maxPrice, totalCount } = action.payload;
      return { ...state, maxPrice, totalCount };
    }

    case SET_USER: {
      return { ...state, user: action.payload };
    }

    case SET_BAG_COUNT: {
      const { wishlistCount, cartCount } = action.payload;
      return { ...state, cartCount, wishlistCount };
    }

    default: {
      throw new Error(`No matching action type: ${action.type}`);
    }
  }
}
