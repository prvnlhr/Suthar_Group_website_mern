import React, { useEffect } from "react";
import styles from "../../../css/ourCompaniesSection/ourCompanies.module.css";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
const boxVariants = {
  hidden: {
    opacity: 1,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
      duration: 1,
      delayChildren: 0.5,
      ease: [0.17, 0.67, 0.83, 0.67],
    },
  },
};
const textVariants = {
  hidden: { translateY: -60, opacity: 0 },
  visible: {
    translateY: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.3, 0.1, 0.3, 1],
    },
  },
};

const line1Variants = {
  hidden: { opacity: 0, translateX: -200 },
  visible: {
    opacity: [0.2, 0.5, 1],
    translateX: 0,
    transition: {
      delay: 0.3,
      duration: 0.8,
      ease: [0.3, 0.1, 0.3, 1],
    },
  },
};
const line2Variants = {
  hidden: { opacity: 0, translateX: 200 },
  visible: {
    opacity: [0.2, 0.5, 1],

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
      className={styles.primaryTitleDiv}
    >
      <motion.div
        variants={line1Variants}
        className={styles.titleLine}
      ></motion.div>
      <motion.p variants={textVariants} className={styles.primaryTitleText}>
        OUR COMPANIES
      </motion.p>
      <motion.div
        variants={line2Variants}
        className={styles.titleLine}
      ></motion.div>
    </motion.div>
  );
};

export default PrimaryTitle;
