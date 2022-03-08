import React, { useEffect } from "react";
import styles from "../../../css/statisticsSection/statisticsSection.module.css";

import statisticsBg from "../../../img/statisticsBg.jpg";
import { useInView } from "react-intersection-observer";

import { motion, useAnimation } from "framer-motion";
const boxVariants = {
  hidden: {
    opacity: 1,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
      duration: 0.6,
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
      delay: 0.5,
      duration: 0.8,
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
const SatisfactionStats = () => {
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
  return (
    <div ref={ref} className={styles.statsDiv}>
      <motion.p
        initial="hidden"
        animate={controls}
        variants={textVariants}
        className={styles.statsText}
      >
        100%
      </motion.p>
    </div>
  );
};

export default SatisfactionStats;
