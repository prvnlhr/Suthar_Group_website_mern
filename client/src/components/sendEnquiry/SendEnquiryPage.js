import React, { useState, useEffect, useRef } from "react";
import {
  Route,
  NavLink,
  useNavigate,
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
import DropDownToggleBtn from "../appLayout/DropDownToggleBtn";
import styles from "../../css/contactPage/sendEnquiryComponent.module.css";

const SendEnquiryPage = () => {
  const formRef = useRef();
  const divRef = useRef();

  useEffect(() => {
    const formHeight = formRef.current?.clientHeight;
    divRef.current.style.height = formHeight + "px";
  }, [formRef.current, divRef.current]);

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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const backBtnClick = () => {
    navigate(-1)
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(sendMail(formData));
  };

  const linkClicked = (val) => {
    navigate("/");
    // if (val === 1) {
    //   navigate(-1)
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
    //    navigate("/");
    // }
    // // ____________________________________________________________________
    // else if (val === 3) {
    //    navigate("/productList/vishvakarma");
    // }
    // // ____________________________________________________________________
    // else if (val === 4) {
    //    navigate("/company/contactUs");
    // }
  };
  const { firstName, lastName, company, email, enquiry } = formData;
  return (
    <div className={styles.sendEnquiryComponent}>
      <AnimatePresence>
        {dropDownShow === true && <DropDownMenu />}
      </AnimatePresence>
      <div className={styles.pageHeaderWrapper}>
        <div className={styles.companyLogoWrapper}>
          <p className={styles.companyNameText}>SUTHAR GROUP </p>
        </div>
        <div className={styles.quickLinksWrapperDesktop}>
          <div className={styles.linksDiv} onClick={() => linkClicked(1)}>
            <p className={styles.linkText}>HOME</p>
          </div>
        </div>

        <div className={styles.quickLinksWrapperMobile}>
          <div className={styles.linksDiv} onClick={() => linkClicked(1)}>
            <p className={styles.linkText}>HOME</p>
          </div>
        </div>
        <DropDownToggleBtn />
      </div>
      <div className={styles.backbtnWrapper}>
        <div className={styles.backBtnDiv} onClick={backBtnClick}>
          <BackBtn />
        </div>
      </div>
      <div className={styles.formHeaderWrapper}>
        <div className={styles.headingDiv}>
          <p className={styles.headingText}>Contact Us !</p>
        </div>
      </div>
      <div className={styles.formBodyWrapper} ref={formRef}>
        <div className={styles.formContainer} ref={divRef}>
          <form className={styles.formTag} onSubmit={handleFormSubmit}>
            <div className={styles.messageWrapper}>
              <p className={styles.messageText}>{enquiryResponse}.</p>
            </div>
            <div className={styles.firstNameWrapper}>
              <div className={styles.labelDiv}>
                <p className={styles.labelText}>FIRST NAME</p>
              </div>
              <div className={styles.inputDiv}>
                <input
                  className={styles.inputField}
                  required
                  name="firstName"
                  value={firstName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.lastNameWrapper}>
              <div className={styles.labelDiv}>
                <p className={styles.labelText}>LAST NAME</p>
              </div>
              <div className={styles.inputDiv}>
                <input
                  className={styles.inputField}
                  required
                  name="lastName"
                  value={lastName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.companyNameWrapper}>
              <div className={styles.labelDiv}>
                <p className={styles.labelText}>COMAPANY</p>
              </div>
              <div className={styles.inputDiv}>
                <input
                  className={styles.inputField}
                  required
                  name="company"
                  value={company}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.emailWrapper}>
              <div className={styles.labelDiv}>
                <p className={styles.labelText}>EMAIL</p>
              </div>
              <div className={styles.inputDiv}>
                <input
                  className={styles.inputField}
                  required
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.enquiryWrapper}>
              <div className={styles.enquiryLabelDiv}></div>
              <div className={styles.enquiryInputDiv}>
                <textarea
                  className={styles.enquiryInputField}
                  required
                  name="enquiry"
                  value={enquiry}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.buttonWrapper}>
              <button className={styles.submitBtn}>
                <p className={styles.submitBtnText}>SUBMIT</p>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SendEnquiryPage;
