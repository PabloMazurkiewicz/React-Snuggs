import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "./utility";

const initialState = {
  token: null,
  userId: null,
};

const sendSignupData = (state) => {
  return updateObject(state);
};

const signupDataSuccess = (state, action) => {
  return updateObject(state, {
    token: action.idToken,
    userId: action.userId,
    displayName: action.displayName,
  });
};

const signupDataFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
  });
};

const logout = (state) => {
  return updateObject(state, { token: null, userId: null });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGNUP_START:
      return sendSignupData(state, action);
    case actionTypes.SIGNUP_SUCCESS:
      return signupDataSuccess(state, action);
    case actionTypes.SIGNUP_FAIL:
      return signupDataFail(state, action);
    case actionTypes.LOGOUT:
      return logout(state);
    default:
      return state;
  }
};

export default reducer;
