import axios from "axios";
import * as actionTypes from "./actionTypes";
import Notify from "../../components/Toastify/Toastify";

export const sendSignupData = () => {
  return {
    type: actionTypes.SIGNUP_START,
  };
};

export const signupDataSuccess = (token, userId, displayName) => {
  return {
    type: actionTypes.SIGNUP_SUCCESS,
    idToken: token,
    userId: userId,
    displayName: displayName,
  };
};

export const signupDataFail = (error) => {
  return {
    type: actionTypes.SIGNUP_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const signupReducer = (email, password, displayName) => {
  return (dispatch) => {
    dispatch(sendSignupData());
    const authData = {
      email: email,
      password: password,
      displayName: displayName,
      returnSecureToken: true,
    };
    axios
      .post(`${process.env.REACT_APP_CREATE_ACCOUNT_BASE_URL}`, authData)
      .then((response) => {
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        let previousCart = [];
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", response.data.localId);
        localStorage.setItem("displayName", response.data.displayName);
        previousCart = JSON.parse(localStorage.getItem("cartData"));
        Notify("Signup successful", "success");
        if (localStorage.getItem("cartData") !== null) {
          for (let i = 0; i < previousCart.length; i++) {
            axios.post(
              `${process.env.REACT_APP_DATABASE_BASE_URL}/cart/${response.data.localId}/.json`,
              previousCart[i]
            );
          }
          Notify("Cart updated", "success");
        }
        localStorage.removeItem("cartData");
        dispatch(
          signupDataSuccess(
            response.data.idToken,
            response.data.localId,
            displayName
          )
        );
        dispatch(checkAuthTimeout(response.data.expiresIn));
        setTimeout(() => window.location.reload(), 3000);
      })
      .catch((error) => {
        dispatch(signupDataFail(error));
        Notify(
          error.response.data.error.message === "EMAIL_EXISTS"
            ? "Email already exists"
            : "Password must be at least 6 characters",
          "error"
        );
      });
  };
};
