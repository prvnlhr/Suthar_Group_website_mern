import React, { useEffect } from "react";
import styles from "../../../css/contactUsSection/contactUsSection.module.css";

import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
const boxVariants = {
  hidden: {
    // x: -1000,
    opacity: 1,
  },
  visible: {
    opacity: 1,
    // x: 0,
    transition: {
      // delay: 0.5,
      //   staggerChildren: 0.5,
      duration: 1,
      //   delayChildren: 0.5,
      // ease: [0.6, 0.05, -0.01, 0.9],
    },
  },
};
const textVariants = {
  hidden: { translateX: 40, opacity: 0 },
  visible: {
    translateX: 0,
    opacity: 1,
    transition: {
      delay: 0.3,

      duration: 0.8,
      ease: [0.3, 0.1, 0.3, 1],
    },
  },
};
const lineVariants = {
  hidden: { opacity: 0, translateX: -200 },
  visible: {
    opacity: [0, 0.3, 0.5, 1],
    translateX: 0,
    transition: {
      delay: 0.3,
      duration: 0.8,
      ease: [0.3, 0.1, 0.3, 1],
    },
  },
};
const PrimaryTitle = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
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
  return (
    <motion.div
      variants={boxVariants}
      initial="hidden"
      animate={controls}
      ref={ref}
      className={styles.titleDivPrimary}
    >
      <motion.div
        variants={lineVariants}
        className={styles.titleLine}
      ></motion.div>
      <motion.p variants={textVariants} className={styles.primaryTitleText}>
        PARTNER WITH US
      </motion.p>
    </motion.div>
  );
};

export default PrimaryTitle;
