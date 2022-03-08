import React, { useEffect } from "react";
import styles from "../../../css/statisticsSection/statisticsSection.module.css";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
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
const ActiveProjectsComponent = () => {
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
          20+
        </motion.p>
      </motion.div>
      <div className={styles.statsTypeDiv}>
        <motion.p variants={textVariants} className={styles.statsTypeText}>
          Active Projects
        </motion.p>
      </div>
      <motion.div
        variants={lineVariants}
        className={styles.lineBreak}
      ></motion.div>
      <div className={styles.statsABoutDiv}>
        <motion.p variants={textVariants} className={styles.statsAboutText}>
          Our team has completed more than 3,000 projects to date and we
          continue to increase our experience
        </motion.p>
      </div>
    </motion.div>
  );
};

export default ActiveProjectsComponent;
