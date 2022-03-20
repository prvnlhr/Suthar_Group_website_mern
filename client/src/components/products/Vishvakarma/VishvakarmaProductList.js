import React, { useState, useRef, useEffect } from "react";
import styles from "../../../css/vishvakarmaStyles/vishvakarmaProductList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { CircleSpinner } from "react-spinners-kit";
import { Icon } from "@iconify/react";
import btnStyles from "../../../css/btnStyles/addBtn.module.css";
import VKProductForm from "./VKProductForm";
import VKProductCard from "./VKProductCard";
import DeleteModal from "../../modal/DeleteModal";
import { deleteVKProduct } from "../../../actions/vishvakarmaActions/vkProductActions";

const VishvakarmaProductList = ({ vkProductList }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.token);

  const [showModal, setShowModal] = useState(false);
  const [currDeletingItem, setCurrDeletingItem] = useState("");
  const loadState = useSelector((state) => state.loadingReducer);
  const { itemId, place, isLoading, process } = loadState;
  const auth = useSelector((state) => state.auth);
  const { isLogged } = auth;
  const listNode = useRef();
  var timeOut = null;
  const [isScrolling, setIsScrolling] = useState(false);
  const [formMode, setFormMode] = useState(false);
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
    dispatch(deleteVKProduct(currDeletingItem, token));
    setShowModal(!showModal);
  };

  return (
    <div className={styles.viswakarmaProductListWrapper}>
      {showModal && (
        <DeleteModal
          setShowModal={setShowModal}
          showModal={showModal}
          confirmDelete={confirmDelete}
        />
      )}
      <div className={styles.headerWrapper}>
        <div className={styles.pathDiv}>
          <p className={styles.pathText}>home</p>
        </div>
        <div className={styles.chevronDiv}>
          <Icon
            icon="feather:chevron-left"
            rotate={2}
            className={styles.pathChevron}
          />
        </div>
        <div className={styles.pathDiv}>
          <p className={styles.pathText}>product list</p>
        </div>
        <div className={styles.chevronDiv}>
          <Icon
            icon="feather:chevron-left"
            rotate={2}
            className={styles.pathChevron}
          />
        </div>
        <div className={styles.pathDiv}>
          <p className={styles.pathText}>Vishvakarma</p>
        </div>

        <div className={styles.chevronDiv}>
          <Icon
            icon="feather:chevron-left"
            rotate={2}
            className={styles.pathChevron}
          />
        </div>
        <div className={styles.pathDiv}>
          <p className={styles.pathTextCurrent}>all products</p>
        </div>
      </div>
      <div className={styles.contentContainer} ref={listNode}>
        <VKProductForm formMode={formMode} setFormMode={setFormMode}  />
        {vkProductList.map((product, index) => (
          <VKProductCard
            key={index}
            setCurrDeletingItem={setCurrDeletingItem}
            product={product}
            formMode={formMode}
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
      {isLoading === true && place === "vkProduct" && process === "add" ? (
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

export default VishvakarmaProductList;
