import React, { useState } from "react";
import styles from "../../css/appLayoutSection/dropDownMenu.module.css";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { Route, Link, useHistory, Switch, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CircleSpinner } from "react-spinners-kit";
import { logout } from "../../actions/authActions";
import { setDropDownShow } from "../../actions/auxillaryActions/auxillaryActions";

const dropDownVariants = {
  hidden: {
    y: "-100vh",
    opacity: 1,
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
    opacity: 1,
    y: "-100vh",
    transition: {
      duration: 0.5,
      ease: [0.83, 0, 0.17, 1],
    },
  },
};

const DropDownMenu = ({ footerUsSectionRef, aboutUsSectionRef }) => {
  const [currActiveMenu, setCurrActiveMenu] = useState(null);
  const loadState = useSelector((state) => state.loadingReducer);
  const { place, isLoading } = loadState;
  const auth = useSelector((state) => state.auth);
  const { isLogged } = auth;
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const toggleMenuItem = (val, height) => {
    if (val === currActiveMenu) {
      setCurrActiveMenu(null);
    } else {
      document.documentElement.style.setProperty(
        "--listItemWrapperHeight",
        `${height}px`
      );
      setCurrActiveMenu(val);
    }
  };

  const subItemClicked = (value) => {

    // switch (value) {
    //   case 1:
    //     history.push("/company/vishwakarma");
    //     dispatch(setDropDownShow(false));
    //     break;
    //   case 2:
    //     history.push("/company/KR");
    //     dispatch(setDropDownShow(false));
    //     break;
    //   case 3:
    //     history.push("/productList/vishwakarma");
    //     dispatch(setDropDownShow(false));
    //     break;
    //   case 4:
    //     history.push("/productList/KR");
    //     dispatch(setDropDownShow(false));
    //     break;

    //   case 5:
    //     history.push("/company/contact");
    //     dispatch(setDropDownShow(false));
    //     break;
    //   case 6:
    //     dispatch(setDropDownShow(false));
    //     let path1;
    //     let clickDetails1;
    //     if (location.pathname === "/") {
    //       path1 = "home";
    //       clickDetails1 = {
    //         from: path1,
    //         link: "connectSocially",
    //       };
    //       footerUsSectionRef.current.scrollIntoView({
    //         behavior: "smooth",
    //         block: "center",
    //       });
    //       sessionStorage.setItem("clickDetails", JSON.stringify(clickDetails1));
    //     } else {
    //       path1 = "notHome";
    //       clickDetails1 = {
    //         from: path1,
    //         link: "connectSocially",
    //       };
    //       history.push("/");
    //     }
    //     sessionStorage.setItem("clickDetails", JSON.stringify(clickDetails1));
    //     break;
    //   case 7:
    //     dispatch(setDropDownShow(false));
    //     let path2;
    //     let clickDetails2;
    //     if (location.pathname === "/") {
    //       path2 = "home";
    //       clickDetails2 = {
    //         from: path2,
    //         link: "aboutUs",
    //       };
    //       aboutUsSectionRef.current.scrollIntoView({
    //         behavior: "smooth",
    //         block: "center",
    //       });
    //       sessionStorage.setItem("clickDetails", JSON.stringify(clickDetails2));
    //     } else {
    //       path2 = "notHome";
    //       clickDetails2 = {
    //         from: path2,
    //         link: "aboutUs",
    //       };
    //       history.push("/");
    //     }
    //     sessionStorage.setItem("clickDetails", JSON.stringify(clickDetails2));
    //     break;
    //   case 8:
    //     dispatch(setDropDownShow(false));
    //     history.push("/company/gallery");
    //     break;
    //   case 9:
    //     history.push("/company/auth/login");
    //     break;
    // }
  };

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(logout(history));
  };
  return (
    <motion.div
      variants={dropDownVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={styles.dropDownWrapper}
    >
      <div className={styles.dropDownHeaderWrapper}>
        <p className={styles.menuHeaderText}>MENU</p>
      </div>
      <div className={styles.dropDownListWrapper}>
        {/* _______________________________________ */}
        <div
          className={
            currActiveMenu === 1
              ? styles.listItemWrapperExpand
              : styles.listItemWrapperCollapse
          }
        >
          <div
            className={styles.mainItemDiv}
            onClick={() => toggleMenuItem(1, 150)}
          >
            <p className={styles.mainItemDivText}>OUR COMPANIES</p>
          </div>
          <div className={styles.subItemDiv} onClick={() => subItemClicked(1)}>
            <div className={styles.subItemDivLineDiv}>
              <div className={styles.subItemDivLine}></div>
            </div>
            <p className={styles.subItemDivText}>VISHVAKARMA ENGINEERING</p>
          </div>
          <div className={styles.subItemDiv} onClick={() => subItemClicked(2)}>
            <div className={styles.subItemDivLineDiv}>
              <div className={styles.subItemDivLine}></div>
            </div>
            <p className={styles.subItemDivText}>SHREE KR ENGINEERING</p>
          </div>
        </div>

        {/* _____________________________________ */}
        <div
          className={
            currActiveMenu === 2
              ? styles.listItemWrapperExpand
              : styles.listItemWrapperCollapse
          }
        >
          <div
            className={styles.mainItemDiv}
            // NOTE :: we need to pass the height of expanded Div ex. 150, over here
            onClick={() => toggleMenuItem(2, 150)}
          >
            <p className={styles.mainItemDivText}>OUR PRODUCTS</p>
          </div>
          <div className={styles.subItemDiv} onClick={() => subItemClicked(3)}>
            <div className={styles.subItemDivLineDiv}>
              <div className={styles.subItemDivLine}></div>
            </div>
            <p className={styles.subItemDivText}>VISHVAKARMA ENGINEERING</p>
          </div>
          <div className={styles.subItemDiv} onClick={() => subItemClicked(4)}>
            <div className={styles.subItemDivLineDiv}>
              <div className={styles.subItemDivLine}></div>
            </div>
            <p className={styles.subItemDivText}>SHREE KR ENGINEERING</p>
          </div>
        </div>

        {/* ________________________________________*/}
        <div
          className={
            currActiveMenu === 3
              ? styles.listItemWrapperExpand
              : styles.listItemWrapperCollapse
          }
        >
          <div
            className={styles.mainItemDiv}
            onClick={() => toggleMenuItem(3, 150)}
          >
            <p className={styles.mainItemDivText}>CONTACT US</p>
          </div>
          <div className={styles.subItemDiv} onClick={() => subItemClicked(5)}>
            <div className={styles.subItemDivLineDiv}>
              <div className={styles.subItemDivLine}></div>
            </div>
            <p className={styles.subItemDivText}>SEND ENQUIRY</p>
          </div>
          <div className={styles.subItemDiv} onClick={() => subItemClicked(6)}>
            <div className={styles.subItemDivLineDiv}>
              <div className={styles.subItemDivLine}></div>
            </div>
            <p className={styles.subItemDivText}>CONNECT SOCIALLY</p>
          </div>
        </div>
        {/* _________________________________________ */}
        <div
          className={
            currActiveMenu === 4
              ? styles.listItemWrapperExpand
              : styles.listItemWrapperCollapse
          }
        >
          <div
            className={styles.mainItemDiv}
            onClick={() => toggleMenuItem(4, 150)}
          >
            <p className={styles.mainItemDivText}>COMPANY</p>
          </div>
          <div className={styles.subItemDiv} onClick={() => subItemClicked(7)}>
            <div className={styles.subItemDivLineDiv}>
              <div className={styles.subItemDivLine}></div>
            </div>
            <p className={styles.subItemDivText}>ABOUT US</p>
          </div>
          <div className={styles.subItemDiv} onClick={() => subItemClicked(8)}>
            <div className={styles.subItemDivLineDiv}>
              <div className={styles.subItemDivLine}></div>
            </div>
            <p className={styles.subItemDivText}>GALLERY</p>
          </div>
        </div>
        {/* __________________________________________ */}
        <div
          className={
            currActiveMenu === 5
              ? styles.listItemWrapperExpand
              : styles.listItemWrapperCollapse
          }
        >
          <div
            className={styles.mainItemDiv}
            onClick={() => toggleMenuItem(5, 150)}
          >
            <p className={styles.mainItemDivText}>OWNER</p>
          </div>
          {isLogged === true ? (
            <div className={styles.subItemDiv} onClick={logoutHandler}>
              <div className={styles.subItemDivLineDiv}>
                <div className={styles.subItemDivLine}></div>
              </div>
              <p className={styles.subItemDivText}>LOGOUT</p>

              {place === "logout" && isLoading === true && (
                <div className={styles.spinnerDiv}>
                  <CircleSpinner
                    className={styles.spinner}
                    size={13}
                    color="#2257BF"
                    loading={true}
                  />
                </div>
              )}
            </div>
          ) : (
            <div
              className={styles.subItemDiv}
              onClick={() => subItemClicked(9)}
            >
              <div className={styles.subItemDivLineDiv}>
                <div className={styles.subItemDivLine}></div>
              </div>
              <p className={styles.subItemDivText}>OWNER LOGIN</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default DropDownMenu;

// className={styles.subItemDivLine}
// if (value === 1) {
//   // history.push("/productList/vishvakarma");
//   history.push("/company/vishwakarma");
//   dispatch(setDropDownShow(false));
// }

// // ________________________________
// else if (value === 2) {
//   history.push("/company/KR");
//   dispatch(setDropDownShow(false));
// }
// // ________________________________
// else if (value === 3) {
//   history.push("/company/contact");
//   dispatch(setDropDownShow(false));
// }

// // ________________________________
// else if (value === 4) {
//   dispatch(setDropDownShow(false));
//   let path;
//   let clickDetails;
//   if (location.pathname === "/") {
//     path = "home";
//     clickDetails = {
//       from: path,
//       link: "connectSocially",
//     };
//     footerUsSectionRef.current.scrollIntoView({
//       behavior: "smooth",
//       block: "center",
//     });
//     sessionStorage.setItem("clickDetails", JSON.stringify(clickDetails));
//   } else {
//     path = "notHome";
//     clickDetails = {
//       from: path,
//       link: "connectSocially",
//     };
//     history.push("/");
//   }
//   sessionStorage.setItem("clickDetails", JSON.stringify(clickDetails));
// }
// // _________________________________
// else if (value === 5) {
//   dispatch(setDropDownShow(false));
//   let path;
//   let clickDetails;
//   if (location.pathname === "/") {
//     path = "home";
//     clickDetails = {
//       from: path,
//       link: "aboutUs",
//     };
//     aboutUsSectionRef.current.scrollIntoView({
//       behavior: "smooth",
//       block: "center",
//     });
//     sessionStorage.setItem("clickDetails", JSON.stringify(clickDetails));
//   } else {
//     path = "notHome";
//     clickDetails = {
//       from: path,
//       link: "aboutUs",
//     };
//     history.push("/");
//   }
//   sessionStorage.setItem("clickDetails", JSON.stringify(clickDetails));
// } else if (value === 6) {
//   dispatch(setDropDownShow(false));
//   history.push("/company/gallery");
// } else if (value === 7) {
//   history.push("/company/auth/login");
// }
