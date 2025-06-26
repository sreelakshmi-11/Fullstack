import React, { useContext, useEffect, useState } from "react";
import Loading from "../../components/student/Loading";
import { assets } from "../../assets/assets";
import { dummyDashboardData } from "../../assets/assets";
import { AppContext } from "../../context/appContext";
const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState();
  const { currency } = useContext(AppContext);
  const fetchDashboardData = () => {
    setDashboardData(dummyDashboardData);
  };

  useEffect(() => {
    fetchDashboardData();
  });

  return dashboardData ? (
    <div className="min-h-screen flex flex-col items-start justify-between gap-8 md:p-8 md:pb-0 p-4 pt-8 pb-0">
      <div className="space-y-5">
        <div className="flex flex-wrap gap-5 items-center">
          <div className="flex items-center gap-3 shadow-card border border-blue-500 p-4 w-56 rounded-md">
            <img src={assets.patients_icon} alt="patients_icon" />
            <div>
              <p className="text-2xl font-medium text-gray-600">
                {dashboardData.enrolledStudentsData.length}
              </p>
              <p className="text-base text-gray-500">Total Enrolments</p>
            </div>
          </div>

          <div className="flex items-center gap-3 shadow-card border border-blue-500 p-4 w-56 rounded-md">
            <img src={assets.appointments_icon} alt="patients_icon" />
            <div>
              <p className="text-2xl font-medium text-gray-600">
                {dashboardData.totalCourses}
              </p>
              <p className="text-base text-gray-500">Total Courses</p>
            </div>
          </div>

          <div className="flex items-center gap-3 shadow-card border border-blue-500 p-4 w-56 rounded-md">
            <img src={assets.earning_icon} alt="currency_icon" />
            <div>
              <p className="text-2xl font-medium text-gray-600">
                {currency} {dashboardData.totalEarnings}
              </p>
              <p className="text-base text-gray-500">Total Earnings</p>
            </div>
          </div>
        </div>
        <h2>Latest Enrollments</h2>
        <table className=" border">
          <thead>
            <tr className="border">
              <th className="p-3">#</th>
              <th>Student Name</th>
              <th>Course Title</th>
            </tr>
          </thead>
          <tbody>
            {dashboardData.enrolledStudentsData.map((item, index) => (
              <tr key={index} className="border-b border-gray-500/90">
                <td className="px-4 py-3 ">{index + 1}</td>
                <td className="flex gap-2 px-4 py-3">
                  <img
                    src={item.student.imageUrl}
                    className="w-[35px] h-[35px] rounded-full"
                  />
                  <span>{item.student.name}</span>
                </td>
                <td className="px-4 py-3 text-center">{item.courseTitle}</td>
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

export default Dashboard;
