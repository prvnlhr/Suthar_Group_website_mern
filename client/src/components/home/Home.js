import React, { useEffect, useRef, useState } from "react";
import { Route, NavLink, useHistory, Switch } from "react-router-dom";
import OpeningBannerSection from "./openingBannerSection/OpeningBannerSection";
// import ProductsSection from "../productsSection/ProductsSection";
import StatisticsSection from "./statisticsSection/StatisticsSection";
import StyleElementSection from "./styleElementSection/StyleElementSection";
import WhatWeDoSection from "./whatWeDoSection/WhatWeDoSection";
import WhoWeAreSection from "./whoWeAreSection/WhoWeAreSection";
import Navbar from "../appLayout/Navbar";
import styles from "../../css/appLayoutSection/home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import DropDownMenu from "../appLayout/DropDownMenu";
import DropDownToggleBtn from "../appLayout/DropDownToggleBtn";
import OurPartnersSection from "./ourPartnersSection/OurPartnersSection";
import FooterSection from "./footerSection/FooterSection";
import OurCompaniesSection from "./ourCompaniesSection/OurCompaniesSection";
import OurServicesSection from "./ourServicesSection/OurServicesSection";
import ContactUsSection from "./contactUsSection/ContactUsSection";
import { useInView } from "react-intersection-observer";

const Home = ({
  scrollPosition,
  setScrollPosition,
  backBtnClicked,
  setBackBtnClicked,
}) => {
  const [currVisible, setCurrVisible] = useState("home");
  const dropDownShow = useSelector(
    (state) => state.auxillaryReducer.dropDownShow
  );

  const node = useRef();
  const ourCompaniesSectionRef = useRef();
  const contactUsSectionRef = useRef();
  const aboutUsSectionRef = useRef();
  const footerUsSectionRef = useRef();
  const history = useHistory();

  const onScroll = () => {
    if (
      -aboutUsSectionRef.current.getBoundingClientRect().height + 100 <
        aboutUsSectionRef.current.getBoundingClientRect().top &&
      aboutUsSectionRef.current.getBoundingClientRect().top < 70
    ) {
      setCurrVisible("aboutUsSection");
    } else if (
      -ourCompaniesSectionRef.current.getBoundingClientRect().height + 100 <
        ourCompaniesSectionRef.current.getBoundingClientRect().top &&
      ourCompaniesSectionRef.current.getBoundingClientRect().top < 70
    ) {
      setCurrVisible("ourCompaniesSection");
    } else if (
      -contactUsSectionRef.current.getBoundingClientRect().height + 100 <
        contactUsSectionRef.current.getBoundingClientRect().top &&
      contactUsSectionRef.current.getBoundingClientRect().top < 70
    ) {
      setCurrVisible("contactUsSection");
    } else {
      setCurrVisible("home");
    }
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

  
  useEffect(() => {
    const clickedDetailsJSON = JSON.parse(
      sessionStorage.getItem("clickDetails")
    );

    // ____________________________________________________________________
    if (clickedDetailsJSON && clickedDetailsJSON.from === "contactUsSection") {
      console.log(clickedDetailsJSON);
      contactUsSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      sessionStorage.setItem("clickDetails", JSON.stringify("unset"));
    }
    // ____________________________________________________________________
    else if (
      clickedDetailsJSON &&
      clickedDetailsJSON.from === "ourCompaniesSection"
    ) {
      console.log(clickedDetailsJSON);
      ourCompaniesSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      sessionStorage.setItem("clickDetails", JSON.stringify("unset"));
    }

    // ____________________________________________________________________
    else if (
      clickedDetailsJSON &&
      clickedDetailsJSON.from === "footerSection"
    ) {
      console.log(clickedDetailsJSON);
      footerUsSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      sessionStorage.setItem("clickDetails", JSON.stringify("unset"));
    }
  }, []);

  return (
    <div className={styles.homeWrapper} ref={node}>
      <Navbar
        node={node}
        ourCompaniesSectionRef={ourCompaniesSectionRef}
        aboutUsSectionRef={aboutUsSectionRef}
        contactUsSectionRef={contactUsSectionRef}
        currVisible={currVisible}
      />

      <DropDownToggleBtn />
      <AnimatePresence>
        {dropDownShow === true && (
          <DropDownMenu
            footerUsSectionRef={footerUsSectionRef}
            aboutUsSectionRef={aboutUsSectionRef}
          />
        )}
      </AnimatePresence>
      <OpeningBannerSection />
      <WhatWeDoSection node={node} />
      <StyleElementSection node={node} />
      <StatisticsSection />
      <WhoWeAreSection aboutUsSectionRef={aboutUsSectionRef} />
      <OurCompaniesSection ourCompaniesSectionRef={ourCompaniesSectionRef} />
      <OurServicesSection />
      <ContactUsSection contactUsSectionRef={contactUsSectionRef} />
      <OurPartnersSection />
      <FooterSection
        aboutUsSectionRef={aboutUsSectionRef}
        footerUsSectionRef={footerUsSectionRef}
      />
    </div>
  );
};

export default Home;
{
  /* <ProductsSection
        backBtnClicked={backBtnClicked}
        setBackBtnClicked={setBackBtnClicked}
        ourProductSectionRef={ourProductSectionRef}
        contactSectionRef={contactSectionRef}
        node={node}
      /> */
}
