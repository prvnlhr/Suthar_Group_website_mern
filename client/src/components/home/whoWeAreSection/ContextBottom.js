import React, { useEffect } from "react";
import styles from "../../../css/whoWeAreSection/whoWeAreSection.module.css";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";

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

const ContextBottom = () => {
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
    <div ref={ref} className={styles.contextDiv}>
      <motion.p
        initial="hidden"
        animate={controls}
        variants={textVariants}
        className={styles.contextText}
      >
        Suthar Group of companies thrive to work upon industry standards to
        provide best quality products with perfection one can trust on.
      </motion.p>
    </div>
  );
};

export default ContextBottom;
