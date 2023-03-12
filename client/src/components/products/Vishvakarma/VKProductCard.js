import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, Redirect, useNavigate } from "react-router-dom";
import { CircleSpinner } from "react-spinners-kit";
import { Icon } from "@iconify/react";
import { deleteVKProduct } from "../../../actions/vishvakarmaActions/vkProductActions";
import { setVKCurrProductView } from "../../../actions/auxillaryActions/auxillaryActions";
import DeleteModal from "../../modal/DeleteModal";
import styles from "../../../css/vishvakarmaStyles/vkProductCard.module.css";
import LazyLoad from "react-lazy-load";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
const cardVariants = {
  hidden: { translateY: 40, opacity: 0 },
  visible: {
    translateY: 0,
    opacity: [0, 0.5, 1],
    transition: {
      // delay: 0.5,
      duration: 0.8,
      ease: [0.3, 0.1, 0.3, 1],
    },
  },
};

const VKProductCard = ({
  product,
  formMode,
  showModal,
  setShowModal,
  setCurrDeletingItem,
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
    if (!inView) {
      controls.start("hidden");
    }
  }, [controls, inView]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [modalShow, setModalShow] = useState(false);

  const token = useSelector((state) => state.token.token);
  const loadState = useSelector((state) => state.loadingReducer);
  const { itemId, place, isLoading, process } = loadState;

  const auth = useSelector((state) => state.auth);
  const { isLogged } = auth;

  const imageClicked = () => {
    if (formMode === false) {
      sessionStorage.setItem("currVkProductView", JSON.stringify(product));
      const productJSON = JSON.parse(
        sessionStorage.getItem("currVkProductView")
      );
      dispatch(setVKCurrProductView(productJSON));
      navigate("/productList/vishwakarma/productView");
    }
  };

  const handleDeleteClick = () => {
    const data = {
      productId: product._id,
      cloudId: product.cloudinary_id,
    };
    setCurrDeletingItem(data);
    setShowModal(!showModal);
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={cardVariants}
      className={styles.productCardWrapper}
    >
      <div className={styles.productImageWrapper}>
        <LazyLoad offsetBottom={50} className={styles.productImg}>
          <img
            className={styles.productImg}
            src={product.imageUrl}
            alt="image"
            onClick={imageClicked}
          />
        </LazyLoad>

        {isLogged === true && (
          <div
            className={styles.loadingDiv}
            onClick={() => {
              handleDeleteClick();
            }}
          >
            {isLoading === true &&
              place === "vkProduct" &&
              itemId === product._id &&
              process === "delete" ? (
              <CircleSpinner size={12} color="#0075ff" loading={true} />
            ) : (
              <Icon icon="ci:trash-empty" className={styles.trashIcon} />
            )}
          </div>
        )}
      </div>
      <div className={styles.productTitleWrapper}>
        <p>{product.componentName}</p>
      </div>
    </motion.div>
  );
};

export default VKProductCard;
