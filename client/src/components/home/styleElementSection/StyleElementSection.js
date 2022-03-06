import React, { useEffect, useState, useRef } from "react";
import styles from "../../../css/styleElementSection/styleElementSection.module.css";
import developingBg from "../../../img/developingBg.jpg";
import PrimaryTitle from "./PrimaryTitle";


const StyleElementSection = ({ node, aboutUsSectionRef }) => {
  const [scrollYPos, setScrollYPos] = useState(window.pageYOffset);

  const onScroll = () => {

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
 
        style={{
          transform: `translateX(-${scrollYPos / 2}px)`,
        }}
      >
        DEVELOPING
      </h1>

      <PrimaryTitle />


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
