import React from "react";
import { assets } from "../../assets/assets";

const CallToAction = () => {
  return (
    <div className="flex flex-col max-w-3xl text-center mx-auto gap-[20px]">
      <div className="text-[38px] font-medium">
        Learn anything, anytime, anywhere
      </div>
      <div>
        Incididunt sint fugiat pariatur cupidatat consectetur sit cillum anim id
        veniam aliqua proident excepteur commodo do ea.
      </div>
      <div className="flex gap-[30px] text-center mx-auto">
        <button className="bg-blue-500 text-white p-[8px]">Get Started</button>
        <div className="flex">
          <button className="p-[8px]">Learn More</button>
          <img src={assets.arrow_icon} />
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
