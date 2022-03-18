import React from "react";
import styles from "../../css/companyPage/exploreProductsSection.module.css";
import { Icon } from "@iconify/react";
import KRprodSampleImg from "../../img/KRprodSampleImg.png";
import vishwakarmaSampleProdImg from "../../img/vishwakarmaSampleProdImg.png";
import {
  Route,
  NavLink,
  useHistory,
  Switch,
  useLocation,
} from "react-router-dom";
const ExploreProductsSection = () => {
  const history = useHistory();
  const location = useLocation();

  const exploreLinkedClicked = () => {
    console.log("linked clicked", location.pathname);

    if (location.pathname === "/company/KR") {
      console.log("linked clicked1", location.pathname);
      history.push("/productList/KR");
    } else if (location.pathname === "/company/vishwakarma") {
      console.log("linked clicked2", location.pathname);
      history.push("/productList/vishwakarma");
    }
  };
  return (
    <div className={styles.exploreProductSection}>
      <div className={styles.outerWrapper}>
        <div className={styles.floatingDivLeft}></div>
        <div className={styles.floatingDivRight}></div>
        <div className={styles.innerWrapper}>
          <div className={styles.contentCard}>
            <div className={styles.contextDivUpper}>
              <p className={styles.upperContextDivText}>
                We can build products from the ground up, or upgrade exisiting
                ones to cope with new demands and growing user base.
              </p>
            </div>
            <div className={styles.contextDivLower}>
              <p className={styles.lowerContextDivText1}>Explore our </p>
              <p
                className={styles.lowerContextDivText2}
                onClick={() => exploreLinkedClicked()}
              >
                Products.
              </p>
              <Icon
                icon="bi:arrow-down-left"
                rotate={-1}
                color="#040259"
                className={styles.arrowIcon}
              />
            </div>
          </div>
          <div className={styles.imageWrapper}>
            {/*  {location.pathname === "/company/vishvakarma" ? (
            <p className={pageStyles.companyNameText}>
              VISHVAKARMA ENGINEERING{" "}
            </p>
          ) : (
            location.pathname === "/company/KR" && (
              <p className={pageStyles.companyNameText}>
                SHREE KR ENGINEERING{" "}
              </p>

              {location.pathname ==="/company/vishvakarma" ? vihwakarmaSampleImg : location.pathname === "/company/KR" ?prodSampleImg }
            )
          )} */}
            <img
              src={
                location.pathname === "/company/vishwakarma"
                  ? vishwakarmaSampleProdImg
                  : KRprodSampleImg
              }
              alt="sampleImg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreProductsSection;
