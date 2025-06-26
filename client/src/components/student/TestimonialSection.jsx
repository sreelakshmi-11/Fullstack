import React from "react";
import { assets, dummyTestimonial } from "../../assets/assets";

const TestimonialSection = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-3xl mx-auto text-center">
      <p className="text-black text-[30px] font-medium">Testimonials</p>
      <p className="text-black">
        Hear from our learners as they share their journeys of transformation,
        success, and how our platform has made a difference in their lives.
      </p>
      <div className="flex gap-[10px] mt-[20px]">
        {dummyTestimonial.map((item, index) => (
          <Testimonial item={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default TestimonialSection;

const Testimonial = ({ item }) => {
  // const total_stars = 5;
  // let rating = (item.rating / total_stars) * 100;
  return (
    <div className="flex flex-col w-[300px] border">
      <div className="flex bg-[#F3F3F3] p-[20px]">
        <div className="flex">
          <img
            className="w-[50px] h-[50px] rounded-full text-black"
            src={item.image}
            alt="profile"
          />
          <div className="flex flex-col">
            <div className="text-black">{item.name}</div>
            <div className="text-black">{item.role}</div>
          </div>
        </div>
      </div>
      <div className="p-[20px] !gap-[20px]">
        <div className="flex">
          {" "}
          {Array.from({ length: 5 }).map((_, i) => (
            <img
              src={
                i < Math.floor(item.rating) ? assets.star : assets.star_blank
              }
              alt="star"
              key={i}
            />
          ))}
        </div>
        <div className="flex text-left">{item.feedback}</div>
        <a
          href=""
          className="text-blue-500 hover:underline text-sm flex items-start mt-[30px]"
        >
          Read More...
        </a>
      </div>
    </div>
  );
};
