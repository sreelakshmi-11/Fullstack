import React, { useContext, useState } from "react";
import { AppContext } from "../../context/appContext";
import { Line } from "rc-progress";
import Footer from "../../components/student/Footer";

const MyEnrollments = () => {
  const { enrolledCourses, calculateCourseDuration, navigate } =
    useContext(AppContext);

  const [progressArray, setProgressArray] = useState([
    { lecturesCompleted: 2, totalLectures: 2 },
    { lecturesCompleted: 1, totalLectures: 4 },
    { lecturesCompleted: 3, totalLectures: 4 },
    { lecturesCompleted: 3, totalLectures: 6 },
    { lecturesCompleted: 4, totalLectures: 9 },
    { lecturesCompleted: 6, totalLectures: 10 },
    { lecturesCompleted: 1, totalLectures: 5 },
    { lecturesCompleted: 4, totalLectures: 7 },
    { lecturesCompleted: 4, totalLectures: 9 },
    { lecturesCompleted: 3, totalLectures: 8 },
    { lecturesCompleted: 2, totalLectures: 6 },
    { lecturesCompleted: 1, totalLectures: 9 },
    { lecturesCompleted: 2, totalLectures: 3 },
    { lecturesCompleted: 5, totalLectures: 6 },
  ]);
  return (
    <>
      <div className="mx-[100px] mb-[20px]">
        <div className="flex justify-center items-center font-bold p-[20px]">
          My Enrollments
        </div>
        <table className="table-fixed w-full overflow-hidden border mt-10">
          <thead className="text-gray-900 border border-gray text-sm text-center">
            <tr>
              <th className="px-4 py-3 font-semibold truncate">Course</th>
              <th className="px-4 py-3 font-semibold truncate">Duration</th>
              <th className="px-4 py-3 font-semibold truncate">Completed</th>
              <th className="px-4 py-3 font-semibold truncate">Status</th>
            </tr>
          </thead>
          <tbody>
            {enrolledCourses.map((course, index) => (
              <tr
                key={index}
                className=" text-center border-b border-gray-500/20"
              >
                <td className="flex items-center px-4 space-x-3 p-[10px]">
                  <img src={course.courseThumbnail} className="w-28 p-4 " />
                  <div className="flex-1">
                    <p>{course.courseTitle}</p>
                    <Line
                      strokeWidth={2}
                      percent={
                        progressArray[index]
                          ? (progressArray[index].lecturesCompleted * 100) /
                            progressArray[index].totalLectures
                          : 0
                      }
                      className="bg-gray-300 rounded-full h-[5px]"
                    />
                  </div>
                </td>
                <td>
                  <p>{calculateCourseDuration(course)}</p>
                </td>
                <td>
                  <p>
                    {progressArray[index] &&
                      ` ${progressArray[index].lecturesCompleted}/${progressArray[index].totalLectures}`}
                    lectures
                  </p>
                </td>
                <td>
                  <button
                    className="px-3 py-1.5 bg-blue-500"
                    onClick={() => navigate("/player/" + course._id)}
                  >
                    {progressArray[index].lecturesCompleted /
                      progressArray[index].totalLectures ===
                    1
                      ? "Completed"
                      : "Inprogress"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default MyEnrollments;
