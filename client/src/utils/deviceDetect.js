import React, { useEffect } from "react";

export default function userDevice() {
  const [isMobile, setMobile] = React.useState(false);
  useEffect(() => {
    const userAgent =
      typeof navigator === "undefined" ? "" : navigator.userAgent;

    console.log(`user's device is: ${window.navigator.userAgent}`);
  }, []);
}
