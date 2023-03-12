import React, { useEffect } from "react";

import styles from "../../../css/our_partnersSection/ourPartnerSection.module.css";
import WorkspaceLogo from "./WorkspaceLogo";
import GenusPowerLogo from "./GenusPowerLogo";
import JagjanLogo from "./JagjanLogo";
import LipiLogo from "./LipiLogo";
import PyrotechEleLogo from "./PyrotechEleLogo";
import SecureMeterLogo from "./SecureMeterLogo";
import ToshniwalLogo from "./ToshniwalLogo";
import PyrotechIndLogo from "./PyrotechIndLogo";
import TempsensLogo from "./TempsensLogo";
import { motion, useAnimation } from "framer-motion";

import { useInView } from "react-intersection-observer";
import PrimaryTitle from "./PrimaryTitle";
const boxVariants = {
  hidden: {
    x: 0,
    opacity: 1,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      staggerChildren: 0.5,
      delayChildren: 0.5,
      duration: 1,
      ease: [0.3, 0.1, 0.3, 1],
    },
  },
};
const logoVariants = {
  hidden: { translateY: 40, opacity: 0 },
  visible: {
    translateY: 0,
    opacity: [0, 0.5, 1],
    transition: {
      delay: 1,
      duration: 0.8,
      ease: [0.3, 0.1, 0.3, 1],
    },
  },
};
const textVariants = {
  hidden: { translateY: 80, opacity: 0 },
  visible: {
    translateY: 0,
    opacity: 1,
    transition: {
      // delay: 0.5,
      duration: 0.8,
      //  ease: [0.17, 0.67, 0.83, 0.67],
    },
  },
};
const lineVariants = {
  hidden: { translateX: -200 },
  visible: {
    translateX: 0,
    transition: {
      delay: 0.8,
      duration: 0.8,
    },
  },
};
const OurPartnersSection = () => {
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
    <motion.div
      ref={ref}
      variants={boxVariants}
      initial="hidden"
      animate={controls}
      className={styles.ourPartnersSectionWrapper}
    >
      <PrimaryTitle />
      <div className={styles.logoWrapper}>
        <motion.div variants={logoVariants} className={styles.logoContainer}>
          <WorkspaceLogo />
        </motion.div>

        <motion.div variants={logoVariants} className={styles.logoContainer}>
          <SecureMeterLogo />
        </motion.div>

        <motion.div variants={logoVariants} className={styles.logoContainer}>
          <LipiLogo />
        </motion.div>
      </div>

      <div className={styles.logoWrapper}>
        <motion.div variants={logoVariants} className={styles.logoContainer}>
          <JagjanLogo />
        </motion.div>

        <motion.div variants={logoVariants} className={styles.logoContainer}>
          <TempsensLogo />
        </motion.div>

        <motion.div variants={logoVariants} className={styles.logoContainer}>
          <PyrotechEleLogo />
        </motion.div>
      </div>

      <div className={styles.logoWrapper}>
        <motion.div variants={logoVariants} className={styles.logoContainer}>
          <PyrotechIndLogo />
        </motion.div>

        <motion.div variants={logoVariants} className={styles.logoContainer}>
          <GenusPowerLogo />
        </motion.div>

        <motion.div variants={logoVariants} className={styles.logoContainer}>
          <ToshniwalLogo />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default OurPartnersSection;
