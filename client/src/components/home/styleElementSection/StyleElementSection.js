import React, { useEffect, useState, useRef } from "react";
import styles from "../../../css/styleElementSection/styleElementSection.module.css";
import developingBg from "../../../img/developingBg.jpg";
import PrimaryTitle from "./PrimaryTitle";

// const useScrollPosition = () => {
//   return scrollYPos;
// };

const StyleElementSection = ({ node, aboutUsSectionRef }) => {
  const [scrollYPos, setScrollYPos] = useState(window.pageYOffset);

  const onScroll = () => {
    // console.log(
    //   "scrolling",
    //   node.current.scrollTop,
    //   node.current.scrollTop - aboutUsSectionRef.current.offsetTop
    // );
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

  //   const scrollPos = useScrollPosition();
  return (
    <div className={styles.styleElementWrapper}>
      <h1
        className={styles.verticalText}
        style={{
          transform: `translateY(-${scrollYPos / 2}px )`,
        }}
      >
        DEVELOPING
      </h1>
      <h1
        className={styles.primaryText}
        // style={{
        //   transform: `translate3d(-${scrollYPos / 2}px , ${
        //     scrollYPos * 0.2
        //   }px ,0px)`,
        // }}
        style={{
          transform: `translateX(-${scrollYPos / 2}px)`,
        }}
      >
        DEVELOPING
      </h1>

      <PrimaryTitle />
      {/* <div className={styles.titleDiv}>
        <div className={styles.titleLine}></div>
        <p className={styles.titleText}>WE ARE ALWAYS</p>
      </div> */}

      <div className={styles.imgWrapper}>
        <img className={styles.imgBg} src={developingBg} />
        <div className={styles.overlayDiv}></div>
      </div>
      <h1
        className={styles.secondaryText}
        style={{
          transform: `translateX(-${scrollYPos / 2}px)`,
        }}
      >
        DEVELOPING
      </h1>
    </div>
  );
};

export default StyleElementSection;
