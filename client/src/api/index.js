
import axios from "axios";
import { store } from "../store/index";
import { logout, updateToken } from "../actions/authActions";

let url = process.env.REACT_APP_BASE_URL;
console.log(process.env.REACT_APP_BASE_URL);
const API = axios.create({
  baseURL: url,
  // baseURL: "http://192.168.158.208:9000/",
});

// const API = axios.create({ baseURL: "http://localhost:9000" });
//register new user
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