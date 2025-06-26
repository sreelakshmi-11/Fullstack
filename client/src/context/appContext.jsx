import { createContext } from "react";
import { useState, useEffect } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();
  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const calculateRating = (course) => {
    if (course.courseRatings.length === 0) {
      return 0;
    }
    let totalRating = 0;
    course.courseRatings.forEach((rating) => {
      totalRating += rating.rating;
    });
    return totalRating / course.courseRatings.length;
  };

  const fetchAllCourses = async () => {
    setAllCourses(dummyCourses);
  };

  const calculateLectureDuration = (chapter) => {
    let time = 0;
    if (chapter?.chapterContent) {
      chapter.chapterContent.forEach((lecture) => {
        time += lecture.lectureDuration;
      });
    }
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  const calculateCourseDuration = (course) => {
    let time = 0;
    course.courseContent.map((chapter) =>
      chapter.chapterContent.map((lecture) => (time += lecture.lectureDuration))
    );
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  //no.of lectures
  const calculateTotalLectures = (course) => {
    let totalLectures = 0;
    if (course?.courseContent?.length) {
      course.courseContent.forEach((chapter) => {
        if (Array.isArray(chapter.chapterContent)) {
          totalLectures += chapter.chapterContent.length;
        }
      });
    }
    return totalLectures;
  };
  const getEnrolledCourses = () => {
    setEnrolledCourses(dummyCourses);
  };
  useEffect(() => {
    fetchAllCourses();
    getEnrolledCourses();
  }, []);

  const value = {
    currency,
    allCourses,
    navigate,
    calculateRating,
    isEducator,
    setIsEducator,
    calculateLectureDuration,
    calculateCourseDuration,
    calculateTotalLectures,
    enrolledCourses,
    getEnrolledCourses,
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
