import React, { useEffect, useState } from "react";
import styles from "../../../css/contactUsSection/contactUsSection.module.css";
import contactUsBg from "../../../img/contatctUsBg3.jpg";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const imgVariants = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.5,
      delayChildren: 0.5,
      duration: 0.8,
      delay: 0.2,
      ease: [0.17, 0.67, 0.83, 0.67],
    },
  },
};
const ContactUsBgImg = () => {

  const controls = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
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
      variants={imgVariants}
      initial="hidden"
      animate={controls}
      ref={ref}
      className={styles.imageWrapper}
    >
      <div className={styles.overlayDiv}></div>
      <img className={styles.bgImage} src={contactUsBg} />
    </motion.div>
  );
};

export default ContactUsBgImg;
