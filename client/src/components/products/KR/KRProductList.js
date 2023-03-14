import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../../css/krStyles/krProductList.module.css";
import btnStyles from "../../../css/btnStyles/addBtn.module.css";
import { CircleSpinner } from "react-spinners-kit";

import KRProductCard from "./KRProductCard";
import KRProductForm from "./KRProductForm";
import LazyLoad from "react-lazy-load";
import { Icon } from "@iconify/react";
import { deleteKRProduct } from "../../../actions/krActions/krProductActions";
import DeleteModal from "../../modal/DeleteModal";

const KRProductList = ({
  krProductList,
  currViewProduct,
  setCurrProductView,
}) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.token);
  const [showModal, setShowModal] = useState(false);
  const [currDeletingItem, setCurrDeletingItem] = useState("");
  const loadState = useSelector((state) => state.loadingReducer);
  const { itemId, place, isLoading, process } = loadState;
  const auth = useSelector((state) => state.auth);
  const { isLogged } = auth;
  const [formMode, setFormMode] = useState(false);
  const listNode = useRef();
  var timeOut = null;
  const [isScrolling, setIsScrolling] = useState(false);
  const formToggle = () => {
    setFormMode(!formMode);
  };

  useEffect(() => {
    if (listNode.current != null) {
      listNode.current.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (listNode.current != null) {
        listNode.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handleScroll = (e) => {
    setIsScrolling(true);
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      setIsScrolling(false);
    }, 200);
  };
  const confirmDelete = () => {
    dispatch(deleteKRProduct(currDeletingItem, token));
    setShowModal(!showModal);
  };
  return (
    <div className={styles.KRProductListWrapper}>
      {showModal && (
        <DeleteModal
          setShowModal={setShowModal}
          showModal={showModal}
          confirmDelete={confirmDelete}
        />
      )}
      <div className={styles.headerWrapper}>
        <p className={styles.pathText}>home</p>

        <div className={styles.chevronDiv}>
          <Icon
            icon="feather:chevron-left"
            rotate={2}
            className={styles.pathChevron}
          />
        </div>
        <p className={styles.pathText}>product list</p>

        <div className={styles.chevronDiv}>
          <Icon
            icon="feather:chevron-left"
            rotate={2}
            className={styles.pathChevron}
          />
        </div>
        <p className={styles.pathText}>Shree KR</p>

        <div className={styles.chevronDiv}>
          <Icon
            icon="feather:chevron-left"
            rotate={2}
            className={styles.pathChevron}
          />
        </div>
        <p className={styles.pathTextCurrent}>all products</p>
      </div>
      <div className={styles.contentContainer} ref={listNode}>
        <KRProductForm formMode={formMode} setFormMode={setFormMode} />
        {krProductList?.map((product, index) => (
          <KRProductCard
            key={index}
            setCurrDeletingItem={setCurrDeletingItem}
            product={product}
            formMode={formMode}
            setCurrProductView={setCurrProductView}
            setShowModal={setShowModal}
            showModal={showModal}
          />
        ))}

        {isLogged === true && (
          <>
            {formMode === false ? (
              <div
                className={
                  isScrolling === false
                    ? btnStyles.addBtnWrapper
                    : btnStyles.addBtnWrapperHidden
                }
                onClick={formToggle}
              >
                <div className={btnStyles.addBtnIconDiv}>
                  <Icon
                    icon="heroicons-solid:plus"
                    className={btnStyles.addBtnIcon}
                  />
                </div>
                <div className={btnStyles.addBtnTextDiv}>
                  <p>Add</p>
                </div>
              </div>
            ) : null}
          </>
        )}
      </div>
      {isLoading === true && place === "krProduct" && process === "add" ? (
        <div className={styles.loadingDiv}>
          <div className={styles.loadingHeader}>
            <p>Upload in progress</p>
            <CircleSpinner size={12} color="#2f89fc" loading={true} />
          </div>
          <div className={styles.loadingFooter}>
            <p>This may take a while</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default KRProductList;
