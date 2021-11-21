import axios from "axios";
import * as actionTypes from "./actionTypes";

export const fetchProductData = () => {
  return {
    type: actionTypes.PRODUCT_START,
  };
};

export const productDataSuccess = (data) => {
  return {
    type: actionTypes.PRODUCT_SUCCESS,
    productData: data,
  };
};

export const productDataFail = (error) => {
  return {
    type: actionTypes.PRODUCT_FAIL,
    error: error,
  };
};

export const productSetImageStart = (data) => {
  return {
    type: actionTypes.PRODUCT_SETIMAGE_START,
    productImage: data,
  };
};

export const productSetImageSuccess = (data) => {
  return {
    type: actionTypes.PRODUCT_SETIMAGE_SUCCESS,
    productImage: data,
  };
};

export const productReducer = (url) => {
  return (dispatch) => {
    dispatch(fetchProductData());
    axios
      .get(url)
      .then((response) => {
        dispatch(productDataSuccess(response.data));
        dispatch(productSetImageStart(response.data.images[0].src));
      })
      .catch((error) => {
        dispatch(productDataFail(error));
      });
  };
};

export const imageReducer = (data) => {
  return (dispatch) => {
    dispatch(productSetImageSuccess(data));
  };
};
