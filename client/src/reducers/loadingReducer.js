import {
    LOADING_SET,
  } from "../actions/types";
  
  const initialState = {
    isLoading: "",
    place: null,
    itemId: "",
    process: "",
    success: "",
    cardFetching: "",
    loginsFetching: "",
    docsFetching: "",
  };
  
  export default function loading(state = initialState, action) {
    switch (action.type) {
      case LOADING_SET:
        return {
          ...state,
          isLoading: action.loading,
          place: action.place,
          itemId: action.itemId,
          process: action.process,
          success: action.success,
        };
     
      default:
        return state;
    }
  }
  