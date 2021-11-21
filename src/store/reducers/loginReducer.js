import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "./utility";

const initialState = {
  token: null,
  userId: null,
};

const sendLoginData = (state) => {
  return updateObject(state);
};

const loginDataSuccess = (state, action) => {
  return updateObject(state, {
    token: action.idToken,
    userId: action.userId,
    displayName: action.displayName,
  });
};

const loginDataFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
  });
};

const logout = (state) => {
  return updateObject(state, { token: null, userId: null });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_START:
      return sendLoginData(state, action);
    case actionTypes.LOGIN_SUCCESS:
      return loginDataSuccess(state, action);
    case actionTypes.LOGIN_FAIL:
      return loginDataFail(state, action);
    case actionTypes.LOGOUT:
      return logout(state);
    default:
      return state;
  }
};

export default reducer;
