import axios from "axios";
import * as actionTypes from "./actionTypes";
import Notify from "../../components/Toastify/Toastify";

export const sendContactUsData = () => {
  return {
    type: actionTypes.CONTACTUS_START,
  };
};

export const contactUsDataSuccess = (data) => {
  return {
    type: actionTypes.CONTACTUS_SUCCESS,
    contactUs: data,
  };
};

export const contactUsDataFail = (error) => {
  return {
    type: actionTypes.CONTACTUS_FAIL,
    error: error,
  };
};

export const contactusReducer = (data) => {
  return (dispatch) => {
    dispatch(sendContactUsData());
    axios
      .post(`${process.env.REACT_APP_DATABASE_BASE_URL}/contact-us/.json`, data)
      .then((response) => {
        Notify("We will contact you shortly", "success");
        setTimeout(() => window.location.replace("/"), 3000);
      })
      .catch((error) => {
        Notify("Something wrong happened", "error");
      });
  };
};
