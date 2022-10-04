
import axios from "axios";
import { store } from "../store/index";
import { logout, updateToken } from "../actions/authActions";

let url = process.env.REACT_APP_BASE_URL;
console.log(process.env.REACT_APP_BASE_URL);
const API = axios.create({
  baseURL: url,
  // baseURL: "http://192.168.158.208:9000/",
});


const reqHandler = (request) => {
  // console.log("request", request);
  return request;
};
const resHandler = (response) => {
  if (response.status === 401) {
    console.log("401 error");
  }
  // console.log("response", response);
  return response;
};
const errorHandler = (error) => {
  const originalRequest = error.config;
  // console.log("401 error", error.response.status, error.config);
  // console.log("/user/auth/refresh_token", error.config.url);
  // console.log("/user/auth/refresh_token" === error.config.url);
  if (
    error.response.status === 401 &&
    error.config.url !== "/company/auth/refresh_token" &&
    error.config.url !== "/company/auth/activation" &&
    error.config.url !== "/company/auth/resetPassword" &&
    !originalRequest._retry
  ) {
    originalRequest._retry = true;
    return axios
      .post(`${url}/company/auth/refresh_token`, null, {
        withCredentials: true,
      })
      .then((res) => {
        // console.log("res", res);
        if (res.status === 200) {
          // console.log("res Hogaya", res.data);
          store.dispatch(updateToken(res.data));
          // console.log("originalRequestPrev", originalRequest);
          originalRequest.headers["Authorization"] = "Bearer " + res.data;
          // console.log("originalRequestModified", originalRequest);
          return axios(originalRequest);
        }
      })
      .catch((err) => {
        // console.log(err.response.status);
        // console.log("token refreshing error at interceptor", err.response);
        if (err.response.status === 401) {
          store.dispatch(logout());
        }
        return Promise.reject(err);
      });
  }
  return Promise.reject(error);
};

API.interceptors.request.use(
  (request) => reqHandler(request),
  (error) => errorHandler(error)
);
API.interceptors.response.use(
  (response) => resHandler(response),
  (error) => errorHandler(error)
);

export const registerNewUser = (formData) =>
  API.post("/company/auth/register", formData);

//Account Activation through Email
export const activation = (activation_token) =>
  API.post("/company/auth/activation", {
    data: {
      activation_token,
    },
  });

//Login
export const login = (formData) =>
  API.post("/company/auth/login", formData, {
    withCredentials: true,
  });

//get Token
export const getToken = () =>
  API.post("/company/auth/refresh_token", null, {
    withCredentials: true,
  });
//Logout
export const logoutUser = () =>
  API.get("/company/auth/logout", { withCredentials: true });
//get User

export const getUser = (token) =>
  API.get("/company/auth/info", {
    headers: { Authorization: `${token}` },
  });