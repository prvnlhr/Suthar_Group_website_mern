import { combineReducers } from "redux";
import kr_productReducer from "./krReducers/krProductReducer";
import vk_productReducer from "./vishvakarmaReducers/vkProductReducer";

import loadingReducer from "./loadingReducer";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import tokenReducer from "./tokenReducer";
import authResponseReducer from "./authResponseReducer";
import auxillaryReducer from "./auxillaryReducers/auxillaryReducer";

export default combineReducers({
  kr_productReducer,
  vk_productReducer,
  loadingReducer: loadingReducer,
  auth: authReducer,
  token: tokenReducer,
  authResponseHandler: authResponseReducer,
  user: userReducer,
  auxillaryReducer: auxillaryReducer,
});
