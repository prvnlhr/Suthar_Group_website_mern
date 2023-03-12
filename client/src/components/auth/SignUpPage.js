import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../../actions/authActions";

import styles from "../../css/auth/signUpPageNew.module.css";
import { CircleSpinner } from "react-spinners-kit";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
// import logo from "../../img/ecryptLogo.svg";

const initialState = {
  owner: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialState);
  // const isLoading = useSelector((state) => state.loading.isLoading);
  const loadState = useSelector((state) => state.loadingReducer);

  const message = useSelector((state) => state.authResponseHandler);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value, err: "", success: "" });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(register(formData));
  };
  const { owner, email, password, confirmPassword } = formData;
  const { place, isLoading } = loadState;

  return (
    <div className={styles.formComponent}>
      <div className={styles.headerWrapper}>
        <div
          className={styles.backBtnContainer}
          onClick={() => navigate(-1)}
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
              <p className={styles.HeadingText}>Sign Up</p>
            </div>
            <div className={styles.messageWrapper}>
              {message.error && message.at === "register" ? (
                <div className={styles.errorDiv}>
                  <Icon icon="carbon:warning" className={styles.icon} />

                  <p>{message.error}</p>
                </div>
              ) : (
                message.success &&
                message.at === "register" && (
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
            <div className={styles.companyNameWrapper}>
              <div className={styles.labelDiv}>
                <p className={styles.labelText}>Owner name</p>
              </div>
              <div className={styles.inputDiv}>
                <input
                  className={styles.inputField}
                  required
                  placeholder="owner name"
                  name="owner"
                  value={owner}
                  onChange={handleChange}
                />
              </div>
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
            <div className={styles.password1Wrapper}>
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
            <div className={styles.password2Wrapper}>
              <div className={styles.labelDiv}>
                <p className={styles.labelText}>Confirm Password</p>
              </div>
              <div className={styles.inputDiv}>
                <input
                  className={styles.inputField}
                  required
                  placeholder="confirm password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleChange}
                  type="password"
                />
              </div>
            </div>
            <div className={styles.buttonWrapper}>
              <motion.button whileTap={{ scale: 0.95 }} type="submit">
                {place === "signUp" && isLoading === true ? (
                  <CircleSpinner size={15} color="white" loading={true} />
                ) : (
                  <p className={styles.btnText}>Sign Up</p>
                )}
              </motion.button>
            </div>
            <div className={styles.BottomLinkWrapper}>
              <p to="/company/auth/login">
                Already have an account?
                <Link to="/company/auth/login" className={styles.link}>
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default SignUpPage;
