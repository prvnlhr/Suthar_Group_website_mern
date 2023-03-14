import React, { useEffect } from "react";
import styles from "../../../css/companyPage/client.module.css";

import { useInView } from "react-intersection-observer";

import { motion, useAnimation } from "framer-motion";

const textVariants = {
  hidden: { translateX: 80, opacity: 0 },
  visible: {
    translateX: 0,
    opacity: 1,
    transition: {
      delay: 0.3,
      duration: 0.5,
      //  ease: [0.17, 0.67, 0.83, 0.67],
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
    <div ref={ref} className={styles.primaryTitleDiv}>
      <motion.div
        variants={lineVariants}
        initial="hidden"
        animate={controls}
        className={styles.titleLine}
      ></motion.div>
      <motion.p variants={textVariants} className={styles.primaryTitleText}>
        OUR TRUSTED PARTNERS
      </motion.p>
    </div>
  );
};

export default PrimaryTitle;
