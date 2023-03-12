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

//ADD NEW
export const addNewVKProduct = (data, token) => async (dispatch) => {
  dispatch(loadingSetter(true, "vkProduct", "", "add", ""));

  for (var value of data.values()) {
    console.log(value);
  }
  try {
    // console.log("add vk product action", token, data);
    const backendResponse = await api.addNewProductVK(data, token);
    const productsList = backendResponse.data.vishvakarmaProductList;
    console.log("add_Vk_product_list response", productsList);
    const newAddedProduct = productsList[0];
    dispatch({
      type: ADD_NEW_PRODUCT_VK,
      payload: newAddedProduct,
    });
    dispatch(loadingSetter(false, "vkProduct", "", "add", true));
  } catch (error) {
    dispatch(loadingSetter(false, "vkProduct", "", "add", false));
    console.log(error);
  }
};
export const deleteVKProduct = (data, token) => async (dispatch) => {
  console.log("delete VK product action", data, token);
  dispatch(loadingSetter(true, "vkProduct", data.productId, "delete", ""));
  try {
    const response = await api.deleteProductVK(data, token);
    console.log("delete VK product response", response);
    const productsArray = response.data.data;
    dispatch({
      type: DELETE_PRODUCT_VK,
      payload: productsArray,
    });
    dispatch(loadingSetter(false, "vkProduct", data.productId, "delete", true));
  } catch (error) {
    dispatch(
      loadingSetter(false, "vkProduct", data.productId, "delete", false)
    );

    console.log(error);
  }
};

export const editVKProduct = (data, token) => async (dispatch) => {
  dispatch(loadingSetter(true, "vkProduct", "", "edit", ""));
  console.log("at edit Product VK Action", data, token);
  try {
    const response = await api.editProductsVK(data, token);
    console.log("VK edit product action response", response);
    dispatch({
      type: EDIT_PRODUCT_VK,
      payload: data,
    });
    sessionStorage.setItem("currVkProductView", JSON.stringify(data));
    const productJSON = JSON.parse(sessionStorage.getItem("currVkProductView"));
    dispatch({
      type: SET_CURR_VK_PRODUCT_VIEW,
      payload: productJSON,
    });

    dispatch(loadingSetter(false, "vkProduct", "", "edit", true));
  } catch (error) {
    dispatch(loadingSetter(false, "vkProduct", "", "edit", false));
    console.log(error);
  }
};
