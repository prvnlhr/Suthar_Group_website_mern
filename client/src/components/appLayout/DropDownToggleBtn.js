import React from "react";
import styles from "../../css/btnStyles/dropDownBtn.module.css";
import { setDropDownShow } from "../../actions/auxillaryActions/auxillaryActions";
import { useDispatch, useSelector } from "react-redux";
import {
  Route,
  NavLink,
   useNavigate,
  Switch,
  useLocation,
} from "react-router-dom";

const DropDownToggleBtn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const dropDownShow = useSelector(
    (state) => state.auxillaryReducer.dropDownShow
  );

  const toggleDropDownMenu = () => {
    if (dropDownShow === true) {
      dispatch(setDropDownShow(false));
    } else if (dropDownShow === false) {
      dispatch(setDropDownShow(true));
    }
  };

  return (
    <div
      className={
        location.pathname === "/"
          ? styles.menuIconWrapper
          : styles.menuIconWrapperRelative
      }
      onClick={toggleDropDownMenu}
    >
      <div
        className={dropDownShow === true ? styles.xLineOne : styles.lineOne}
      ></div>
      <div
        className={dropDownShow === true ? styles.xLineTwo : styles.lineTwo}
      ></div>
    </div>
  );
};

export default DropDownToggleBtn;
