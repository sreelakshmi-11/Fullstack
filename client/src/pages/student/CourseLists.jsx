import React, { useContext, useEffect, useState } from "react";
import SearchBar from "../../components/student/SearchBar";
import { AppContext } from "../../context/appContext";
import CourseCard from "../../components/student/CourseCard";
import { useParams } from "react-router-dom";
import { assets } from "../../assets/assets";
import Footer from "../../components/student/Footer";

const CourseLists = () => {
  const { allCourses, navigate } = useContext(AppContext);

  const { input } = useParams();
  const [filteredCourse, setFilteredCourse] = useState([]);

  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      const tempCourses = allCourses.slice();
      input
        ? setFilteredCourse(
            tempCourses.filter((item) =>
              item.courseTitle.toLowerCase().includes(input.toLowerCase())
            )
          )
        : setFilteredCourse(tempCourses);
    }
  }, [allCourses, input]);
  return (
    <div className=" flex  flex-col gap-[50px] mx-[80px] mt-[60px]">
      <div className="flex justify-between">
        <div>
          <h1 className="text-[30px] font-bold">Course List</h1>
          <p className="text-[14px]">
            <span onClick={() => navigate("/")} className="text-blue-600">
              Home
            </span>{" "}
            / <span>Course List</span>
          </p>
        </div>
        <SearchBar
          className="!flex-shrink-0 !w-[550px] h-[54px]"
          data={input}
        />
      </div>
      <div>
        {input && (
          <div className="inline-flex gap-2 text-bold border border-gray-800 mb-[20px] p-[4px]">
            <div>{input}</div>
            <img
              src={assets.cross_icon}
              alt="cross icon"
              onClick={() => navigate("/course-list")}
            />
          </div>
        )}
      </div>
      <div className="grid grid-cols-4">
        {filteredCourse.map((course, index) => (
          <CourseCard course={course} key={index} />
        ))}
      </div>
      <button className="text-gray-500 border border-gray-500/30 px-10 py-3 rounded w-[200px] text-nowrap flex text-center mx-auto justify-center items-center">
        Load More
      </button>
      <Footer />
    </div>
  );
};

export default CourseLists;
