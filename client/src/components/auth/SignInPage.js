import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../actions/authActions";
import styles from "../../css/auth/signInPageNew.module.css";
import { CircleSpinner } from "react-spinners-kit";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
// import logo from "../../img/ecryptLogo.svg";

const initialState = {
  email: "",
  password: "",
};

const SignInPage = () => {
  const loadState = useSelector((state) => state.loadingReducer);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const isLoading = useSelector((state) => state.loading.isLoading);
  const message = useSelector((state) => state.authResponseHandler);

  // const { isLogged } = auth;
  const { place, isLoading } = loadState;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // useEffect(() => {
  //   console.log(place, isLoading);
  // }, [place, isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(formData);
      await dispatch(login(formData, navigate));
    } catch (error) {
      console.log(error);
    }
  };
  const { email, password } = formData;

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
              <motion.button whileTap={{ scale: 0.95 }} type="submit">
                {place === "login" && isLoading === true ? (
                  <CircleSpinner size={15} color="white" loading={true} />
                ) : (
                  <p className={styles.btnText}>Sign In</p>
                )}
              </motion.button>
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
export default SignInPage;
