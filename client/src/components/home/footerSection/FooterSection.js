import React from "react";
import { Icon } from "@iconify/react";
import moment from "moment";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "../../../css/footerSection/footerSection.module.css";
const FooterSection = ({ aboutUsSectionRef, footerUsSectionRef }) => {
  const navigate = useNavigate();
  const location = useLocation();
  var year = moment().format("YYYY");

  const linkedClicked = (val) => {
    switch (val) {
      case 1:
        const clickDetails1 = {
          from: "footerSection",
        };
        sessionStorage.setItem("clickDetails", JSON.stringify(clickDetails1));
        navigate("/company/contact");
        break;

      case 2:
        aboutUsSectionRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        break;

      case 3:
        const clickDetails2 = {
          from: "footerSection",
        };

        if (location.pathname === "/") {
          sessionStorage.setItem("clickDetails", JSON.stringify(clickDetails2));
          navigate("/company/vishwakarma");
        } else if (
          location.pathname === "/company/KR" ||
          location.pathname === "/company/vishwakarma"
        ) {
          navigate("/productList/vishwakarma");
        }
        break;

      case 4:
        const clickDetails3 = {
          from: "footerSection",
        };
        if (location.pathname === "/") {
          sessionStorage.setItem("clickDetails", JSON.stringify(clickDetails3));
          navigate("/company/KR");
        } else if (
          location.pathname === "/company/KR" ||
          location.pathname === "/company/vishwakarma"
        ) {
          navigate("/productList/KR");
        }

        break;
    }

    // if (val === 1) {
    //   const clickDetails = {
    //     from: "footerUi",
    //     link: "sendEnquiry",
    //     to: "",
    //   };
    //   sessionStorage.setItem("clickDetails", JSON.stringify(clickDetails));

    //    navigate("/company/contact");
    // }
    // // _______________________________________________________
    // else if (val === 2) {
    //   aboutUsSectionRef.current.scrollIntoView({
    //     behavior: "smooth",
    //     block: "center",
    //   });
    // }
    // // _______________________________________________________
    // else if (val === 3) {
    //    navigate("productList/vishwakarma");
    // }
    // // _______________________________________________________
    // else if (val === 4) {
    //    navigate("/productList/KR/");
    // }
    // _______________________________________________________
  };

  return (
    <div className={styles.footerSectionWrapper}>
      <div className={styles.linksSuperWrapper}>
        <div className={styles.linksWrapper}>
          <div className={styles.linksHeaderDiv}>
            <p className={styles.headerText}>Company</p>
          </div>
          <div className={styles.linksContainer}>
            <div
              className={styles.linksDiv}
              onClick={() => {
                linkedClicked(1);
              }}
            >
              <p className={styles.linksText}>Send Enquiry</p>
            </div>
            <div
              className={styles.linksDiv}
              onClick={() => {
                linkedClicked(2);
              }}
            >
              <p className={styles.linksText}>About us</p>
            </div>
          </div>
        </div>
        <div className={styles.linksWrapper}>
          <div className={styles.linksHeaderDiv}>
            {location.pathname === "/" ? (
              <p className={styles.headerText}>OUR COMPANIES</p>
            ) : (
              (location.pathname === "/company/vishwakarma" ||
                location.pathname === "/company/KR") && (
                <p className={styles.headerText}>OUR PRODUCTS</p>
              )
            )}
          </div>
          <div className={styles.linksContainer}>
            <div
              className={styles.linksDiv}
              onClick={() => {
                linkedClicked(3);
              }}
            >
              <p className={styles.linksText}>Vishvakarma Engineering</p>
            </div>
            <div
              className={styles.linksDiv}
              onClick={() => {
                linkedClicked(4);
              }}
            >
              <p className={styles.linksText}>Shree KR Engineering</p>
            </div>
          </div>
        </div>
        <div className={styles.linksWrapper}>
          <div className={styles.linksHeaderDiv}>
            <p className={styles.headerText}>ADDRESS</p>
          </div>
          <div className={styles.linksContainer}>
            <div className={styles.addressDiv}>
              <p className={styles.addressText}>
                A36/2, Ranapratap Marg, Industrial Estate, FALNA - 306116 ,
                Rajasthan India .
              </p>
            </div>
          </div>
        </div>
        <div className={styles.linksWrapper}>
          <div className={styles.linksHeaderDiv}>
            <p className={styles.headerText}>FOLLOW US</p>
          </div>
          <div className={styles.iconsContainer} ref={footerUsSectionRef}>
            <div className={styles.iconsDiv}>
              <Icon
                icon="akar-icons:twitter-fill"
                className={styles.followUsIcons}
              />
            </div>
            <div className={styles.iconsDiv}>
              <Icon
                icon="akar-icons:facebook-fill"
                className={styles.followUsIcons}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.endDiv}>
        <p className={styles.endDivText}>
          Copyright {year} , All Rights Reserved
        </p>
        <Icon icon="twemoji:flag-for-flag-india" />
      </div>
    </div>
  );
};

export default FooterSection;
