import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewVKProduct } from "../../../actions/vishvakarmaActions/vkProductActions";

import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

import styles from "../../../css/vishvakarmaStyles/vkProductForm.module.css";
const variants = {
  open: {
    opacity: 1,
    scale: 1,
  },
  closed: {
    scale: 0,
  },
};
const VKProductForm = ({ formMode, setFormMode }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.token);

  const [productDetails, setProductDetails] = useState({
    componentName: "",
  });
  const [file, setFile] = useState();
  const [previewImg, setPreviewImg] = useState("");
  const { componentName } = productDetails;

  const uploadProduct = () => {
    formToggle();
    const data = new FormData();
    data.append("componentName", componentName);
    data.append("file", file);
    axios
      .post("https://httpbin.org/anything", data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    for (var pair of data.entries()) {
      console.log(pair[0] + " - " + pair[1]);
    }
    dispatch(addNewVKProduct(data, token));
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
    }
    reader.onloadend = () => {
      setPreviewImg(reader.result);
      // console.log(reader.result);
    };
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    previewFile(file);
  };

  const formToggle = () => {
    setFormMode(!formMode);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    uploadProduct();

  };

  return (
    <AnimatePresence>
      {formMode === true && (
        <motion.div
          initial={{ scale: 0 }}
          variants={variants}
          animate={{
            scale: 1,
            transition: {
              duration: 0.2,
            },
          }}
          exit={{
            scale: 0,
            transition: {
              duration: 0.2,
            },
          }}
          className={styles.formComponent}
        >
          <form className={styles.formTag} onSubmit={handleFormSubmit}>
            <div className={styles.cancelBtnDiv} onClick={formToggle}>
              <Icon icon="heroicons-solid:x" />
            </div>
            <div className={styles.headingWrapper}>
              <p className={styles.heading1}>Upload your file</p>
              <p className={styles.heading2}>File should be image</p>
            </div>
            <div className={styles.uploadImgWrapper}>
              <label htmlFor="file">
                {previewImg ? (
                  <div className={styles.imgPreviewContainer}>
                    <img src={previewImg} alt="doc" />
                  </div>
                ) : (
                  <div className={styles.uploadContainer}>
                    <Icon icon="bi:folder-fill" className={styles.folderIcon} />
                    <p>Click to choose file</p>
                  </div>
                )}
              </label>
              <input
                type="file"
                id="file"
                className={styles.imgFileInput}
                onChange={handleChange}
              />
            </div>

            <div className={styles.descriptionInputWrapper}>
              <div className={styles.ComponentNameInputWrapper}>
                <div className={styles.labelDiv}>
                  <p className={styles.labelText}>Component Name</p>
                </div>
                <div className={styles.inputDiv}>
                  <input
                    required
                    name="componentName"
                    className={styles.inputField}
                    type="text"
                    minLength="1"
                    placeholder="Component Name"
                    value={productDetails.componentName}
                    onChange={(e) =>
                      setProductDetails({
                        ...productDetails,
                        componentName: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <div className={styles.buttonWrapper}>
              <motion.button whileTap={{ scale: 0.95 }} type="submit">
                <Icon
                  icon="eva:arrow-circle-up-outline"
                  color="white"
                  className={styles.btnIcon}
                />
                <p>Upload</p>
              </motion.button>
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VKProductForm;
