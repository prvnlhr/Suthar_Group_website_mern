import React from "react";
import pageStyles from "../../css/companyPage/companyPage.module.css";
import styles1 from "../../css/productSection/productsList.module.css";
import styles2 from "../../css/whatWeDoSection/whatWeDoSection.module.css";
//
import DropDownMenu from "../appLayout/DropDownMenu";
import DropDownToggleBtn from "../appLayout/DropDownToggleBtn";
import BackBtn from "../buttons/BackBtn";

import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  Route,
  NavLink,
  useHistory,
  Switch,
  useLocation,
} from "react-router-dom";
import moment from "moment";
import BannerSection from "./BannerSection";
import ClientsSection from "./ClientSection/ClientsSection";
import ContactUsSection from "./ContactUsSection";
import ExploreProductsSection from "./ExploreProductsSection";
import FooterSection from "../home/footerSection/FooterSection";

const CompanyPage = () => {
  const history = useHistory();
  const location = useLocation();
  var year = moment().format("YYYY");

  const dropDownShow = useSelector(
    (state) => state.auxillaryReducer.dropDownShow
  );
  const linkClicked = (val) => {
    switch (val) {
      case 1:
        history.push("/");
        break;
      case 2:
        history.push("/productList/vishwakarma");
        break;
      case 3:
        history.push("/productList/KR");
        break;
      case 4:
        history.push("/company/contact");
        break;
    }

    // if (val === 1) {
    //   history.push("/", window.scrollY);
    // } else if (val === 2) {
    //   history.push("/productList/KR");
    // } else if (val === 3) {
    //   history.push("/productList/vishvakarma");
    // } else if (val === 4) {
    //   history.push("/company/contactUs");
    // }
  };
  const setSession = () => {
    sessionStorage.setItem("fromProductList", "yes");
  };
  // const backBtnClick = () => {
  //   const clickedDetailsJSON = JSON.parse(
  //     sessionStorage.getItem("clickDetails")
  //   );
  //   if (clickedDetailsJSON && clickedDetailsJSON.link === "explore") {
  //     const clickDetails = {
  //       from: "productList",
  //       link: "back",
  //     };
  //     sessionStorage.setItem("clickDetails", JSON.stringify(clickDetails));
  //   }
  //   history.push("/");
  // };
  return (
    <div className={pageStyles.companyPageWrapper} onClick={setSession}>
      <AnimatePresence>
        {dropDownShow === true && <DropDownMenu />}
      </AnimatePresence>

      <div className={pageStyles.headerWrapper}>
        <div className={pageStyles.companyLogoWrapper}>
          {location.pathname === "/company/vishwakarma" ? (
            <p className={pageStyles.companyNameText}>
              VISHVAKARMA ENGINEERING
            </p>
          ) : (
            location.pathname === "/company/KR" && (
              <p className={pageStyles.companyNameText}>SHREE KR ENGINEERING</p>
            )
          )}
        </div>
        <div className={pageStyles.quickLinksWrapperDesktop}>
          <div className={pageStyles.linksDiv} onClick={() => linkClicked(1)}>
            <p className={pageStyles.linkText}>HOME</p>
          </div>

          {location.pathname === "/company/vishwakarma" ? (
            <div className={pageStyles.linksDiv} onClick={() => linkClicked(2)}>
              <p className={pageStyles.linkText}>VISHVAKARMA PRODUCTS </p>
            </div>
          ) : (
            location.pathname === "/company/KR" && (
              <div
                className={pageStyles.linksDiv}
                onClick={() => linkClicked(3)}
              >
                <p className={pageStyles.linkText}>KR PRODUCTS </p>
              </div>
            )
          )}

          <div className={pageStyles.linksDiv} onClick={() => linkClicked(4)}>
            <p className={pageStyles.linkText}>CONTACT US</p>
          </div>
        </div>
        <div className={pageStyles.quickLinksWrapperMobile}>
          <div className={pageStyles.linksDiv} onClick={() => linkClicked(1)}>
            <p className={pageStyles.linkText}>HOME</p>
          </div>
        </div>
        <DropDownToggleBtn />
      </div>

      <div className={pageStyles.contentContainer}>
        {/* <BannerSection />
        <ExploreProductsSection />
        <ContactUsSection />
        <ClientsSection />
        <FooterSection /> */}
      </div>
    </div>
  );
};

export default CompanyPage;
