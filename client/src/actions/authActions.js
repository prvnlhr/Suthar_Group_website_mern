import * as api from "../api/index.js";

import {
  USER_LOGIN,
  TOKEN_SET,
  USER_LOGOUT,
  REMOVE_USER,
  CLEAR_ERROR,
  CLEAR_SUCCESS,
  RESPONSE_SUCCESS,
  RESPONSE_ERROR,
  RESPONSE_CLEAR,
  LOADING_SET,
} from "./types";
// REGISTER_________________________________________________________
export const register = (formData) => async (dispatch) => {
  dispatch(loadingSetter(true, "signUp", "", "", ""));
  try {
    const response = await api.registerNewUser(formData);

    dispatch(authSuccessResponseHandler(response.data.msg, "register"));
    dispatch(loadingSetter(false, "signUp", "", "", true));
  } catch (error) {
    dispatch(loadingSetter(false, "signUp", "", "", false));
    dispatch(authErrorResponseHandler(error.response.data.msg, "register"));
    console.log("at register action", error.response);
  }
};
