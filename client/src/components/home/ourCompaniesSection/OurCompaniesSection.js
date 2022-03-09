import React, { useEffect } from "react";
import { Route, NavLink, useHistory, Switch } from "react-router-dom";

import styles from "../../../css/ourCompaniesSection/ourCompanies.module.css";
import { useInView } from "react-intersection-observer";
import ourCompaniesBg from "../../../img/ourCompaniesBg3.jpg";
import { Icon } from "@iconify/react";

import { motion, useAnimation } from "framer-motion";
import PrimaryTitle from "./PrimaryTitle";
import SecondaryTitle from "./SecondaryTitle";
const OurCompaniesSection = ({ ourCompaniesSectionRef }) => {
  const imgVariants = {
    hidden: { scale: 0.5 },
    visible: {
      scale: 1,
      transition: {
        staggerChildren: 0.5,
        delayChildren: 0.5,
        duration: 1,
        delay: 0.1,
        // ease: [0.6, 0.05, -0.01, 0.9],
      },
    },
  };

  const controls = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: true,
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
    <div className={styles.ourCompaniesWrapper} ref={ourCompaniesSectionRef}>
      <motion.div
        variants={imgVariants}
        initial="hidden"
        animate={controls}
        className={styles.imageWrapper}
        ref={ref}
      >
        <img className={styles.imageElement} src={ourCompaniesBg} />
      </motion.div>

      <div className={styles.contentWrapper}>
        <PrimaryTitle />

        <SecondaryTitle
          text={"VISHVAKARMA ENGINEERING"}
          classNameContainer={styles.vishvakarmaTextWrapper}
          className1={styles.secondaryTitleText1}
          className2={styles.linkText1}
          arrowColor={"black"}
        />
        <SecondaryTitle
          text={"SHREE KR ENGINEERING"}
          classNameContainer={styles.krTextWrapper}
          className1={styles.secondaryTitleText2}
          className2={styles.linkText2}
          arrowColor={"white"}
        />
      </div>
    </div>
  );
};

export default OurCompaniesSection;
