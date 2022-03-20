import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewKRProduct } from "../../../actions/krActions/krProductActions";
import styles from "../../../css/krStyles/krProductForm.module.css";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const variants = {
  open: {
    opacity: 1,
    scale: 1,
  },
  closed: {
    scale: 0,
  },
};
const KRProductForm = ({ formMode, setFormMode }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.token);

  const [productDetails, setProductDetails] = useState({
    rib_name: "",
    order_quantity: "",
    rib_diameter: "",
    rib_price: "",
  });
  const [file, setFile] = useState();
  const [previewImg, setPreviewImg] = useState("");
  const { rib_name, rib_diameter, rib_price, order_quantity } = productDetails;
  const uploadProduct = () => {
    formToggle();
    const data = new FormData();
    data.append("rib_name", rib_name);
    data.append("order_quantity", order_quantity);
    data.append("rib_diameter", rib_diameter);
    data.append("rib_price", rib_price);

    data.append("file", file);
    axios
      .post("https://httpbin.org/anything", data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    for (var pair of data.entries()) {
      console.log(pair[0] + " - " + pair[1]);
    }
    dispatch(addNewKRProduct(data, token));
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
              <div className={styles.ribNameInputWrapper}>
                <div className={styles.labelDiv}>
                  <p className={styles.labelText}>Part Name</p>
                </div>
                <div className={styles.inputDiv}>
                  <input
                    required
                    name="rib_name"
                    className={styles.inputField}
                    type="text"
                    minLength="1"
                    // maxLength="16"
                    placeholder="Part Name"
                    value={productDetails.rib_name}
                    onChange={(e) =>
                      setProductDetails({
                        ...productDetails,
                        rib_name: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className={styles.ribQuantInputWrapper}>
                <div className={styles.labelDiv}>
                  <p className={styles.labelText}>Minimum Order Quantity</p>
                </div>
                <div className={styles.inputDiv}>
                  <input
                    required
                    name="order_quantity"
                    className={styles.inputField}
                    type="text"
                    minLength="1"
                    // maxLength="16"
                    placeholder="Dozens"
                    value={productDetails.order_quantity}
                    onChange={(e) =>
                      setProductDetails({
                        ...productDetails,
                        order_quantity: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className={styles.ribDiaInputWrapper}>
                <div className={styles.labelDiv}>
                  <p className={styles.labelText}>Rib Diameter</p>
                </div>
                <div className={styles.inputDiv}>
                  <input
                    required
                    name="rib_diameter"
                    className={styles.inputField}
                    type="text"
                    minLength="1"
                    // maxLength="16"
                    placeholder="inches"
                    value={productDetails.rib_diameter}
                    onChange={(e) =>
                      setProductDetails({
                        ...productDetails,
                        rib_diameter: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className={styles.ribPriceInputWrapper}>
                <div className={styles.labelDiv}>
                  <p className={styles.labelText}>Price</p>
                </div>
                <div className={styles.inputDiv}>
                  <input
                    required
                    name="rib_price"
                    className={styles.inputField}
                    type="text"
                    minLength="1"
                    // maxLength="16"
                    placeholder="Rupees / Dozen"
                    value={productDetails.rib_price}
                    onChange={(e) =>
                      setProductDetails({
                        ...productDetails,
                        rib_price: e.target.value,
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

export default KRProductForm;
