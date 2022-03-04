import React, { useEffect } from "react";
import styles from "../../../css/whoWeAreSection/whoWeAreSection.module.css";

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
      staggerChildren: 0.5,
      duration: 1,
      delayChildren: 0.5,
      ease: [0.3, 0.1, 0.3, 1],
    },
  },
};
const textVariants = {
  hidden: { translateY: 40, opacity: 0 },
  visible: {
    translateY: 0,
    opacity: 1,
    transition: {
      // delay: 0.5,
      duration: 0.8,
      ease: [0.3, 0.1, 0.3, 1],
    },
  },
};
const lineVariants = {
  hidden: { translateX: -1000 },
  visible: {
    translateX: 0,
    transition: {
      delay: 0.8,
      duration: 0.8,
    },
  },
};
const SecondaryTitle = () => {
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
    <div ref={ref} className={styles.titleDivSecondary}>
      <motion.p
        initial="hidden"
        animate={controls}
        variants={textVariants}
        className={styles.secondaryTitleText}
      >
        WE ARE LEADERS IN MANUFACTURING AND ENGINEERING
      </motion.p>
    </div>
  );
};

export default SecondaryTitle;
