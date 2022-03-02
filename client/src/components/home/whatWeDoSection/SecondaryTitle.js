import React, { useEffect } from "react";
import styles from "../../../css/whatWeDoSection/whatWeDoSection.module.css";

import { useInView } from "react-intersection-observer";

import { motion, useAnimation } from "framer-motion";

const textVariants = {
  hidden: { translateY: 40, opacity: 0 },
  visible: {
    translateY: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      delay: 0.3,
      ease: [0.3, 0.1, 0.3, 1],
    },
  },
};

const SecondaryTitle = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
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
        variants={textVariants}
        initial="hidden"
        animate={controls}
        className={styles.secondaryTitleText}
      >
        INTEGRATING SCIENCE & ENGINEERING WITH SKILLS
      </motion.p>
    </div>
  );
};

export default SecondaryTitle;
