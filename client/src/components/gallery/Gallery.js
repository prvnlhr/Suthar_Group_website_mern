import React from "react";
import galleryStyles from "../../css/gallery/gallery.module.css";
import navStyles from "../../css/appLayoutSection/navbar.module.css";
import BackBtn from "../buttons/BackBtn";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import DropDownMenu from "../appLayout/DropDownMenu";
import DropDownToggleBtn from "../appLayout/DropDownToggleBtn";
import Navbar from "../appLayout/Navbar";
import { Route, NavLink, useHistory, Switch } from "react-router-dom";

const imgVariants = {
  hidden: { scale: 1.2, opacity: 0 },
  visible: {
    scale: 1,
    opacity: [0, 1],
    transition: {
      delay: 0.3,
      duration: 0.8,
      ease: [0.3, 0.1, 0.3, 1],
    },
  },
};
const arrowVariants = {
  hidden: { translateX: 20, opacity: 0 },
  visible: {
    translateX: 0,
    opacity: 1,
    transition: {
      delay: 0.3,
      duration: 0.8,
      ease: [0.3, 0.1, 0.3, 1],
    },
  },
};
const textVariants = {
  hidden: { translateY: 40, opacity: 0 },
  visible: {
    translateY: 0,
    opacity: 1,
    transition: {
      delay: 0.3,
      duration: 0.8,
      ease: [0.3, 0.1, 0.3, 1],
    },
  },
};
const lineVariants = {
  hidden: { translateX: -200 },
  visible: {
    translateX: 0,
    transition: {
      delay: 0.3,
      duration: 0.8,
      ease: [0.3, 0.1, 0.3, 1],
    },
  },
};
const Gallery = () => {
  const history = useHistory();
  const dropDownShow = useSelector(
    (state) => state.auxillaryReducer.dropDownShow
  );

  const backBtnClicked = () => {
    history.goBack();
  };

  return (
    <div className={galleryStyles.galleryComponent}>
      {/* <AnimatePresence>
        {dropDownShow === true && <DropDownMenu />}
      </AnimatePresence> */}

      <div className={galleryStyles.headerWrapper}>
        <div className={galleryStyles.companyLogoWrapper}>
          <p className={galleryStyles.companyNameText}>
            VISHVAKARMA ENGINEERING{" "}
          </p>
        </div>
        <div className={galleryStyles.quickLinksWrapperDesktop}>
          <div className={galleryStyles.linksDiv}>
            <p className={galleryStyles.linkText}>HOME</p>
          </div>

          <div className={galleryStyles.linksDiv}>
            <p className={galleryStyles.linkText}>KR PRODUCTS </p>
          </div>

          <div className={galleryStyles.linksDiv}>
            <p className={galleryStyles.linkText}>CONTACT US</p>
          </div>
        </div>
        <div className={galleryStyles.quickLinksWrapperMobile}>
          <div className={galleryStyles.linksDiv}>
            <p className={galleryStyles.linkText}>HOME</p>
          </div>
        </div>

        {/* <DropDownToggleBtn /> */}
      </div>

      <div className={galleryStyles.backBtnWrapper}>
        <div
          className={galleryStyles.backBtnContainer}
          onClick={backBtnClicked}
        >
          <BackBtn />
        </div>
      </div>

      <div className={galleryStyles.galleryHeadingWrapper}>
        <div className={galleryStyles.headingLineContainer}>
          <motion.div
            // variants={lineVariants}
            // initial="hidden"
            // animate="visible"
            className={galleryStyles.headingLineDiv}
          ></motion.div>
        </div>
        <div className={galleryStyles.headingContainer}>
          <motion.p
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className={galleryStyles.headingText}
          >
            Gallery
          </motion.p>
        </div>
      </div>

      {/* <div className={galleryStyles.contentContainer}> */}
      <div className={galleryStyles.imagesWrapper}>
        <div className={galleryStyles.imageDiv}></div>
        <div className={galleryStyles.imageDiv}></div>
        <div className={galleryStyles.imageDiv}></div>
        <div className={galleryStyles.imageDiv}></div>
        <div className={galleryStyles.imageDiv}></div>
        <div className={galleryStyles.imageDiv}></div>
        <div className={galleryStyles.imageDiv}></div>
        <div className={galleryStyles.imageDiv}></div>
        <div className={galleryStyles.imageDiv}></div>
        <div className={galleryStyles.imageDiv}></div>
        <div className={galleryStyles.imageDiv}></div>
        <div className={galleryStyles.imageDiv}></div>
        <div className={galleryStyles.imageDiv}></div>
        <div className={galleryStyles.imageDiv}></div>
        <div className={galleryStyles.imageDiv}></div>
        <div className={galleryStyles.imageDiv}></div>
        <div className={galleryStyles.imageDiv}></div>
        <div className={galleryStyles.imageDiv}></div>
        <div className={galleryStyles.imageDiv}></div>
        <div className={galleryStyles.imageDiv}></div>
        <div className={galleryStyles.imageDiv}></div>
        <div className={galleryStyles.imageDiv}></div>
        <div className={galleryStyles.imageDiv}></div>
        <div className={galleryStyles.imageDiv}></div>
      </div>
      {/* </div> */}
      <div className={galleryStyles.footerWrapper}></div>
    </div>
  );
};

export default Gallery;
