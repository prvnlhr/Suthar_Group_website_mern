import * as api from "../../api/index";
import {
  FETCH_PRODUCTS_VK,
  ADD_NEW_PRODUCT_VK,
  EDIT_PRODUCT_VK,
  DELETE_PRODUCT_VK,
  SET_CURR_VK_PRODUCT_VIEW,
} from "../types";

import { loadingSetter } from "../helperFunctions";

export const fetchVKProducts = (token) => async (dispatch) => {
  dispatch(loadingSetter(true, "vkProduct", "", "fetching", ""));
  console.log("fetch Vk Products Action", token);
  try {
    const response = await api.fetchProductsVK(token);
    const productList = response.data.vishvakarmaProductList;
    console.log(
      "fetch_VK_product_list response",
      response.data.vishvakarmaProductList
    );
    dispatch({
      type: FETCH_PRODUCTS_VK,
      payload: productList,
    });
    dispatch(loadingSetter(false, "vkProduct", "", "fetching", true));
  } catch (error) {
    dispatch(loadingSetter(false, "vkProduct", "", "fetching", false));
    console.log(error);
  }
};


