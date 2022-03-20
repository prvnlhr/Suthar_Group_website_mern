import React, { useState, useEffect } from "react";
import { Route, NavLink, useHistory, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "../../../css/vishvakarmaStyles/vkProductPage.module.css";
import { motion, AnimatePresence } from "framer-motion";
import DropDownMenu from "../../appLayout/DropDownMenu";
import navStyles from "../../../css/appLayoutSection/navbar.module.css";
import { Icon } from "@iconify/react";
import { editVKProduct } from "../../../actions/vishvakarmaActions/vkProductActions";
import { CircleSpinner } from "react-spinners-kit";
import { useInView } from "react-intersection-observer";
import DropDownToggleBtn from "../../appLayout/DropDownToggleBtn";
import BackBtn from "../../buttons/BackBtn";
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

const VKProductPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const loadState = useSelector((state) => state.loadingReducer);
  const { itemId, place, isLoading, process } = loadState;
  const auth = useSelector((state) => state.auth);
  const { isLogged } = auth;
  const token = useSelector((state) => state.token.token);
  const product = useSelector(
    (state) => state.auxillaryReducer.currentVKProductView
  );
  const dropDownShow = useSelector(
    (state) => state.auxillaryReducer.dropDownShow
  );

  const [inEditMode, setEditMode] = useState(false);
  const [currActiveMenu, setCurrActiveMenu] = useState(null);
  const [newProductData, setNewProductData] = useState({
    componentName: "",
  });

  useEffect(() => {
    if (product === null) {
      history.push("/productList/vishwakarma");
    } else {
      setNewProductData(product);
    }
  }, [product]);

  const saveBtnClicked = () => {
    setEditMode(false);
    dispatch(editVKProduct(newProductData, token));
  };
  const backBtnClicked = () => {
    history.goBack();
  };

  const toggleEditMode = () => {
    setEditMode(!inEditMode);
  };
  return (
    <motion.div className={styles.VKProductPageWrapper}>
      <AnimatePresence>
        {dropDownShow === true && <DropDownMenu />}
      </AnimatePresence>

      <div className={styles.headerWrapper}>
        <DropDownToggleBtn />
        {/* <AnimatePresence>
          <motion.div
            // variants={hamIconVariants}
            initial="hidden"
            animate="visible"
            className={navStyles.hamDiv}
            onClick={() => {
              setCurrActiveMenu(null);
              setDropDownShow(!dropDownShow);
            }}
          >
            {dropDownShow === true ? (
              <Icon
                icon="ph:x-bold"
                color="black"
                className={navStyles.hamIcon}
              />
            ) : (
              <Icon
                icon="gg:menu-motion"
                color="black"
                className={navStyles.hamIcon}
              />
            )}
          </motion.div>
        </AnimatePresence> */}
      </div>
      <div className={styles.backBtnWrapper}>
        <div className={styles.backBtnContainer} onClick={backBtnClicked}>
          <BackBtn/>
          {/* <motion.div
            variants={arrowVariants}
            initial="hidden"
            animate="visible"
            className={styles.iconDiv}
          >
            <Icon
              icon="bi:arrow-down-left"
              rotate={1}
              className={styles.arrowIcon}
            />
          </motion.div>
          <div className={styles.backBtnTextDiv}>
            <p className={styles.backBtnText}>Back</p>
          </div> */}
        </div>
        {isLogged === true && (
          <div className={styles.editBtnsWrapper}>
            {inEditMode === true ? (
              <div className={styles.editBtnDiv} onClick={saveBtnClicked}>
                <Icon
                  icon="majesticons:check-line"
                  className={styles.editIcons}
                />
              </div>
            ) : (
              <div className={styles.editBtnDiv} onClick={toggleEditMode}>
                {isLoading === true &&
                place === "vkProduct" &&
                process === "edit" ? (
                  <CircleSpinner size={12} color="#0075ff" loading={true} />
                ) : (
                  <Icon icon="akar-icons:edit" className={styles.editIcons} />
                )}
              </div>
            )}
            {inEditMode === true && (
              <div className={styles.editBtnDiv} onClick={toggleEditMode}>
                <Icon icon="feather:x" className={styles.editIcons} />
              </div>
            )}
          </div>
        )}
      </div>

      <div className={styles.productNameWrapper}>
        <div className={styles.nameLineContainer}>
          <motion.div
            variants={lineVariants}
            initial="hidden"
            animate="visible"
            className={styles.nameLineDiv}
          ></motion.div>
        </div>
        <div className={styles.productNameContainer}>
          {inEditMode === true ? (
            <input
              className={styles.nameEditInput}
              value={newProductData.componentName}
              onChange={(e) =>
                setNewProductData({
                  ...newProductData,
                  componentName: e.target.value,
                })
              }
            />
          ) : (
            <motion.p
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className={styles.productNameText}
            >
              {product ? product.componentName : null}
            </motion.p>
          )}
        </div>
      </div>
      <div className={styles.imageWrapper}>
        <div className={styles.imageContainer}>
          <motion.img
            variants={imgVariants}
            initial="hidden"
            animate="visible"
            src={product ? product.imageUrl : "noImage"}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default VKProductPage;
