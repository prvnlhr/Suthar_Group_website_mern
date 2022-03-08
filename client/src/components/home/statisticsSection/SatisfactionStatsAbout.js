import React, { useEffect } from "react";
import styles from "../../../css/statisticsSection/statisticsSection.module.css";

import statisticsBg from "../../../img/statisticsBg.jpg";
import { useInView } from "react-intersection-observer";

import { motion, useAnimation } from "framer-motion";
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
const SatisfactionStatsAbout = () => {
  const { ref, inView } = useInView({
    // triggerOnce: true,
    threshold: 0.6,
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
    <div ref={ref} className={styles.statsABoutDiv}>
      <motion.p
        variants={textVariants}
        initial="hidden"
        animate={controls}
        className={styles.statsAboutText}
      >
        We work to industry upon industry standards to bring quality and
        satisfactory outcomes
      </motion.p>
    </div>
  );
};

export default SatisfactionStatsAbout;
