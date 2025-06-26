import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ data, className }) => {
  const navigate = useNavigate();

  const [input, setInput] = useState(data ? data : "");
  const onSearchHandler = (e) => {
    e.preventDefault();
    navigate("/course-list/" + input);
  };
  return (
    <form
      onSubmit={onSearchHandler}
      className={`flex justify-between min-w-[550px] p-[5px] max-w-2xl border border-[grey] relative ${className} `}
    >
      <div className="flex w-[70%]">
        <img
          src={assets.search_icon}
          className="w-[25px] h-[25px] absolute top-3"
        />
        <input
          type="text"
          value={input}
          placeholder="search for courses"
          className="text-black ml-[40px] !w-full"
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <button className="!bg-blue-500 w-[146px] h-[42px] flex justify-center items-center text-white">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
