import React, { useEffect } from "react";
import styles from "../../css/companyPage/aboutUsSection.module.css";

import { useInView } from "react-intersection-observer";

import { motion, useAnimation } from "framer-motion";

const boxVariants = {
  hidden: {
    x: -1000,
    opacity: 0,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      staggerChildren: 0.5,
      duration: 1,
      ease: [0.3, 0.1, 0.3, 1],
    },
  },
};
const textVariants = {
  hidden: { translateX: 80, opacity: 0 },
  visible: {
    translateX: 0,
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.8,
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
    },
  },
};
const PrimaryTitle = ({ title }) => {
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
    <motion.div ref={ref} className={styles.titleDivPrimary}>
      <motion.div
        variants={lineVariants}
        initial="hidden"
        animate={controls}
        className={styles.titleLine}
      ></motion.div>

      <motion.p variants={textVariants} className={styles.primaryTitleText}>
        {title}
      </motion.p>
    </motion.div>
  );
};

export default PrimaryTitle;
