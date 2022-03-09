import React, { useEffect } from "react";
import { Route, NavLink, useHistory, Switch } from "react-router-dom";
import styles from "../../../css/ourCompaniesSection/ourCompanies.module.css";
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
      ease: [0.6, 0.05, -0.01, 0.9],
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
const SecondaryTitle = ({
  text,
  classNameContainer,
  className1,
  className2,
  arrowColor,
}) => {
  const history = useHistory();

  const controls = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "300px",
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
    if (text === "VISHVAKARMA ENGINEERING") {
      history.push("/company/vishwakarma");
    } else if (text === "SHREE KR ENGINEERING") {
      history.push("/company/KR");
    }

    const clickDetails = {
      from: "ourCompaniesSection",
    };
    sessionStorage.setItem("clickDetails", JSON.stringify(clickDetails));
  };
  return (
    <motion.div
      variants={boxVariants}
      initial="hidden"
      animate={controls}
      ref={ref}
      className={classNameContainer}
    >
      <div className={styles.titleDivSecondary}>
        <motion.p variants={textVariants} className={className1}>
          {text}
        </motion.p>
      </div>
      <div className={styles.linkDiv} onClick={() => exploreLinkClicked()}>
        <motion.p variants={textVariants} className={className2}>
          EXPLORE
        </motion.p>
        <motion.div variants={arrowVariants} className={styles.iconDiv}>
          <Icon
            icon="bi:arrow-down-left"
            rotate={-1}
            color={arrowColor}
            className={styles.arrowIcon}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SecondaryTitle;
