import React from "react";
import foodPanda from "../assets/foodpanda.png";
import amazonLogo from "../assets/amzaon-logo.jpg";
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
        break;
    }
  };
  return (
    <Image
      src={foodPanda}
      alt="logo"
      className="my-5"
      height={100}
      width={100}
    />
  );
};
