import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "./utility";

const initialState = {
  products: [],
  error: null,
  loading: false,
};

const fetchCategoryProducts = (state) => {
  return updateObject(state, { error: null, loading: true });
};

const categoryProductsSuccess = (state, action) => {
  return updateObject(state, {
    products: action.products,
    error: null,
    loading: false,
  });
};

const categoryProductsFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CATEGORY_START:
      return fetchCategoryProducts(state, action);
    case actionTypes.CATEGORY_SUCCESS:
      return categoryProductsSuccess(state, action);
    case actionTypes.CATEGORY_FAIL:
      return categoryProductsFail(state, action);
    default:
      return state;
  }
};

export default reducer;
