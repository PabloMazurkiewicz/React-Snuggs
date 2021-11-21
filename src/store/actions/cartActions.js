import axios from "axios";
import * as actionTypes from "./actionTypes";

export const fetchCartData = () => {
  return {
    type: actionTypes.CART_FETCH_START,
  };
};

export const cartDataFetchSuccess = (data) => {
  return {
    type: actionTypes.CART_FETCH_SUCCESS,
    cartData: data,
  };
};

export const cartDataFetchFail = (error) => {
  return {
    type: actionTypes.CART_FETCH_FAIL,
    error: error,
  };
};

export const cartReducer = () => {
  return (dispatch) => {
    dispatch(fetchCartData());
    axios
      .get(
        `${process.env.REACT_APP_DATABASE_BASE_URL}/cart/${localStorage.getItem(
          "userId"
        )}.json`
      )
      .then((response) => {
        let cartData = [];
        for (let key in response.data) {
          cartData.push({
            ...response.data[key],
            key: key,
          });
        }
        dispatch(cartDataFetchSuccess(cartData));
      })
      .catch((error) => {
        dispatch(cartDataFetchFail(error));
      });
  };
};
