import React, { useEffect } from "react";
import styles from "../../../css/whoWeAreSection/whoWeAreSection.module.css";

import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import PrimaryTitle from "./PrimaryTitle";
import SecondaryTitle from "./SecondaryTitle";
import TertiaryTitle from "./TertiaryTitle";
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

// const ContextMiddle = () => {
//   const { ref, inView } = useInView({
//     triggerOnce: true,
//     threshold: 0.3,
//   });
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
    <div ref={ref} className={styles.contextDiv}>
      <motion.p
        initial="hidden"
        animate={controls}
        variants={textVariants}
        className={styles.contextText}
      >
        With the visionary idea of Mr. Suthar , Shree KR Engineering became the
        second company under Suthar Group which pioneered in making all types of
        umbrella ribs and related services .
      </motion.p>
    </div>
  );
};

export default ContextMiddle;
