import React, { useEffect } from "react";
import styles from "../../../css/statisticsSection/statisticsSection.module.css";
import statisticsBg from "../../../img/statisticsBg2.jpg";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import PrimaryTitle from "./PrimaryTitle";
import SecondaryTitle from "./SecondaryTitle";
import YearsStats from "./YearsStats";
import YearStatsAbout from "./YearStatsAbout";
import ProjectsStats from "./ProjectsStats";
import ProjectStatsAbout from "./ProjectStatsAbout";
import SatisfactionStats from "./SatisfactionStats";
import SatisfactionStatsAbout from "./SatisfactionStatsAbout";
import YearsComponent from "./YearsComponent";
import ActiveProjectsComponent from "./ActiveProjectsComponent";
import CusSatisfactionComponent from "./CusSatisfactionComponent";
const boxVariants = {
  hidden: {
    opacity: 1,
  },
  visible: {
    opacity: 1,
    transition: {
      // staggerChildren: 0.2,
      delayChildren: 0.5,
      duration: 0.6,
      ease: [0.3, 0.1, 0.3, 1],
    },
  },
};
const textVariants = {
  hidden: { translateY: 40, opacity: 0 },
  visible: {
    translateY: 0,
    opacity: [0, 0.5, 1],
    transition: {
      duration: 0.5,
      ease: [0.3, 0.1, 0.3, 1],
    },
  },
};

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 0.8,
    },
  },
};
const StatisticsSection = () => {
  const { ref, inView } = useInView({
    // triggerOnce: true,
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
    <div className={styles.statisticsWrapper}>
      <motion.div
        variants={boxVariants}
        initial="hidden"
        animate={controls}
        ref={ref}
        className={styles.statisticsImgWrapper}
      >
        <img className={styles.bgImage} src={statisticsBg} />
        <div className={styles.overlayDiv}></div>
        <PrimaryTitle />
        <SecondaryTitle />

        <div className={styles.contextWrapper}>
          {/* <div className={styles.contextDiv}>
            <YearsStats />

            <div className={styles.statsTypeDiv}>
              <motion.p
                variants={textVariants}
                className={styles.statsTypeText}
              >
                Years in Business
              </motion.p>
            </div>
            <motion.div
              variants={lineVariants}
              className={styles.lineBreak}
            ></motion.div>
            <YearStatsAbout />
          </div> */}
          <YearsComponent />
          <ActiveProjectsComponent />
          <CusSatisfactionComponent />
          {/* <div className={styles.contextDiv}>
            <ProjectsStats />

            <div className={styles.statsTypeDiv}>
              <motion.p
                variants={textVariants}
                className={styles.statsTypeText}
              >
                Active Projects
              </motion.p>
            </div>
            <motion.div
              variants={lineVariants}
              className={styles.lineBreak}
            ></motion.div>
            <ProjectStatsAbout />
          </div> */}
          {/* <div className={styles.contextDiv}>
            <SatisfactionStats />

            <div className={styles.statsTypeDiv}>
              <motion.p
                variants={textVariants}
                className={styles.statsTypeText}
              >
                Customer Satisfaction
              </motion.p>
            </div>
            <motion.div
              variants={lineVariants}
              className={styles.lineBreak}
            ></motion.div>
            <SatisfactionStatsAbout />
          </div> */}
        </div>
      </motion.div>
    </div>
  );
};

export default StatisticsSection;
