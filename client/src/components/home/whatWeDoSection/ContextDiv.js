import React, { useEffect } from "react";
import styles from "../../../css/whatWeDoSection/whatWeDoSection.module.css";
import { useInView } from "react-intersection-observer";

import { motion, useAnimation } from "framer-motion";
const boxVariants = {
  hidden: {
    x: 0,
    opacity: 0,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      staggerChildren: 0.5,
      duration: 1,
      delayChildren: 0.5,
      // ease: [0.6, 0.05, -0.01, 0.9],
    },
  },
};
const textVariants = {
  hidden: { translateY: 40, opacity: 0 },
  visible: {
    translateY: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.3, 0.1, 0.3, 1],
    },
  },
};

const ContextDiv = ({ context1, context2 }) => {
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
    <motion.div
      ref={ref}
      variants={boxVariants}
      initial="hidden"
      animate={controls}
      className={styles.contextDiv}
    >
      {/* <motion.p variants={textVariants} className={styles.contextText}>
        {/* We are pioneer in manufacturing complex mechanical parts using highly
        advance machinery and technologies. */}
        {context1}
      </motion.p>
      <motion.p variants={textVariants} className={styles.contextText}>
        {/* Our work includes manufacturing Dies , Umbrella Ribs , ATM machine parts
        , Printer parts. We accept all types of CNC, Milling, Wire-cut, Sheet
        metal job work */}
        {context2}
      </motion.p> */}
    </motion.div>
  );
};

export default ContextDiv;
