import React, { useEffect, useState } from "react";
import styles from "../../../css/statisticsSection/statisticsSection.module.css";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";

const boxVariants = {
  hidden: {
    opacity: 1,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};
const textVariants = {
  hidden: { translateY: 40, opacity: 0 },
  visible: {
    translateY: 0,
    opacity: [0, 0.5, 1],
    transition: {
      duration: 0.5,
      ease: [0.3, 0.1, 0.3, 1],
    },
  },
};

const lineVariants = {
  hidden: { translateY: 40, opacity: 0 },
  visible: {
    translateY: 0,
    opacity: [0, 0.5, 1],
    transition: {
      duration: 0.5,
      ease: [0.3, 0.1, 0.3, 1],
    },
  },
};
const YearsComponent = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.8,
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
      ref={ref}
      variants={boxVariants}
      initial="hidden"
      animate={controls}
      className={styles.contextDiv}
    >
      <motion.div className={styles.statsDiv}>
        <motion.p variants={textVariants} className={styles.statsText}>
          40 +
        </motion.p>
      </motion.div>
      <div className={styles.statsTypeDiv}>
        <motion.p variants={textVariants} className={styles.statsTypeText}>
          Years in Business
        </motion.p>
      </div>
      <motion.div
        variants={lineVariants}
        className={styles.lineBreak}
      ></motion.div>
      <div className={styles.statsABoutDiv}>
        <motion.p variants={textVariants} className={styles.statsAboutText}>
          We’ve been delivering exceptional consulting & engineering work for
          over 40 years
        </motion.p>
      </div>
    </motion.div>
  );
};

export default YearsComponent;
