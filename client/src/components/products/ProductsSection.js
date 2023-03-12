import React, { useEffect, useState, useRef } from "react";

import { Icon } from "@iconify/react";
import styles from "../../css/productSection/productsSection.module.css";
import ourProductsBg from "../../img/ourProductsBg.jpg";
import { useInView } from "react-intersection-observer";
import OurProductsCard from "./OurProductsCard";
import ContactUsCard from "./ContactUsCard";
import { motion, useAnimation } from "framer-motion";

const boxVariants = {
  hidden: {
    opacity: 1,
  },
  visible: {
    opacity: 1,
    transition: {
      // delay: 0.8,
      staggerChildren: 0.2,
      delayChildren: 0.5,
      duration: 0.6,
      ease: [0.17, 0.67, 0.83, 0.67],
    },
  },
};
const textVariants = {
  hidden: { translateY: 80, opacity: 0 },
  visible: {
    translateY: 0,
    opacity: [0, 0.5, 1],
    transition: {
      // delay: 0.5,
      duration: 0.5,
      //  ease: [0.17, 0.67, 0.83, 0.67],
    },
  },
};
const lineHeadingVariants = {
  hidden: { translateX: -200 },
  visible: {
    translateX: 0,
    transition: {
      delay: 0.8,
      duration: 0.8,
    },
  },
};
const lineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      // delay: 0.2,
      duration: 0.8,
    },
  },
};
const ProductsSection = ({
  backBtnClicked,
  setBackBtnClicked,
  ourProductSectionRef,
  contactSectionRef,
  node,
}) => {
  const [scrollYPos, setScrollYPos] = useState(window.pageYOffset);

  const onScroll = () => {
    // console.log("scrolling", node.current.scrollTop);
    setScrollYPos(node.current.scrollTop);
  };
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
    <div className={styles.ourProductsSectionWrapper}>
      <p
        style={{
          transform: `translateY(${-scrollYPos / 3}px )`,
        }}
        className={styles.verticalText1}
      >
        OUR PRODUCTS
      </p>
      <p
        style={{
          transform: `translateY(${-scrollYPos / 3}px )`,
        }}
        className={styles.verticalText2}
      >
        OUR PRODUCTS
      </p>
      <div className={styles.imgWrapper}>
        {/* <img src={ourProductsBg} className={styles.bgImage} /> */}
      </div>
      <OurProductsCard ourProductSectionRef={ourProductSectionRef} />
      <ContactUsCard contactSectionRef={contactSectionRef} />
    </div>
  );
};

export default ProductsSection;
