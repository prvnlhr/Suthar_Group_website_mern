import * as api from "../../api/index";
import {
  FETCH_PRODUCTS_KR,
  EDIT_PRODUCT_KR,
  ADD_NEW_PRODUCT_KR,
  DELETE_PRODUCT_KR,
  SET_CURR_KR_PRODUCT_VIEW,
} from "../types";

import { loadingSetter } from "../helperFunctions";

export const fetchKRProducts = (token) => async (dispatch) => {
  dispatch(loadingSetter(true, "krProduct", "", "fetching", ""));
  console.log("fetch Kr Products Action", token);
  try {
    const response = await api.fetchProductsKR(token);
    const productList = response.data.krProductList;
    console.log("fetch_kr_product_list response", response.data.krProductList);
    dispatch({
      type: FETCH_PRODUCTS_KR,
      payload: productList,
    });
    dispatch(loadingSetter(false, "krProduct", "", "fetching", true));
  } catch (error) {
    dispatch(loadingSetter(false, "krProduct", "", "fetching", false));
    console.log(error);
  }
};