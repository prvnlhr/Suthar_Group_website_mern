import React, { useEffect } from "react";
import pageStyles from "../../css/companyPage/contactUsSection.module.css";
import { Route, Link, useNavigate, Switch, useLocation } from "react-router-dom";

import { useInView } from "react-intersection-observer";
import { Icon } from "@iconify/react";
import { motion, useAnimation } from "framer-motion";
const boxVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
      duration: 1,
      delayChildren: 0.5,
      duration: 0.6,
      delay: 0.3,
      ease: [0.17, 0.67, 0.83, 0.67],
    },
  },
};
const textVariants = {
  hidden: { translateY: 30, opacity: 0 },
  visible: {
    translateY: 0,
    opacity: [0, 0.5, 1],
    transition: {
      duration: 0.5,
      ease: [0.3, 0.1, 0.3, 1],
    },
  },
};
const lineHeadingVariants = {
  hidden: { translateX: -200 },
  visible: {
    translateX: 0,
    transition: {
      duration: 0.8,
      ease: [0.3, 0.1, 0.3, 1],
    },
  },
};

const arrowVariants = {
  hidden: { translateX: -20, opacity: 0 },
  visible: {
    translateX: 0,
    opacity: [0, 0.5, 1],
    transition: {
      duration: 0.5,
      ease: [0.3, 0.1, 0.3, 1],
    },
  },
};
const ContactUsSection = () => {
  const navigate = useNavigate();

  const controls = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
    if (!inView) {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const linkedClicked = () => {
    navigate("/company/contact");
  };
  return (
    <div className={pageStyles.contactSection}>
      <div className={pageStyles.textWrapper1}>
        <p className={pageStyles.contactSectionText1}>Have project in mind?</p>
        <p className={pageStyles.contactSectionText2}> Let's get to</p>
      </div>
      <motion
        className={pageStyles.textWrapper2}
        variants={boxVariants}
        initial="hidden"
        animate={controls}
        ref={ref}
      >
        <div className={pageStyles.linkDiv}>
          <motion.p
            variants={textVariants}
            className={pageStyles.linkText}
            onClick={() => linkedClicked()}
          >
            CONTACT US
          </motion.p>
          <motion.div variants={arrowVariants} className={pageStyles.iconDiv}>
            <Icon
              icon="bi:arrow-down-left"
              rotate={-1}
              color="#040259"
              className={pageStyles.arrowIcon}
            />
          </motion.div>
        </div>
      </motion>
    </div>
  );
};

export default ContactUsSection;
