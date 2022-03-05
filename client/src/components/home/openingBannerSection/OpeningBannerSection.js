import React, { useEffect } from "react";
import styles from "../../../css/openingBannerSection/openingBannerSection.module.css";
// import bannerImg from "../../../img/bannerImg2.jpg";
import { Link } from "react-router-dom";
// import { Icon } from "@iconify/react";
// import {
//   motion,
//   useAnimation,
//   useViewportScroll,
//   useTransform,
// } from "framer-motion";
import { useInView } from "react-intersection-observer";

const OpeningBannerSection = () => {
  const boxVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
        duration: 1,
        delayChildren: 0.5,
        duration: 0.6,
        delay: 0.2,
        // ease: [0.6, 0.05, -0.01, 0.9],
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
  const imageVariants = {
    hidden: { y: 0, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: 0.8,
        ease: [0.6, 0.05, -0.01, 0.9],
      },
    },
  };
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: 0.5,
        ease: [0.6, 0.05, -0.01, 0.9],
      },
    },
  };
  const controls = useAnimation();
  const { scrollY } = useViewportScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 200]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);

  // const { ref, inView } = useInView({
  //   triggerOnce: true,
  // });

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
    //   variants={boxVariants}
    //   initial="hidden"
    //   animate="visible"
    //   className={styles.landingBannerWrapper}
    // >
    //   <motion.div className={styles.bannerImgContainer}>
    //     <motion.img
    //       className={styles.bannerImage}
    //       src={bannerImg}
    //       alt="bannerImg"
    //       variants={imageVariants}
    //       // initial="initial"
    //       // animate="animate"
    //     />
    //     <motion.div
    //       variants={overlayVariants}
    //       // initial="initial"
    //       // animate="animate"
    //       className={styles.overlayDiv}
    //     ></motion.div>
    //     <div className={styles.textDiv}>
    //       <motion.p variants={textVariants} className={styles.bannerText}>
    //         WE ARE <span className={styles.spanText}>LEADER</span> IN
    //         ENGINEERING & TECHNOLOGY
    //       </motion.p>
    //       <div className={styles.scrollDownTextDiv}>
    //         <p className={styles.scrollDownText}>scroll down</p>
    //         <Icon
    //           icon="bi:arrow-right"
    //           color="white"
    //           rotate={1}
    //           className={styles.scrollDownIcon}
    //         />
    //       </div>
    //     </div>
    //   </motion.div>
    </motion.div>
  );
};

export default OpeningBannerSection;
// <div className={styles.landingBannerWrapper}>
//   <motion.div
//     className={styles.card}
//     // style={{ transform: `translateY(${y1}px)` }}
//   >
//     {/* <motion.p
//         variants={boxVariants}
//         initial="hidden"
//         animate={controls}
//         ref={ref}
//         style={{ y: y1 }}
//       >
//         OUR PRODUCTS
//       </motion.p> */}
//   </motion.div>
// </div>
