import React, { useEffect, useState, useRef } from "react";
import styles from "../../../css/whatWeDoSection/whatWeDoSection.module.css";
import bannerImg from "../../../img/whatwedoBg3.jpg";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import PrimaryTitle from "./PrimaryTitle";
import SecondaryTitle from "./SecondaryTitle";
import ContextDiv from "./ContextDiv";
const boxVariants = {
  hidden: {
    x: -1000,
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

const WhatWeDoSection = ({ node }) => {
  const [scrollYPos, setScrollYPos] = useState(window.pageYOffset);

  // const onScroll = () => {
  //   // console.log("scrolling", node.current.scrollTop);
  //   setScrollYPos(node.current.scrollTop);
  // };
  useEffect(() => {
    if (node.current != null) {
      node.current.addEventListener("scroll", onScroll, true);
    }
    return () => {
      if (node.current != null) {
        node.current.removeEventListener("scroll", onScroll);
      }
    };
  }, []);

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
    <motion.div ref={ref} className={styles.whatWeDoWrapper}>
      <p
        style={{
          transform: `translateY(${-scrollYPos / 3}px )`,
        }}
        className={styles.verticalText1}
      >
        WHAT WE DO
      </p>
      <p
        style={{
          transform: `translateY(${-scrollYPos / 3}px )`,
        }}
        className={styles.verticalText2}
      >
        WHAT WE DO
      </p>

      <div className={styles.imgWrapper}>
        <motion.div className={styles.overlayDiv}></motion.div>

        <img
          style={{
            transform: `translateY(-${scrollYPos / 7}px )`,
          }}
          variants={imgVariants}
          initial="hidden"
          animate={controls}
          src={bannerImg}
          className={styles.whatWeDoImg}
        />
      </div>
      <motion.div
        variants={boxVariants}
        initial="hidden"
        animate={controls}
        className={styles.cardWrapper}
      >
        <PrimaryTitle title={" WHAT WE DO "} />
        <SecondaryTitle />
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
      </motion.div>
    </motion.div>
  );
};

export default WhatWeDoSection;
{
  /* <motion.div ref={ref} className={styles.whatWeDoWrapper}>
      <motion.div
        variants={boxVariants}
        initial="hidden"
        animate={controls}
        className={styles.cardWrapper}
      >
        <div className={styles.titleDivPrimary}>
          <motion.div
            variants={lineVariants}
            animate={controls}
            className={styles.titleLine}
          ></motion.div>
          <motion.p variants={textVariants} className={styles.primaryTitleText}>
            WHAT WE DO
          </motion.p>
        </div>
        <div className={styles.titleDivSecondary}>
          <motion.p
            variants={textVariants}
            className={styles.secondaryTitleText}
          >
            INTEGRATING SCIENCE & ENGINEERING WITH SKILLS
          </motion.p>
        </div>
        <div className={styles.contextDiv}>
          <motion.p variants={textVariants} className={styles.contextText}>
            We are pioneer in manufacturing complex mechanical parts using
            highly advance machinery and technologies.
          </motion.p>
          <motion.p variants={textVariants} className={styles.contextText}>
            Our work includes manufacturing Dies , Two Fold Auto Ribs, Two Fold
            Topless Ribs , ATM machine parts
          </motion.p>
        </div>
      </motion.div>
      <div className={styles.imgWrapper}>
        <img src={bannerImg} className={styles.whatWeDoImg} />
      </div>
    </motion.div> */
}
