import React, { useEffect } from "react";
import { Route, NavLink, useHistory, Switch } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { Icon } from "@iconify/react";
import styles from "../../css/productSection/productsSection.module.css";

import { motion, useAnimation } from "framer-motion";
const boxVariants = {
  hidden: {
    x: 1000,
    opacity: 0,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      staggerChildren: 0.2,
      duration: 1,
      delayChildren: 0.3,
      ease: [0.3, 0.1, 0.3, 1],
    },
  },
};
const textHeadingVariants = {
  hidden: { translateX: 80, opacity: 0 },
  visible: {
    translateX: 0,
    opacity: [0, 0.5, 1],
    transition: {
      duration: 0.8,
      ease: [0.3, 0.1, 0.3, 1],
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
    opacity: [0, 1],
    transition: {
      duration: 0.5,
      ease: [0.3, 0.1, 0.3, 1],
    },
  },
};
const OurProductsCard = ({ ourProductSectionRef }) => {
  const { ref, inView } = useInView({
    // triggerOnce: true,
    threshold: 0.3,
  });

  const controls = useAnimation();

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
      from: "home",
      link: "explore",
    };

    sessionStorage.setItem("clickDetails", JSON.stringify(clickDetails));
  };

  return (
    <div ref={ref} className={styles.ourProductsCardWrapper}>
      <motion.div
        variants={boxVariants}
        initial="hidden"
        animate={controls}
        className={styles.ourProductsContainer}
        ref={ourProductSectionRef}
      >
        <div className={styles.titleDivPrimary}>
          <motion.div
            variants={lineHeadingVariants}
            // animate={controls}
            className={styles.titleLine}
          ></motion.div>
          <motion.p
            variants={textHeadingVariants}
            className={styles.primaryTitleText}
          >
            OUR PRODUCTS
          </motion.p>
        </div>
        <div className={styles.titleDivSecondary}>
          <motion.p
            variants={textVariants}
            className={styles.secondaryTitleText}
          >
            VISWAKARMA ENGINEERING
          </motion.p>
        </div>
        <div className={styles.linkDiv} onClick={exploreLinkClicked}>
          <motion.p variants={textVariants} className={styles.linkText}>
            <NavLink
              className={`${styles.navLink}`}
              to="/productList/vishwakarma"
            >
              EXPLORE
            </NavLink>
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
        <div className={styles.titleDivSecondary}>
          <motion.p
            variants={textVariants}
            className={styles.secondaryTitleText}
          >
            SHREE KR ENGINEERING
          </motion.p>
        </div>
        <div className={styles.linkDiv} onClick={exploreLinkClicked}>
          <motion.p variants={textVariants} className={styles.linkText}>
            <NavLink className={`${styles.navLink}`} to="/productList/KR">
              EXPLORE
            </NavLink>
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
    </div>
  );
};

export default OurProductsCard;
