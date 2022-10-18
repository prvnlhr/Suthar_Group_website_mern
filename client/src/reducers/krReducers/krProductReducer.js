import {
    FETCH_PRODUCTS_KR,
    ADD_NEW_PRODUCT_KR,
    DELETE_PRODUCT_KR,
    EDIT_PRODUCT_KR,
  } from "../../actions/types";
  
  const initialState = {
    kr_productList: [],
  };
  
  export default function cards(state = initialState, action) {
    switch (action.type) {
      case FETCH_PRODUCTS_KR:
        return {
          ...state,
          kr_productList: action.payload,
        };
      case ADD_NEW_PRODUCT_KR:
        return {
          ...state,
          kr_productList: [action.payload, ...state.kr_productList],
        };
  
      case EDIT_PRODUCT_KR:
        const index = state.kr_productList.findIndex(
          (product) => product._id === action.payload._id
        );
        const newArray = [...state.kr_productList];
        newArray[index] = action.payload;
        return {
          kr_productList: newArray,
        };
  
      case DELETE_PRODUCT_KR:
        return {
          kr_productList: action.payload,
        };
  
      default:
        return state;
    }
  }
  