import React from "react";
import styles from "../../css/modal/deleteModal.module.css";
const WarningIcon = () => {
  return (
    <svg
      className={styles.warningIcon}
      //   width="536"
      //   height="480"
      viewBox="0 0 536 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M267.861 294.058V146.184"
        stroke="#FF313B"
        stroke-width="38.3676"
        stroke-linecap="round"
      />
      <path
        d="M295.938 370.26C295.938 385.779 283.357 398.359 267.838 398.359C252.319 398.359 239.739 385.779 239.739 370.26C239.739 354.741 252.319 342.16 267.838 342.16C283.357 342.16 295.938 354.741 295.938 370.26Z"
        fill="#FF313B"
      />
      <path
        d="M302.187 38.2941L512.246 402.127C527.512 428.569 508.43 461.621 477.898 461.621H57.7791C27.2472 461.621 8.16475 428.569 23.4307 402.127L233.49 38.294C248.756 11.8527 286.921 11.8527 302.187 38.2941Z"
        stroke="#FF313B"
        stroke-width="35.7786"
      />
    </svg>
  );
};

export default WarningIcon;
