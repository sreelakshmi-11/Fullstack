import React from "react";
import { assets } from "../../assets/assets";
import SearchBar from "./SearchBar";

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full md:pt-[36px] pt-[20px] px-7 md:px-0 space-y-7 bg-gradient-to-b from-cyan-100/70">
      <div className="font-outfit font-bold text-black text-wrap mx-auto max-w-3xl relative text-center">
        Empower your future with the courses designed to{" "}
        <span className=" font-outfit font-bold text-[blue]">
          fit your choice.
        </span>
        <img src={assets.sketch} className="absolute right-0" />
      </div>
      <div className=" max-w-sm md:max-w-xl items-center justify-center font-outfit text-[16px text-wrap text-center] text-gray-500 mx-auto">
        We bring together world-class instructors, interactive content, and a
        supportive community to help you achieve your personal and professional
        goals.
      </div>
      <SearchBar />
    </div>
  );
};

export default Hero;
