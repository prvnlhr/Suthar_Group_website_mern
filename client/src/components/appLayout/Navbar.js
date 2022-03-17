import React, { useEffect, useState } from "react";
import styles from "../../css/appLayoutSection/navbar.module.css";
import { Icon } from "@iconify/react";
import { Route, Link, useHistory, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CircleSpinner } from "react-spinners-kit";
import { logout } from "../../actions/authActions";
import DropDownMenu from "./DropDownMenu";
import { Spiral as Hamburger } from "hamburger-react";
import DropDownToggleBtn from "./DropDownToggleBtn";
import { setDropDownShow } from "../../actions/auxillaryActions/auxillaryActions";
import { motion, AnimatePresence } from "framer-motion";

const hamIconVariants = {
  hidden: {
    rotate: 0,
    opacity: 0,
    duration: 0.5,
  },
  visible: {
    opacity: 1,
    rotate: 0,
    transition: {
      staggerChildren: 0.5,
      duration: 0.5,
      ease: [0.83, 0, 0.17, 1],
    },
  },
  exit: {
    opacity: 0,
    rotate: 0,
    transition: {
      duration: 0.5,
      ease: [0.83, 0, 0.17, 1],
    },
  },
};
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
const Navbar = ({
  node,
  ourCompaniesSectionRef,
  aboutUsSectionRef,
  contactUsSectionRef,
  currVisible,
}) => {
  const [productLinkClicked, setProductLinkClicked] = useState(false);
  const [currActiveMenu, setCurrActiveMenu] = useState(null);
  const loadState = useSelector((state) => state.loadingReducer);
  const { place, isLoading } = loadState;
  const auth = useSelector((state) => state.auth);

  const dropDownShow = useSelector(
    (state) => state.auxillaryReducer.dropDownShow
  );
  const { isLogged } = auth;
  const dispatch = useDispatch();
  const history = useHistory();

  const toggleMenuItem = (val) => {
    if (val === currActiveMenu) {
      setCurrActiveMenu(null);
    } else {
      setCurrActiveMenu(val);
    }
  };

  const linkedClicked = (val) => {
    if (val === 1) {
      ourCompaniesSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    } else if (val === 2) {
      contactUsSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    } else if (val === 3) {
      aboutUsSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(logout(history));
  };

  return (
    <div className={styles.navbarWrapper}>
      <div className={styles.companyNameDiv}>
        <p className={styles.companyNameText}>Suthar Group</p>
      </div>
      <div className={styles.linkContainer}>
        <div className={styles.linkDiv} onClick={() => linkedClicked(1)}>
          <p
            className={
              currVisible === "home" ? styles.linkTextActive : styles.linkText
            }
            // onClick={() => setProductLinkClicked(!productLinkClicked)}
          >
            HOME
          </p>
          {productLinkClicked === true && (
            <div className={styles.productsLinksPopUpContainer}></div>
          )}
        </div>
        <div className={styles.linkDiv} onClick={() => linkedClicked(3)}>
          <p
            className={
              currVisible === "aboutUsSection"
                ? styles.linkTextActive
                : styles.linkText
            }
          >
            ABOUT US
          </p>
        </div>
        <div className={styles.linkDiv} onClick={() => linkedClicked(1)}>
          <p
            className={
              currVisible === "ourCompaniesSection"
                ? styles.linkTextActive
                : styles.linkText
            }
            // onClick={() => setProductLinkClicked(!productLinkClicked)}
          >
            OUR COMPANIES
          </p>
        </div>

        <div className={styles.linkDiv} onClick={() => linkedClicked(2)}>
          <p
            className={
              currVisible === "contactUsSection"
                ? styles.linkTextActive
                : styles.linkText
            }
          >
            CONTACT US
          </p>
        </div>

      </div>
    </div>
  );
};

export default Navbar;
