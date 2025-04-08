import React from "react";
import foodPanda from "../assets/foodpanda.png";
import amazonLogo from "../assets/amazon-logo.jpg"; // Fixed typo in filename
import darazLogo from "../assets/daraz-logo.svg";
import Image from "next/image";

export const LogoHeader = ({ subdomain }) => {
  const getImage = () => {
    switch (subdomain) {
      case "daraz":
        return darazLogo;
      case "amazon":
        return amazonLogo;
      case "foodpanda":
        return foodPanda;
      default:
        return foodPanda; // Fallback image instead of undefined
    }
  };

  const logoSrc = getImage(); // Store the result to use in the Image component

  return (
    <Image
      src={logoSrc} // Use the dynamic source
      alt={`${subdomain || "company"} logo`} // Dynamic alt text
      className="my-5"
      height={100}
      width={100}
    />
  );
};