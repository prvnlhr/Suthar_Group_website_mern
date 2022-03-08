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

const ProjectStatsAbout = () => {
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
        Our team has completed more than 3,000 projects to date and we continue
        to increase our experience
      </motion.p>
    </div>
  );
};

export default ProjectStatsAbout;
