import React, { useEffect, useState } from "react";
import styles from "../../../css/ourServicesSection/ourServicesSection.module.css";
import image1 from "../../../img/ourService1.jpg";
import image2 from "../../../img/ourService2.jpg";
import image3 from "../../../img/ourService3.jpg";
import PrimaryTitle from "./PrimaryTitle";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
const imgVariants = {
  hidden: { opacity: 0, scale: 1.3 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      // staggerChildren: 0.5,
      // delayChildren: 0.5,
      duration: 0.8,
      delay: 0.2,
      //  ease: [0.17, 0.67, 0.83, 0.67],
    },
  },
};
const OurServicesSection = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    // rootMargin: "-300px",
    threshold: 0.4,
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
      initial="hidden"
      animate={controls}
      ref={ref}
      className={styles.ourServicesSectionWrapper}
    >
      <div className={styles.styleDiv}>
        <PrimaryTitle />
      </div>
      <div className={styles.imageWrapper}>
        <div className={styles.imageContainer}>
          <motion.div variants={imgVariants} className={styles.imageDiv}>
            <img className={styles.imageELement} src={image1} />
            <div className={styles.overlayDiv1}>
              <p className={styles.serviceText}>MANUFACTURING</p>
            </div>
          </motion.div>
        </div>
        <div className={styles.imageContainer}>
          <motion.div variants={imgVariants} className={styles.imageDiv}>
            <img className={styles.imageELement} src={image2} />
            <div className={styles.overlayDiv2}>
              <p className={styles.serviceText}>DESIGNING</p>
            </div>
          </motion.div>
        </div>
        <div className={styles.imageContainer}>
          <motion.div variants={imgVariants} className={styles.imageDiv}>
            <img className={styles.imageELement} src={image3} />
            <div className={styles.overlayDiv3}>
              <p className={styles.serviceText}>REPAIRING</p>
            </div>
          </motion.div>
        </div>
        {/* <motion.div variants={imgVariants} className={styles.cardContainer}>

          <img className={styles.imageELement} src={image1} />
          <div className={styles.overlayDiv1}>
            <p className={styles.serviceText}>MANUFACTURING</p>
          </div>
        </motion.div>
        <motion.div variants={imgVariants} className={styles.cardContainer}>
          <img className={styles.imageELement} src={image2} />

          <div className={styles.overlayDiv2}>
            <p className={styles.serviceText}>DESIGNING</p>
          </div>
        </motion.div>
        <motion.div variants={imgVariants} className={styles.cardContainer}>
          <img className={styles.imageELement} src={image3} />

          <div className={styles.overlayDiv3}>
            <p className={styles.serviceText}>REPAIRING</p>
          </div>
        </motion.div> */}
      </div>
    </motion.div>
  );
};

export default OurServicesSection;
