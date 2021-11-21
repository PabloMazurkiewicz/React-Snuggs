import axios from "axios";
import * as actionTypes from "./actionTypes";
import Notify from "../../components/Toastify/Toastify";

export const sendLoginData = () => {
  return {
    type: actionTypes.LOGIN_START,
  };
};

export const loginDataSuccess = (token, userId, displayName) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    idToken: token,
    userId: userId,
    displayName: displayName,
  };
};

export const loginDataFail = (error) => {
  return {
    type: actionTypes.LOGIN_FAIL,
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

export const loginReducer = (email, password) => {
  return (dispatch) => {
    dispatch(sendLoginData());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    axios
      .post(`${process.env.REACT_APP_LOGIN_ACCOUNT_BASE_URL}`, authData)
      .then((response) => {
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", response.data.localId);
        localStorage.setItem("displayName", response.data.displayName);
        Notify("Login Successful", "success");
        dispatch(
          loginDataSuccess(
            response.data.idToken,
            response.data.localId,
            response.data.displayName
          )
        );
        dispatch(checkAuthTimeout(response.data.expiresIn));
        setTimeout(() => window.location.reload(), 3000);
      })
      .catch((error) => {
        Notify(
          error.response.data.error.message === "INVALID_PASSWORD"
            ? "Invalid Password"
            : "Invalid Email",
          "error"
        );
        dispatch(loginDataFail(error));
      });
  };
};
