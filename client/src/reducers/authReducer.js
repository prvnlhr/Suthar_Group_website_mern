import { USER_LOGIN, USER_LOGOUT, DESTROY_SESSION } from "../actions/types";

const initialAuthState = {
  isLogged: false,
};

const authNewReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        isLogged: true,
      };

    case USER_LOGOUT:
      return {
        ...state,
        isLogged: false,
      };

    case DESTROY_SESSION:
      return {
        ...state,
      };

    default:
      return state;
  }
};
export default authNewReducer;
