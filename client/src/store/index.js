import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers/index";

const initialState = {};

export const store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(thunk))
);

// export const store = createStore(
//   rootReducer,
//   initialState,
//   compose(
//     applyMiddleware(thunk),
//     window.__REDUX_DEVTOOLS_EXTENSION__ &&
//     window.__REDUX_DEVTOOLS_EXTENSION__({
//       latency: 0,
//     })
//   )
// );
