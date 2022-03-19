import React, { useState, useEffect } from "react";
import {
  Route,
  NavLink,
  useHistory,
  Switch,
  useLocation,
  Link,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/authActions";

import moment from "moment";
import { Icon } from "@iconify/react";
import { sendMail } from "../../actions/userAction";
import { motion, AnimatePresence } from "framer-motion";
import DropDownMenu from "../appLayout/DropDownMenu";
import BackBtn from "../buttons/BackBtn";
import styles from "../../css/contactPage/sendEnquiryComponent.module.css";
// import styles from "../../css/auth/signInPageNew.module.css";
import DropDownToggleBtn from "../appLayout/DropDownToggleBtn";
const ContactPage = () => {
  const dropDownShow = useSelector(
    (state) => state.auxillaryReducer.dropDownShow
  );
  const message = useSelector((state) => state.authResponseHandler);

  const enquiryResponse = useSelector(
    (state) => state.auxillaryReducer.enquiryResponse
  );

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    enquiry: "",
  });
  const initialState = {
    email: "",
    password: "",
  };
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  const backBtnClick = () => {
    history.goBack();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const { email, password } = formData;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(formData);
      await dispatch(login(formData, history));
    } catch (error) {
      console.log(error);
    }
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(sendMail(formData));
    // console.log(formData);
  };
  const linkClicked = (val) => {
    // if (val === 1) {
    //   history.goBack();
    // }
    // // _________________________________________________________________
    // else if (val === 2) {
    //   const clickedDetailsJSON = JSON.parse(
    //     sessionStorage.getItem("clickDetails")
    //   );
    //   if (
    //     clickedDetailsJSON &&
    //     clickedDetailsJSON.link === "explore" &&
    //     clickedDetailsJSON.from === "contactUsSection"
    //   ) {
    //     const clickDetails = {
    //       from: "contactPage",
    //       link: "back",
    //       to: "contactUsSection",
    //     };
    //     sessionStorage.setItem("clickDetails", JSON.stringify(clickDetails));
    //   } else if (
    //     clickedDetailsJSON &&
    //     clickedDetailsJSON.link === "sendEnquiry" &&
    //     clickedDetailsJSON.from === "footerUi"
    //   ) {
    //     const clickDetails = {
    //       from: "contactPage",
    //       link: "back",
    //       to: "footerUi",
    //     };
    //     sessionStorage.setItem("clickDetails", JSON.stringify(clickDetails));
    //   }
    //   history.push("/");
    // }
    // // ____________________________________________________________________
    // else if (val === 3) {
    //   history.push("/productList/vishvakarma");
    // }
    // // ____________________________________________________________________
    // else if (val === 4) {
    //   history.push("/company/contactUs");
    // }
  };

  return (
    // <>
    <div className={styles.formComponent}>
      <div className={styles.headerWrapper}>
        <div
          className={styles.backBtnContainer}
          onClick={() => history.goBack()}
        >
          <Icon
            icon="fluent:arrow-sort-up-16-filled"
            rotate={-1}
            className={styles.backIcon}
          />
          <div className={styles.backBtnDiv}>
            <p className={styles.backLinkText}>Back</p>
          </div>
        </div>
      </div>
      <div className={styles.formWrapper}>
        <div className={styles.formContainer}>
          <form className={styles.formTag} onSubmit={handleSubmit}>
            <div className={styles.headingWrapper}>
              <p className={styles.HeadingText}>Sign In</p>
            </div>
            <div className={styles.messageWrapper}>
              {message.error && message.at === "login" ? (
                <div className={styles.errorDiv}>
                  <Icon icon="carbon:warning" className={styles.icon} />
                  <p>{message.error}</p>
                </div>
              ) : (
                message.success &&
                (message.at === "login" ||
                  message.at === "resetPassSuccess") && (
                  <div className={styles.successDiv}>
                    <Icon
                      icon="akar-icons:circle-check"
                      className={styles.icon}
                    />
                    <p>{message.success}</p>
                  </div>
                )
              )}
            </div>

            <div className={styles.emailWrapper}>
              <div className={styles.labelDiv}>
                <p className={styles.labelText}>Email Address</p>
              </div>
              <div className={styles.inputDiv}>
                <input
                  className={styles.inputField}
                  required
                  placeholder="email address"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.passwordWrapper}>
              <div className={styles.labelDiv}>
                <p className={styles.labelText}>Password</p>
              </div>
              <div className={styles.inputDiv}>
                <input
                  className={styles.inputField}
                  required
                  placeholder="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  type="password"
                />
              </div>
            </div>
            <div className={styles.forgotPasswordWrapper}>
              <Link to="/company/auth/forgotPassword" className={styles.fPlink}>
                forgot password?
              </Link>
            </div>

            <div className={styles.buttonWrapper}>
              <motion.button
                whileTap={{ scale: 0.95 }}
                type="submit"
              ></motion.button>
            </div>
            <div className={styles.BottomLinkWrapper}>
              <p>
                Don't have an account?
                <Link to="/company/auth/register" className={styles.link}>
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
