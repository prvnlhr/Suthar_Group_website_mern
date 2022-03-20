import React, { useState, useEffect } from "react";

import {
  Route,
  NavLink,
  useHistory,
  Switch,
  useLocation,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { logout } from "../../actions/authActions";
import moment from "moment";
import styles from "../../css/productSection/productsList.module.css";
import { Icon } from "@iconify/react";
import KRProductList from "./KR/KRProductList";
import VishvakarmaProductList from "./Vishvakarma/VishvakarmaProductList";
import DropDownMenu from "../appLayout/DropDownMenu";
import DropDownToggleBtn from "../appLayout/DropDownToggleBtn";
import BackBtn from "../buttons/BackBtn";
const dropDownVariants = {
  hidden: {
    y: "-100vh",
    opacity: 0,
    duration: 0.5,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.5,
      duration: 0.5,
      ease: [0.83, 0, 0.17, 1],
    },
  },
  exit: {
    opacity: 0,
    y: "-100vh",
    transition: {
      duration: 0.5,
      ease: [0.83, 0, 0.17, 1],
    },
  },
};
const ProductsList = ({
  scrollPosition,
  setScrollPosition,
  backBtnClicked,
  setBackBtnClicked,
  currViewProduct,
  setCurrProductView,
}) => {
  const krProductList = useSelector(
    (state) => state.kr_productReducer.kr_productList
  );
  const vkProductList = useSelector(
    (state) => state.vk_productReducer.vk_productList
  );
  const dropDownShow = useSelector(
    (state) => state.auxillaryReducer.dropDownShow
  );
  const [currActiveMenu, setCurrActiveMenu] = useState(null);
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  var year = moment().format("YYYY");
  const setSession = () => {
    sessionStorage.setItem("fromProductList", "yes");
  };
  const toggleMenuItem = (val) => {
    if (val === currActiveMenu) {
      setCurrActiveMenu(null);
    } else {
      setCurrActiveMenu(val);
    }
  };

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(logout(history));
  };

  const linkClicked = (val) => {
    if (val === 1) {
      history.push("/", window.scrollY);
    } else if (val === 2) {
      history.push("/productList/KR");
    } else if (val === 3) {
      history.push("/productList/vishwakarma");
    } else if (val === 4) {
      history.push("/company/contact");
    }
  };

  const backBtnClick = () => {
    history.goBack();
    // const clickedDetailsJSON = JSON.parse(
    //   sessionStorage.getItem("clickDetails")
    // );
    // if (clickedDetailsJSON && clickedDetailsJSON.link === "explore") {
    //   const clickDetails = {
    //     from: "productList",
    //     link: "back",
    //   };
    //   sessionStorage.setItem("clickDetails", JSON.stringify(clickDetails));
    // }
    // history.push("/");
  };

  return (
    <div className={styles.productListWrapper} onClick={setSession}>
      <AnimatePresence>
        {dropDownShow === true && <DropDownMenu />}
      </AnimatePresence>
      <div className={styles.headerWrapper}>
        <div className={styles.companyLogoWrapper}>
          {location.pathname === "/productList/vishwakarma" ? (
            <p className={styles.companyNameText}>VISHVAKARMA ENGINEERING </p>
          ) : (
            location.pathname === "/productList/KR" && (
              <p className={styles.companyNameText}>SHREE KR ENGINEERING </p>
            )
          )}
        </div>
        <div className={styles.quickLinksWrapperDesktop}>
          <div className={styles.linksDiv} onClick={() => linkClicked(1)}>
            <p className={styles.linkText}>HOME</p>
          </div>

          {location.pathname === "/productList/vishwakarma" ? (
            <div className={styles.linksDiv} onClick={() => linkClicked(2)}>
              <p className={styles.linkText}>KR PRODUCTS </p>
            </div>
          ) : (
            location.pathname === "/productList/KR" && (
              <div className={styles.linksDiv} onClick={() => linkClicked(3)}>
                <p className={styles.linkText}>VISHVAKARMA PRODUCTS </p>
              </div>
            )
          )}

          <div className={styles.linksDiv} onClick={() => linkClicked(4)}>
            <p className={styles.linkText}>CONTACT US</p>
          </div>
        </div>
        <div className={styles.quickLinksWrapperMobile}>
          <div className={styles.linksDiv} onClick={() => linkClicked(1)}>
            <p className={styles.linkText}>HOME</p>
          </div>
        </div>
        <DropDownToggleBtn />
      </div>
      <div className={styles.backBtnWrapper}>
        <div className={styles.backBtnContainer} onClick={backBtnClick}>
          <BackBtn />
          {/* <div className={styles.iconDiv}>
            <Icon
              icon="bi:arrow-down-left"
              rotate={1}
              className={styles.arrowIcon}
            />
          </div>
          <div className={styles.backLinkDiv}>
            <p className={`${styles.backText}`}>Back</p>
          </div> */}
        </div>
      </div>

      <div className={styles.productListContainer}>
        <Switch>
          <Route
            exact
            path="/productList/vishwakarma"
            render={(props) => (
              <VishvakarmaProductList
                {...props}
                vkProductList={vkProductList}
              />
            )}
          />

          <Route
            exact
            path="/productList/KR"
            render={(props) => (
              <KRProductList
                {...props}
                krProductList={krProductList}
                currViewProduct={currViewProduct}
                setCurrProductView={setCurrProductView}
              />
            )}
          />
        </Switch>
      </div>
      <div className={styles.footerWrapper}>
        <p className={styles.footerText}>
          Copyright {year} , All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default ProductsList;
