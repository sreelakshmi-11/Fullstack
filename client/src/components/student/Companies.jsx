import React from "react";
import { assets } from "../../assets/assets";

const Companies = () => {
  return (
    <div className="flex flex-col max-w-3xl text-center mx-auto mt-[50px] gap-[20px]">
      <p className="text-black text-[16px]">Trusted by learners from</p>
      <div className="flex justify-between gap-[30px]">
        <img src={assets.microsoft_logo} alt="Microsoft" />
        <img src={assets.walmart_logo} alt="Walmart" />
        <img src={assets.accenture_logo} alt="accenture" />
        <img src={assets.adobe_logo} alt="adobe acrobat" />
        <img src={assets.paypal_logo} alt="Paypal" />
      </div>
    </div>
  );
};

export default Companies;
