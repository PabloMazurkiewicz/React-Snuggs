import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "./utility";

const initialState = {
  cartData: [],
  error: null,
  loading: false,
};

const fetchCartData = (state) => {
  return updateObject(state, { error: null, loading: true });
};

const cartDataSuccess = (state, action) => {
  return updateObject(state, {
    cartData: action.cartData,
    error: null,
    loading: false,
  });
};

const cartDataFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CART_FETCH_START:
      return fetchCartData(state, action);
    case actionTypes.CART_FETCH_SUCCESS:
      return cartDataSuccess(state, action);
    case actionTypes.CART_FETCH_FAIL:
      return cartDataFail(state, action);
    default:
      return state;
  }
};

export default reducer;
