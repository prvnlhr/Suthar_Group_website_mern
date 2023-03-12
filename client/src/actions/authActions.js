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

//EMAIL ACTIVATION
export const activationEmail = (activation_token) => async (dispatch) => {
  dispatch(loadingSetter(true, "activateAccount", "", "", ""));

  try {
    console.log("action activate account", activation_token);
    const response = await api.activation(activation_token);

    dispatch(loadingSetter(false, "activateAccount", "", "", true));

    dispatch(authSuccessResponseHandler(response.data.msg, "activateAccount"));
  } catch (error) {
    dispatch(loadingSetter(false, "activateAccount", "", "", false));

    dispatch(
      authErrorResponseHandler(error.response.data.msg, "activateAccount")
    );
    console.log("at activate email action", error.response);
  }
};
//LOGIN_________________________________________________________________
export const login = (formData, navigate) => async (dispatch) => {
  dispatch(loadingSetter(true, "login", "", "", ""));
  try {

    console.log(formData);
    const response = await api.login(formData);
    const token = response.data;
    console.log("token", token);
    dispatch(authSuccessResponseHandler(response.data.msg, "login"));
    dispatch(tokenSetter(token));

    dispatch({
      type: USER_LOGIN,
    });
    dispatch(loadingSetter(false, "login", "", "", true));
    navigate(-1);
  } catch (error) {
    console.log(error)
    dispatch(loadingSetter(false, "login", "", "", false));
    dispatch(authErrorResponseHandler(error.response.data.msg, "login"));

    console.log("at login action", error, error.response);
  }
};

export const getToken = (navigate) => async (dispatch) => {
  try {
    console.log("auth token action");
    const response = await api.getToken();
    const token = response.data;
    dispatch(tokenSetter(token));
    console.log("auth get token action", response);
    dispatch({
      type: USER_LOGIN,
    });
  } catch (error) {
    console.log("At get token action", error, error.response.data.msg);
    dispatch(authErrorResponseHandler(error.response.data.msg, "login"));
    dispatch({
      type: USER_LOGOUT,
    });
  }
};

export const logout = () => async (dispatch) => {
  dispatch(loadingSetter(true, "logout", "", "", ""));
  try {
    const res = await api.logoutUser();
    dispatch(tokenSetter(""));

    dispatch({
      type: USER_LOGOUT,
    });
    dispatch(authSuccessResponseHandler(res.data.msg, "login"));
    dispatch(loadingSetter(false, "logout", "", "", true));
  } catch (error) {
    dispatch(loadingSetter(false, "logout", "", "", false));
    console.log("at logout action", error);
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  dispatch(loadingSetter(true, "forgotPassword", "", "", ""));

  try {
    const res = await api.forgotPass(email);
    const successMsg = res.data.msg;

    dispatch(authSuccessResponseHandler(successMsg, "forgotPassword"));
    dispatch(loadingSetter(false, "forgotPassword", "", "", true));
  } catch (error) {
    dispatch(loadingSetter(false, "forgotPassword", "", "", false));
    const failureMsg = error.response.data.msg;
    dispatch(authErrorResponseHandler(failureMsg, "forgotPassword"));
  }
};
export const resetPassword = (token, password) => async (dispatch) => {
  dispatch(loadingSetter(true, "resetPassword", "", "", ""));
  console.log(token);
  try {
    const res = await api.resetPass(token, password);
    const successMsg = res.data.msg;

    dispatch(authSuccessResponseHandler(successMsg, "resetPassSuccess"));
    dispatch(loadingSetter(false, "resetPassword", "", "", true));
  } catch (error) {
    let errorMsg;
    dispatch(loadingSetter(false, "resetPassword", "", "", false));
    const failureMsg = error.response.data.msg;
    if (failureMsg === "TokenExpiredError!" || "Invalid token!") {
      errorMsg = "Link Expired try again !";
    } else {
      errorMsg = failureMsg;
    }

    dispatch(authErrorResponseHandler(errorMsg, "resetPassword"));
  }
};
//change password api
export const changePassword =
  (oldPassword, newPassword, token, userId) => async (dispatch) => {
    dispatch(loadingSetter(true, "changePassword", "", "", ""));

    try {
      const res = await api.changePass(oldPassword, newPassword, token);
      const successMsg = res.data.msg;

      dispatch(authSuccessResponseHandler(successMsg, "changePassword"));

      dispatch(loadingSetter(false, "changePassword", "", "", true));
    } catch (error) {
      dispatch(loadingSetter(false, "changePassword", "", "", false));
      const failureMsg = error.response.data.msg;
      dispatch(authErrorResponseHandler(failureMsg, "changePassword"));
      console.log("At change pass action", error.response, failureMsg);
    }
  };
//delete account api
export const deleteAccount = (password, token) => async (dispatch) => {
  dispatch(loadingSetter(true, "deleteAccount", "", "", ""));

  try {
    const res = await api.deleteAccount(password, token);
    const logoutResponse = await api.logoutUser();
    const successMsg = res.data.msg;

    dispatch(authSuccessResponseHandler(successMsg, "login"));
    dispatch(loadingSetter("deleteAccount", false));
    dispatch(loadingSetter(false, "deleteAccount", "", "", true));

    dispatch({
      type: USER_LOGOUT,
      msg: successMsg,
    });
    dispatch(tokenSetter(""));
    dispatch({
      type: REMOVE_USER,
    });

    console.log(res);
  } catch (error) {
    dispatch(loadingSetter(false, "deleteAccount", "", "", false));
    const failureMsg = error.response.data.msg;
    dispatch(authErrorResponseHandler(failureMsg, "deleteAccount"));
  }
};

export const clearNotification = (notificationType) => async (dispatch) => {
  try {
    if (notificationType === "error") {
      dispatch({ type: CLEAR_ERROR });
    } else {
      dispatch({ type: CLEAR_SUCCESS });
    }
  } catch (error) { }
};
export const updateToken = (token) => {
  return {
    type: TOKEN_SET,
    token: token,
  };
};
export const forceLogout = () => {
  console.log("force logout");
  return {
    type: USER_LOGOUT,
  };
};
export const authSuccessResponseHandler = (msg, at) => {
  return {
    type: RESPONSE_SUCCESS,
    success: msg,
    at: at,
  };
};
export const authErrorResponseHandler = (msg, at) => {
  return {
    type: RESPONSE_ERROR,
    error: msg,
    at: at,
  };
};
export const authResponseClear = () => {
  return {
    type: RESPONSE_CLEAR,
  };
};

export const tokenSetter = (token) => {
  // console.log("token", token);
  return {
    type: TOKEN_SET,
    token: token,
  };
};

export const loadingSetter = (isLoading, place, itemId, process, success) => {
  return {
    type: LOADING_SET,
    loading: isLoading,
    place: place,
    itemId: itemId,
    process: process,
    success: success,
  };
};
