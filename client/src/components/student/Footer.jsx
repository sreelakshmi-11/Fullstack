import React from "react";
import { assets } from "../../assets/assets";
const Footer = () => {
  const data = ["Home", "About-us", "Contact Us", "Privacy-Policy"];
  return (
    <div className="gap-2.5">
      <div className="flex p-[30px] bg-black">
        <div className="w-[40%] flex flex-col gap-[30px]">
          <img
            src={assets.logo_dark}
            alt="logo"
            className="w-28 lg:w-32 cursor-pointer text-white"
          />
          <div className="text-white">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text.
          </div>
        </div>
        <div className="w-[20%] gap-[30px]">
          <h3 className="text-white">Company</h3>
          <div>
            {" "}
            {data.map((item, i) => (
              <li className="text-white" key={i}>
                {item}
              </li>
            ))}
          </div>
        </div>
        <div className="w-[40%] flex flex-col gap-[20px]">
          <div className="text-white">Subscribe to our newsletter</div>
          <div className="text-white">
            The latest news, articles, and resources, sent to your inbox weekly.
          </div>
          <div className="flex gap-[10px]">
            <input
              type="search"
              placeholder="Enter your Email"
              className="border w-[350px] p-[10px] text-white"
            />
            <button className="bg-blue-500 p-[10px] text-white">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <hr className="border-gray-500" />
      <div>
        <p className="text-[15px] bg-black text-white flex items-center justify-center">
          Copyright 2024 © Edemy. All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
