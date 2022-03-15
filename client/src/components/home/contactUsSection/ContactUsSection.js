import React, { useEffect, useState } from "react";
import styles from "../../../css/contactUsSection/contactUsSection.module.css";
import contactUsBg from "../../../img/contatctUsBg3.jpg";
import PrimaryTitle from "./PrimaryTitle";
import SecondaryTitle from "./SecondaryTitle";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ContactUsBgImg from "./ContactUsBgImg";

const imgVariants = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.5,
      delayChildren: 0.5,
      duration: 0.8,
      delay: 0.2,
    },
  },
};
const ContactUsSection = ({ contactUsSectionRef }) => {
  return (
    <div className={styles.contactUsSectionWrapper} ref={contactUsSectionRef}>
      <div className={styles.styleDiv}>

        <PrimaryTitle />

      </div>

      <div className={styles.cardImgWrapper}>
        <div className={styles.contactUsCard}>

          <SecondaryTitle />

        </div>

        <ContactUsBgImg />
      </div>
    </div>
  );
};

export default ContactUsSection;
