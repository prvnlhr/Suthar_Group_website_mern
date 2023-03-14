import {
  SET_CURR_KR_PRODUCT_VIEW,
  SET_CURR_VK_PRODUCT_VIEW,
  SET_DROPDOWN_SHOW,
} from "../types";

export const setKRCurrProductView = (currProduct) => async (dispatch) => {
  try {
    dispatch({
      type: SET_CURR_KR_PRODUCT_VIEW,
      payload: currProduct,
    });
  } catch (error) {
    console.log(error);
  }
};
export const setVKCurrProductView = (currProduct) => async (dispatch) => {
  console.log("drop down toggle action");

  try {
    dispatch({
      type: SET_CURR_VK_PRODUCT_VIEW,
      payload: currProduct,
    });
  } catch (error) {
    console.log(error);
  }
};
export const setDropDownShow = (val) => async (dispatch) => {
  // console.log("drop down toggle action", val);
  try {
    dispatch({
      type: SET_DROPDOWN_SHOW,
      payload: val,
    });
  } catch (error) {
    console.log(error);
  }
};
