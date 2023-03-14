import * as api from "../../api/index";
import {
  FETCH_PRODUCTS_KR,
  EDIT_PRODUCT_KR,
  ADD_NEW_PRODUCT_KR,
  DELETE_PRODUCT_KR,
  SET_CURR_KR_PRODUCT_VIEW,
} from "../types";

import { loadingSetter } from "../helperFunctions";
import axios from "axios";

export const fetchKRProducts = (token) => async (dispatch) => {
  dispatch(loadingSetter(true, "krProduct", "", "fetching", ""));
  // console.log("fetch Kr Products Action", token);
  try {
    const response = await api.fetchProductsKR(token);
    // http://localhost:9000/company/vishvakarma/product/getProducts
    // const rds = await axios.get(" http://localhost:9000/company/kr/product/getProducts");
    // console.log(rds)
    const productList = response.data.krProductList;
    // const productList = {}
    // console.log("fetch_kr_product_list response", response.data.krProductList);
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

//ADD NEW
export const addNewKRProduct = (data, token) => async (dispatch) => {
  dispatch(loadingSetter(true, "krProduct", "", "add", ""));

  // for (var value of data.values()) {
  //   console.log(value);
  // }
  try {
    // console.log("add kr product action", token, data);
    const backendResponse = await api.addNewProductKR(data, token);
    const productsList = backendResponse.data.krProductList;
    // console.log("add_kr_product_list response", productsList);
    const newAddedProduct = productsList[0];
    dispatch({
      type: ADD_NEW_PRODUCT_KR,
      payload: newAddedProduct,
    });
    dispatch(loadingSetter(false, "krProduct", "", "add", true));
  } catch (error) {
    dispatch(loadingSetter(false, "krProduct", "", "add", false));
    console.log(error);
  }
};
export const deleteKRProduct = (data, token) => async (dispatch) => {
  // console.log("delete kr product action", data, token);
  dispatch(loadingSetter(true, "krProduct", data.productId, "delete", ""));
  try {
    const response = await api.deleteProductKR(data, token);
    // console.log("delete kr product response", response);
    const productsArray = response.data.data;
    dispatch({
      type: DELETE_PRODUCT_KR,
      payload: productsArray,
    });
    dispatch(loadingSetter(false, "krProduct", data.productId, "delete", true));
  } catch (error) {
    dispatch(
      loadingSetter(false, "krProduct", data.productId, "delete", false)
    );

    console.log(error);
  }
};

export const editKRProduct = (data, token) => async (dispatch) => {
  dispatch(loadingSetter(true, "krProduct", "", "edit", ""));
  // console.log("at edit Product KR Action", data, token);
  try {
    const response = await api.editProductsKR(data, token);
    console.log("kr edit product action response", response);
    dispatch({
      type: EDIT_PRODUCT_KR,
      payload: data,
    });
    sessionStorage.setItem("currKrProductView", JSON.stringify(data));
    const productJSON = JSON.parse(sessionStorage.getItem("currKrProductView"));
    dispatch({
      type: SET_CURR_KR_PRODUCT_VIEW,
      payload: productJSON,
    });

    dispatch(loadingSetter(false, "krProduct", "", "edit", true));
  } catch (error) {
    dispatch(loadingSetter(false, "krProduct", "", "edit", false));
    console.log(error);
  }
};
