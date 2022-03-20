import React, { useState, useEffect } from "react";
import styles from "../../../css/krStyles/krProductPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Route, NavLink, useHistory, Switch } from "react-router-dom";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import navStyles from "../../../css/appLayoutSection/navbar.module.css";
import { CircleSpinner } from "react-spinners-kit";
import { editKRProduct } from "../../../actions/krActions/krProductActions";
import { setKRCurrProductView } from "../../../actions/auxillaryActions/auxillaryActions";
import DropDownToggleBtn from "../../appLayout/DropDownToggleBtn";
import BackBtn from "../../buttons/BackBtn";
import DropDownMenu from "../../appLayout/DropDownMenu";

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
const attrVariants = {
  hidden: { translateX: 40, opacity: 0 },
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
const KRProductPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { isLogged } = auth;
  const product = useSelector(
    (state) => state.auxillaryReducer.currentKRProductView
  );
  const dropDownShow = useSelector(
    (state) => state.auxillaryReducer.dropDownShow
  );
  const token = useSelector((state) => state.token.token);

  const loadState = useSelector((state) => state.loadingReducer);
  const { itemId, place, isLoading, process } = loadState;

  const [currActiveMenu, setCurrActiveMenu] = useState(null);
  const [inEditMode, setEditMode] = useState(false);
  const [newProductData, setNewProductData] = useState({
    productName: "",
    productOrderQuantity: "",
    productDiameter: "",
    productPrice: "",
  });

  useEffect(() => {
    if (product === null) {
      history.push("/productList/KR");
    } else {
      setNewProductData(product);
    }
  }, [product]);

  const backBtnClicked = () => {
    history.goBack();
  };
  const saveBtnClicked = () => {
    setEditMode(false);
    dispatch(editKRProduct(newProductData, token));
  };
  const toggleEditMode = () => {
    setEditMode(!inEditMode);
  };

  return (
    <div className={styles.KRProductPageWrapper}>
      <AnimatePresence>
        {dropDownShow === true && <DropDownMenu />}
      </AnimatePresence>
      <div className={styles.headerWrapper}>
        <DropDownToggleBtn />
      </div>
      <div className={styles.imageWrapper}>
        <div className={styles.imageContainer}>
          <motion.img
            variants={imgVariants}
            initial="hidden"
            animate="visible"
            className={styles.productImage}
            src={product ? product.imageUrl : "no image"}
          />
        </div>

        <div className={styles.backBtnWrapper}>
          <div className={styles.backBtnMobContainer} onClick={backBtnClicked}>
            <BackBtn />
          </div>
        </div>
      </div>

      <div className={styles.descriptionWrapper}>
        <div className={styles.descriptionHeaderWrapper}>
          <div
            className={styles.backBtnDesktopContainer}
            onClick={backBtnClicked}
          >
            <BackBtn />

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
                  place === "krProduct" &&
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

        <div className={styles.nameWrapper}>
          <div className={styles.nameLineContainer}>
            <motion.div
              variants={lineVariants}
              initial="hidden"
              animate="visible"
              className={styles.nameLineDiv}
            ></motion.div>
          </div>
          <div className={styles.nameContainer}>
            {inEditMode === true ? (
              <input
                className={styles.nameEditInput}
                value={newProductData.productName}
                onChange={(e) =>
                  setNewProductData({
                    ...newProductData,
                    productName: e.target.value,
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
                {product ? product.productName : null}
              </motion.p>
            )}
          </div>
        </div>
        <div className={styles.specsWrapper}>
          <div className={styles.specsContainer}>
            <div className={styles.specsDiv}>
              <div className={styles.labelDiv}>
                <p className={styles.labelText}>Minimum Order Quantity :</p>
              </div>
              <div className={styles.attributeDiv}>
                {inEditMode === true ? (
                  <input
                    className={styles.attributeEditInput}
                    value={newProductData.productOrderQuantity}
                    onChange={(e) =>
                      setNewProductData({
                        ...newProductData,
                        productOrderQuantity: e.target.value,
                      })
                    }
                  />
                ) : (
                  <motion.p
                    variants={attrVariants}
                    initial="hidden"
                    animate="visible"
                    className={styles.attributeText}
                  >
                    {product ? product.productOrderQuantity : null}
                  </motion.p>
                )}
              </div>
            </div>
            <div className={styles.specsDiv}>
              <div className={styles.labelDiv}>
                <p className={styles.labelText}>Rib Diameter :</p>
              </div>
              <div className={styles.attributeDiv}>
                {inEditMode === true ? (
                  <input
                    className={styles.attributeEditInput}
                    value={newProductData.productDiameter}
                    onChange={(e) =>
                      setNewProductData({
                        ...newProductData,
                        productDiameter: e.target.value,
                      })
                    }
                  />
                ) : (
                  <motion.p
                    variants={attrVariants}
                    initial="hidden"
                    animate="visible"
                    className={styles.attributeText}
                  >
                    {product ? product.productDiameter : null}
                  </motion.p>
                )}
              </div>
            </div>
            <div className={styles.specsDiv}>
              <div className={styles.labelDiv}>
                <p className={styles.labelText}>Price :</p>
              </div>
              <div className={styles.attributeDiv}>
                {inEditMode === true ? (
                  <input
                    className={styles.attributeEditInput}
                    value={newProductData.productPrice}
                    onChange={(e) =>
                      setNewProductData({
                        ...newProductData,
                        productPrice: e.target.value,
                      })
                    }
                  />
                ) : (
                  <>
                    <motion.p
                      variants={attrVariants}
                      initial="hidden"
                      animate="visible"
                      className={styles.attributeText}
                    >
                      <Icon icon="ph:currency-inr-bold" />
                      {product ? product.productPrice : null}
                    </motion.p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KRProductPage;
