import React, { useEffect, useState, useRef } from "react";
import pageStyles from "../../css/companyPage/aboutUsSection.module.css";
import ContextDiv from "../home/whatWeDoSection/ContextDiv";
import PrimaryTitle from "./PrimaryTitle";
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
      ease: [0.3, 0.1, 0.3, 1],
    },
  },
};
const imgVariants = {
  hidden: {
    scale: 1,
    opacity: 0.5,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 1,
      ease: [0.3, 0.1, 0.3, 1],
    },
  },
};
const BannerSection = () => {
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
    <motion.div ref={ref} className={pageStyles.bannerSection}>
      <motion.div
        variants={boxVariants}
        initial="hidden"
        animate={controls}
        className={pageStyles.aboutUsTitleWrapper}
      >
        <PrimaryTitle title={"About us"} />
      </motion.div>

      <div className={pageStyles.aboutUsCardWrapper}>
        <ContextDiv
          context1={`In year 1979 , Shri Rooparam Suthar led the foundation of Suthar Group
        of companies. Vishvakarma Engineering was the first subsidiary of Suthar
        Group which had proficiency of all types of Die manufacturing ,
        ATM machine parts , printer parts, CNC, Milling, Wire-cut, Sheet metal
        Job work etc.`}
          context2={`With the visionary idea of Mr. Suthar , Shree KR Engineering became the
          second under company of Suthar Group which pioneered in making all types of
          umbrella ribs services .`}
        />
      </div>
      <div className={pageStyles.aboutUsImageWrapper}></div>
    </motion.div>
  );
};

export default BannerSection;
