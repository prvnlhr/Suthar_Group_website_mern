import React, { useEffect } from "react";
import styles from "../../../css/companyPage/client.module.css";
import PrimaryTitle from "./PrimaryTitle";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import WorkspaceLogo from "../../home/ourPartnersSection/WorkspaceLogo";
import GenusPowerLogo from "../../home/ourPartnersSection/GenusPowerLogo";
import JagjanLogo from "../../home/ourPartnersSection/JagjanLogo";
import LipiLogo from "../../home/ourPartnersSection/LipiLogo";
import PyrotechEleLogo from "../../home/ourPartnersSection/PyrotechEleLogo";
import SecureMeterLogo from "../../home/ourPartnersSection/SecureMeterLogo";
import ToshniwalLogo from "../../home/ourPartnersSection/ToshniwalLogo";
import PyrotechIndLogo from "../../home/ourPartnersSection/PyrotechIndLogo";
import TempsensLogo from "../../home/ourPartnersSection/TempsensLogo";
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
      // ease: [0.6, 0.05, -0.01, 0.9],
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
const ClientsSection = () => {
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
      className={styles.clientSection}
    >
      <motion.div className={styles.tileContainer}>
        <PrimaryTitle />
      </motion.div>
      <div className={styles.clientLogoWrapper}>
        <motion.div
          variants={logoVariants}
          className={styles.clientLogoContainer}
        >
          <WorkspaceLogo />
        </motion.div>
        <motion.div
          variants={logoVariants}
          className={styles.clientLogoContainer}
        >
          <GenusPowerLogo />
        </motion.div>
        <motion.div
          variants={logoVariants}
          className={styles.clientLogoContainer}
        >
          <JagjanLogo />
        </motion.div>
        <motion.div
          variants={logoVariants}
          className={styles.clientLogoContainer}
        >
          <LipiLogo />
        </motion.div>
        <motion.div
          variants={logoVariants}
          className={styles.clientLogoContainer}
        >
          <PyrotechEleLogo />
        </motion.div>
        <motion.div
          variants={logoVariants}
          className={styles.clientLogoContainer}
        >
          <SecureMeterLogo />
        </motion.div>
        <motion.div
          variants={logoVariants}
          className={styles.clientLogoContainer}
        >
          <ToshniwalLogo />
        </motion.div>
        <motion.div
          variants={logoVariants}
          className={styles.clientLogoContainer}
        >
          <PyrotechIndLogo />
        </motion.div>
        <motion.div
          variants={logoVariants}
          className={styles.clientLogoContainer}
        >
          <TempsensLogo />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ClientsSection;
