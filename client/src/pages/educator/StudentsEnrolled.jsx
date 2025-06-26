import React, { useEffect, useState } from "react";
import { dummyStudentEnrolled } from "../../assets/assets";

function StudentsEnrolled() {
  const [StudentsEnrolled, setStudentsEnrolled] = useState([]);

  useEffect(() => {
    setStudentsEnrolled(dummyStudentEnrolled);
  }, []);
  return (
    <div className="flex flex-col p-6 gap-4">
      <h1>Enrolled Students</h1>
      <table className="text-center">
        <thead>
          <tr className=" p-4 border">
            <th className="p-4">#</th>
            <th>Student Name</th>
            <th>CourseTitle</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {StudentsEnrolled.map((student, index) => (
            <tr className="border p-6 justify-center items-center">
              <td className=" p-4">{index + 1}</td>
              <td className="flex gap-2 p-4 items-center justify-center">
                <img
                  src={student.student.imageUrl}
                  alt="profile"
                  className="w-[35px] h-[35px] rounded-full bg-black"
                />
                {student.student.name}
              </td>
              <td className="p-4">{student.courseTitle}</td>
              <td className="p-4">
                {new Date(student.purchaseDate).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentsEnrolled;
