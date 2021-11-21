import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "./utility";

const initialState = {
  contactUs: null,
};

const sendContactUsData = (state) => {
  return updateObject(state);
};

const contactUsDataSuccess = (state, action) => {
  return updateObject(state, {
    contactUs: action,
  });
};

const contactUsDataFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CONTACTUS_START:
      return sendContactUsData(state, action);
    case actionTypes.CONTACTUS_SUCCESS:
      return contactUsDataSuccess(state, action);
    case actionTypes.CONTACTUS_FAIL:
      return contactUsDataFail(state, action);
    default:
      return state;
  }
};

export default reducer;
