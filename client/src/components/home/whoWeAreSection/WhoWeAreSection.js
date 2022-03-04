// import React, { useEffect } from "react";
// import styles from "../../../css/whoWeAreSection/whoWeAreSection.module.css";

// import { useInView } from "react-intersection-observer";
// import { motion, useAnimation } from "framer-motion";
// import PrimaryTitle from "./PrimaryTitle";
// import SecondaryTitle from "./SecondaryTitle";
// import TertiaryTitle from "./TertiaryTitle";
// import ContextTop from "./ContextTop";
// import ContextMiddle from "./ContextMiddle";
// import ContextBottom from "./ContextBottom";
// const boxVariants = {
//   hidden: {
//     opacity: 1,
//   },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.5,
//       duration: 1,
//       delayChildren: 0.5,
//       ease: [0.3, 0.1, 0.3, 1],
//     },
//   },
// };

// const WhoWeAreSection = ({ aboutUsSectionRef }) => {
//   const { ref, inView } = useInView({
//     triggerOnce: true,
//     threshold: 0.3,
//   });
//   const controls = useAnimation();

//   useEffect(() => {
//     if (inView) {
//       controls.start("visible");
//     }
//     if (!inView) {
//       controls.start("hidden");
//     }
//   }, [controls, inView]);
//   return (
//     <div
//       variants={boxVariants}
//       className={styles.whoWeAreWrapper}
//       ref={aboutUsSectionRef}
//     >
//       <PrimaryTitle />
//       <SecondaryTitle />
//       <TertiaryTitle />
//       <div className={styles.contextWrapper}>
//         <ContextTop />
//         <ContextMiddle />
//         <ContextBottom />
//       </div>
//     </div>
//   );
// };

// export default WhoWeAreSection;
