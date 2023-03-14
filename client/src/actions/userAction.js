import * as api from "../api";

import {
  loadingSetter,
  authSuccessResponseHandler,
  authErrorResponseHandler,
} from "./authActions";

import { FETCH_USER, ERROR_MESSAGE, SET_ENQUIRY_RESPONSE } from "./types";

export const fetchUser = (token) => async (dispatch) => {
  // console.log("fetch User action", token);
  try {
    const response = await api.fetchUser(token);
    const userData = response.data.user;
    const data = {
      _id: userData._id,
      owner: userData.owner,
      email: userData.email,
    };

    dispatch({
      type: FETCH_USER,
      payload: data,
    });
  } catch (error) {
    // const failureMsg = error.response.data.msg;
    console.log(error);
    // dispatch({
    //   type: ERROR_MESSAGE,
    //   message: failureMsg,
    // });
  }
};
export const sendMail = (mailData) => async (dispatch) => {
  dispatch(loadingSetter(true, "sendEnquiry", "", "", ""));

  // console.log("send mail action", mailData);
  try {
    const response = await api.contactUs(mailData);

    if (response.status === 200) {
      // console.log(response.data.msg);
      dispatch({
        type: SET_ENQUIRY_RESPONSE,
        payload: response.data.msg,
      });
    } else if (response.status !== 200) {
      // console.log(response);

      dispatch({
        type: SET_ENQUIRY_RESPONSE,
        payload: "Error ! try again later",
      });
    }

    dispatch(loadingSetter(true, "sendEnquiry", "", "", true));
  } catch (error) {
    dispatch(loadingSetter(false, "sendEnquiry", "", "", false));
    dispatch({
      type: SET_ENQUIRY_RESPONSE,
      payload: "Error ! try again later",
    });
  }
};
