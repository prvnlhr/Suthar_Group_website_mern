import {
  FETCH_PRODUCTS_VK,
  ADD_NEW_PRODUCT_VK,
  DELETE_PRODUCT_VK,
  EDIT_PRODUCT_VK,
} from "../../actions/types";

const initialState = {
  vk_productList: [],
};

export default function cards(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS_VK:
      return {
        ...state,
        vk_productList: action.payload,
      };
    case ADD_NEW_PRODUCT_VK:
      return {
        ...state,
        vk_productList: [action.payload, ...state.vk_productList],
      };

    // case EDIT_PRODUCT_VK:
    //   const index = state.vk_productList.findIndex(
    //     (product) => product._id === action.payload._id
    //   );
    //   const newArray = [...state.vk_productList];
    //   newArray[index] = action.payload;
    //   return {
    //     vk_productList: newArray,
    //   };

    case DELETE_PRODUCT_VK:
      return {
        vk_productList: action.payload,
      };

    default:
      return state;
  }
}
