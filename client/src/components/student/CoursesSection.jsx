import React, { useContext } from "react";
import { Link } from "react-router-dom";
import CourseCard from "./CourseCard";
import { AppContext } from "../../context/appContext";

const CoursesSection = () => {
  const { allCourses } = useContext(AppContext);

  return (
    <div className="flex flex-col text-center gap-[20px] p-[100px]">
      <h1 className="text-3xl font-medium text-gray-800">
        Learn from the best
      </h1>
      <p>
        Discover our top-rated courses across various categories. From coding
        and design to
        <br /> business and wellness, our courses are crafted to deliver
        results.
      </p>
      <div className="grid grid-cols-4 gap-2.5 mx-w-[1000px]">
        {allCourses.slice(0, 4).map((course, i) => (
          <CourseCard course={course} key={i} />
        ))}
      </div>
      <Link
        to={"/course-list"}
        onClick={() => scrollTo(0, 0)}
        className="text-gray-500 border border-gray-500/30 px-10 py-3 rounded w-[200px] text-nowrap flex text-center mx-auto"
      >
        Show all Courses
      </Link>
    </div>
  );
};

export default CoursesSection;
