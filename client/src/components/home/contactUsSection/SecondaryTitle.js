import React, { useEffect } from "react";
import { Route, NavLink, useNavigate, Switch } from "react-router-dom";
import styles from "../../../css/contactUsSection/contactUsSection.module.css";

import { useInView } from "react-intersection-observer";
import ourCompaniesBg from "../../../img/ourCompaniesBg2.jpg";
import { Icon } from "@iconify/react";
import { motion, useAnimation } from "framer-motion";
const boxVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
      duration: 1,
      delayChildren: 0.5,
      duration: 0.6,
      delay: 0.3,
      ease: [0.17, 0.67, 0.83, 0.67],
    },
  },
};
const textVariants = {
  hidden: { translateY: 30, opacity: 0 },
  visible: {
    translateY: 0,
    opacity: [0, 0.5, 1],
    transition: {
      duration: 0.5,
      ease: [0.3, 0.1, 0.3, 1],
    },
  },
};
const lineHeadingVariants = {
  hidden: { translateX: -200 },
  visible: {
    translateX: 0,
    transition: {
      duration: 0.8,
      ease: [0.3, 0.1, 0.3, 1],
    },
  },
};

const arrowVariants = {
  hidden: { translateX: -20, opacity: 0 },
  visible: {
    translateX: 0,
    opacity: [0, 0.5, 1],
    transition: {
      duration: 0.5,
      ease: [0.3, 0.1, 0.3, 1],
    },
  },
};
const SecondaryTitle = ({ }) => {
  const navigate = useNavigate();

  const controls = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
    if (!inView) {
      controls.start("hidden");
    }
  }, [controls, inView]);
  const exploreLinkClicked = () => {
    const clickDetails = {
      from: "contactUsSection",
    };

    sessionStorage.setItem("clickDetails", JSON.stringify(clickDetails));

    navigate("/company/contact");
  };
  return (
    <motion.div
      variants={boxVariants}
      initial="hidden"
      animate={controls}
      ref={ref}
      className={styles.contentWrapper}
    >
      <div className={styles.titleDivSecondary}>
        <motion.p variants={textVariants} className={styles.secondaryTitleText}>
          START YOUR PROJECT
        </motion.p>
      </div>
      <div className={styles.titleDivTertiary}>
        <motion.p variants={textVariants} className={styles.tertiaryTitleText}>
          Contact us and we will reach you as soon as possible. Send feedback or
          enquiry about our products
        </motion.p>
      </div>
      <div className={styles.linkDiv} onClick={() => exploreLinkClicked()}>
        <motion.p variants={textVariants} className={styles.linkText}>
          CONTACT US
        </motion.p>
        <motion.div variants={arrowVariants} className={styles.iconDiv}>
          <Icon
            icon="bi:arrow-down-left"
            rotate={-1}
            color="#040259"
            className={styles.arrowIcon}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SecondaryTitle;
