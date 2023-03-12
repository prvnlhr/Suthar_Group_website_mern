import {
  SET_CURR_KR_PRODUCT_VIEW,
  SET_CURR_VK_PRODUCT_VIEW,
  SET_DROPDOWN_SHOW,
  SET_ENQUIRY_RESPONSE,
} from "../../actions/types";

const initialState = {
  currentKRProductView: JSON.parse(sessionStorage.getItem("currKrProductView")),
  currentVKProductView: JSON.parse(sessionStorage.getItem("currVkProductView")),
  dropDownShow: false,
  enquiryResponse: "",
};

export default function loading(state = initialState, action) {
  switch (action.type) {
    case SET_CURR_KR_PRODUCT_VIEW:
      return {
        ...state,
        currentKRProductView: action.payload,
      };
    case SET_CURR_VK_PRODUCT_VIEW:
      return {
        ...state,
        currentVKProductView: action.payload,
      };
    case SET_DROPDOWN_SHOW:
      return {
        ...state,
        dropDownShow: action.payload,
      };
    case SET_ENQUIRY_RESPONSE:
      return {
        ...state,
        enquiryResponse: action.payload,
      };

    default:
      return state;
  }
}
