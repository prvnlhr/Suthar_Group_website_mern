import React, { useEffect, useRef, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Div100vh from "react-div-100vh";
import {
  browserName,
  browserVersion,
  isSafari,
  isChrome,
  isOpera,
  isFirefox,
} from "react-device-detect";

import { fetchKRProducts } from "../actions/krActions/krProductActions";
import { fetchVKProducts } from "../actions/vishvakarmaActions/vkProductActions";

import { getToken } from "../actions/authActions";
import { fetchUser } from "../actions/userAction";

import ProductsList from "./products/ProductsList";
import KRProductPage from "./products/KR/KRProductPage";
import SignUpPage from "./auth/SignUpPage";
import SignInPage from "./auth/SignInPage";

import ActivateAccount from "./auth/ActivateAccount";
import AuthenticatedRoute from "./appLayout/AuthenticatedRoute";
import UnAuthenticatedRoutes from "./appLayout/UnAuthenticatedRoutes";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
import NotFound from "./appLayout/NotFound";
import SendEnquiryPage from "./sendEnquiry/SendEnquiryPage";

import Home from "./home/Home";
import styles from "../css/appLayoutSection/app.module.css";
import VKProductPage from "./products/Vishvakarma/VKProductPage";
import { motion, AnimatePresence } from "framer-motion";
import Gallery from "./gallery/Gallery";
import CompanyPage from "./company/CompanyPage";
let windowInnerWidth = 0;
const Container = styled.div`
  position: relative;
  background-color: black;
  margin: 0;
  min-height: 100vh;
  width: 100vw;
`;

const Paper = styled.div`
  width: 480px !important;
  background-color: white;
`;
const App = () => {
  // ____________________________________________________________________
  // useEffect(() => {
  //   if (isSafari || isFirefox) {
  //     console.log(`${browserName} ${browserVersion}`);
  //     document.documentElement.style.setProperty("--appHeight", `${100}vh`);
  //   } else {
  //     console.log(`${browserName} ${browserVersion}`);
  //     document.documentElement.style.setProperty("--appHeight", `${100}%`);
  //   }
  // }, []);
  // const handleResize = () => {
  //   console.log(`${browserName} ${browserVersion}`);
  //   const currentWindowInnerWidth = window.innerWidth;
  //   if (currentWindowInnerWidth !== windowInnerWidth) {
  //     windowInnerWidth = currentWindowInnerWidth;
  //     const windowInnerHeight = window.innerHeight;
  //     document.documentElement.style.setProperty(
  //       "--vh",
  //       `${windowInnerHeight}px`
  //     );
  //   }
  // };

  // if (isSafari || isFirefox) {
  //   handleResize();
  // }
  // useEffect(() => {
  //   if (isSafari || isFirefox) {
  //     window.addEventListener("resize", handleResize);
  //   }
  //   return () => {
  //     if (isSafari || isFirefox) {
  //       window.removeEventListener("resize", handleResize);
  //     }
  //   };
  // }, []);

  // ________________________________________________________________________________________
  let vh = window.innerHeight * 0.01;
  // let vh = window.innerHeight;

  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty("--vh", `${vh}px`);
  window.addEventListener("resize", () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });
  // ________________________________________________________________________________________
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token.token);
  const dropDownShow = useSelector(
    (state) => state.auxillaryReducer.dropDownShow
  );

  const { isLogged } = auth;
  const history = useHistory();

  const [scrollPosition, setScrollPosition] = useState(0);
  const [backBtnClicked, setBackBtnClicked] = useState("no");
  const [currViewProduct, setCurrProductView] = useState(null);

  const node = useRef();
  const getAuthToken = async () => {
    await dispatch(getToken(history));
  };
  useEffect(() => {
    getAuthToken();
  }, []);

  useEffect(() => {
    dispatch(fetchKRProducts(token));
    dispatch(fetchVKProducts(token));
  }, []);

  return (
    <div className={styles.app} ref={node}>
      {/* <p>{window.innerHeight}</p> */}
      {/* <p>{document.documentElement.clientHeight}</p> */}

      {/* <div className={styles.strip}>
      
      </div> */}
      <Switch>
        <Route
          path="/company/auth/reset/:reset_token"
          component={
            isLogged === true
              ? NotFound
              : isLogged === false
              ? ResetPassword
              : null
          }
          exact
        />

        <Route exact path="/company/auth/login">
          <SignInPage
            scrollPosition={scrollPosition}
            setScrollPosition={setScrollPosition}
          />
        </Route>

        <Route
          exact
          path="/company/auth/register"
          render={(props) => (
            <SignUpPage
              {...props}
              scrollPosition={scrollPosition}
              setScrollPosition={setScrollPosition}
            />
          )}
        />

        <UnAuthenticatedRoutes
          exact
          path="/company/auth/forgotPassword"
          component={ForgotPassword}
        />

        <Route
          path="/company/auth/activate/:activation_token"
          component={
            isLogged === true
              ? NotFound
              : isLogged === false
              ? ActivateAccount
              : null
          }
          exact
        />

        <Route
          exact
          path="/"
          render={(props) => (
            <Home
              {...props}
              backBtnClicked={backBtnClicked}
              setBackBtnClicked={setBackBtnClicked}
              scrollPosition={scrollPosition}
              setScrollPosition={setScrollPosition}
            />
          )}
        />

        <Route
          exact
          path="/productList/KR/productView"
          render={(props) => (
            <KRProductPage
              {...props}
              currViewProduct={currViewProduct}
              setCurrProductView={setCurrProductView}
            />
          )}
        />

        <Route
          exact
          path="/productList/vishwakarma/productView"
          render={(props) => <VKProductPage {...props} />}
        />

        <Route
          path="/productList"
          render={(props) => (
            <ProductsList
              {...props}
              currViewProduct={currViewProduct}
              setCurrProductView={setCurrProductView}
              backBtnClicked={backBtnClicked}
              setBackBtnClicked={setBackBtnClicked}
              scrollPosition={scrollPosition}
              setScrollPosition={setScrollPosition}
            />
          )}
        />
        {/* <Route
          path="/productList/testPage"
          render={(props) => <TestComponent />}
        /> */}
        <Route
          path="/company/contact"
          render={(props) => <SendEnquiryPage />}
        />

        <Route path="/company/gallery" render={(props) => <Gallery />} />
        <Route path="/company" render={(props) => <CompanyPage />} />
      </Switch>
    </div>
  );
};
export default App;
