import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/appContext";
import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  const { currency, calculateRating } = useContext(AppContext);

  return (
    <Link
      to={"/course/" + course._id}
      onClick={() => scrollTo(0, 0)}
      className="flex flex-col text-center mx-auto max-w-[300px]"
    >
      <img src={course.courseThumbnail} alt="thumbnail" />
      <div className="p-[15px] flex flex-col text-center">
        <h1 className="text-nowrap">{course.courseTitle}</h1>
        <p>Great Stack</p>
        <div className="flex items-center justify-center">
          <p>{calculateRating(course)}</p>
          <div className="flex">
            {Array.from({ length: 5 }).map((_, index) => (
              <img
                src={
                  index < Math.floor(calculateRating(course))
                    ? assets.star
                    : assets.star_blank
                }
                alt="star"
                key={index}
              />
            ))}
          </div>
          <p className="text-gray-500">{course.courseRatings.length}</p>
        </div>
        <div>
          {currency}
          {(
            course.coursePrice -
            (course.discount * course.coursePrice) / 100
          ).toFixed(2)}
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
