import React, { useEffect } from "react";
import styles from "../../../css/statisticsSection/statisticsSection.module.css";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
const boxVariants = {
  hidden: {
    opacity: 1,
  },
  visible: {
    opacity: 1,
    transition: {
      // delay: 0.8,
      staggerChildren: 0.2,
      delayChildren: 0.3,
      duration: 0.6,
      ease: [0.3, 0.1, 0.3, 1],
    },
  },
};
const textVariants = {
  hidden: { translateX: 40, opacity: 0 },

  visible: {
    translateX: 0,
    opacity: [0, 0.5, 1],
    transition: {
      delay: 0.3,
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
      delay: 0.8,
      duration: 0.8,
    },
  },
};
const lineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      // delay: 0.2,
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
    <motion.div
      initial="hidden"
      animate={controls}
      className={styles.titleDivPrimary}
      ref={ref}
    >
      <motion.div
        variants={lineVariants}
        className={styles.titleLine}
      ></motion.div>

      <motion.p variants={textVariants} className={styles.primaryTitleText}>
        SUTHAR GROUP IN NUMBERS
      </motion.p>
    </motion.div>
  );
};

export default PrimaryTitle;
