import axios from "axios";
import * as actionTypes from "./actionTypes";

export const fetchCategoryProducts = () => {
  return {
    type: actionTypes.CATEGORY_START,
  };
};

export const categoryProductsSuccess = (data) => {
  return {
    type: actionTypes.CATEGORY_SUCCESS,
    products: data.products,
  };
};

export const categoryProductsFail = (error) => {
  return {
    type: actionTypes.CATEGORY_FAIL,
    error: error,
  };
};

export const categoryReducer = (url) => {
  return (dispatch) => {
    dispatch(fetchCategoryProducts());
    axios
      .get(url)
      .then((response) => {
        dispatch(categoryProductsSuccess(response.data));
      })
      .catch((error) => {
        dispatch(categoryProductsFail(error));
      });
  };
};
