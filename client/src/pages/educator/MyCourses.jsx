import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/appContext";
import Loading from "../../components/student/Loading";

const MyCourses = () => {
  const { currency, allCourses } = useContext(AppContext);
  const [coursesData, setCoursesData] = useState(null);

  const fetchCourseData = () => {
    setCoursesData(allCourses);
  };

  useEffect(() => {
    fetchCourseData();
  }, [allCourses]);

  console.log(allCourses);
  console.log(coursesData);

  return coursesData ? (
    <div className="flex flex-col p-[30px] gap-3">
      <h1>My Courses</h1>
      <div>
        <table>
          <thead>
            <tr className="border border-gray-500/90">
              <th className="px-4 py-3">All Courses</th>
              <th className="px-4 py-3">Earnings</th>
              <th className="px-4 py-3">Students</th>
              <th className="px-4 py-3">Published On</th>
            </tr>
          </thead>
          <tbody>
            {allCourses.map((course, i) => (
              <tr key={i} className="border border-gray-500/90">
                <td className="flex px-4 py-3 gap-3 text-center">
                  <img src={course.courseThumbnail} className="w-16 h-6" />
                  <p>{course.courseTitle}</p>
                </td>
                <td className="text-center px-4 py-3">
                  {currency}
                  {Math.floor(
                    course.enrolledStudents.length *
                      (course.coursePrice -
                        (course.discount * course.coursePrice) / 100)
                  )}
                </td>
                <td className="text-center px-4 py-3">
                  {course.enrolledStudents.length}
                </td>
                <td className="text-center px-4 py-3">
                  {new Date(course.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default MyCourses;
