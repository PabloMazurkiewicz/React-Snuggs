import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "./utility";

const initialState = {
  productData: [],
  error: null,
  loading: false,
};

const fetchProductData = (state) => {
  return updateObject(state, { error: null, loading: true });
};

const productDataSuccess = (state, action) => {
  return updateObject(state, {
    productData: action.productData,
    error: null,
    loading: false,
  });
};

const productDataFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const productSetImageStart = (state, action) => {
  return updateObject(state, {
    productImage: action.productImage,
  });
};

const productSetImageSuccess = (state, action) => {
  return updateObject(state, {
    productImage: action.productImage,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PRODUCT_START:
      return fetchProductData(state, action);
    case actionTypes.PRODUCT_SUCCESS:
      return productDataSuccess(state, action);
    case actionTypes.PRODUCT_FAIL:
      return productDataFail(state, action);
    case actionTypes.PRODUCT_SETIMAGE_START:
      return productSetImageStart(state, action);
    case actionTypes.PRODUCT_SETIMAGE_SUCCESS:
      return productSetImageSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
