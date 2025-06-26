import React from "react";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div className="flex justify-between px-20 py-5">
      <div className="flex gap-4">
        <img src={assets.logo} />
        <div className="hidden md:block h-7 w-[2px] bg-gray-500/60"></div>
        <p className="flex text-nowrap justify-center items-center">
          All right reserved. Copyright @Edemy
        </p>
      </div>
      <div className="flex gap-3">
        <a href="#">
          <img src={assets.facebook_icon} />
        </a>
        <a href="#">
          <img src={assets.twitter_icon} />
        </a>
        <a href="#">
          <img src={assets.instagram_icon} />
        </a>
      </div>
    </div>
  );
};

export default Footer;
